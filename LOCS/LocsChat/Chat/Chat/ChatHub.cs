using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using Chat.DataBaseModels;
using Microsoft.AspNetCore.Http;
using Chat.Models;

namespace Chat
{
    public class ChatHub : Hub
    {
        private ChatRepository repository;
        private IHubContext<ChatHub> hubContext;
        private MessageBrokerClient broker;

        public ChatHub(ChatRepository repository, IHubContext<ChatHub> hubContext, MessageBrokerClient broker)
        {
            this.repository = repository;
            this.hubContext = hubContext;
            this.broker = broker;
        }

        /// <summary>
        /// Отправка сообщения
        /// </summary>
        /// <param name="message">содержание сообщения</param>
        /// <param name="recipientId">id получателя</param>
        /// <returns></returns>
        public Task SendMessage(MessageModel message)
        {
            var userId = getUserId(Context.GetHttpContext());
            if (userId == null)
            {
                return Clients.Caller.SendAsync("Error", "bad token (SendMessage)");
            }

            message.SenderId = userId;

            repository.CreateMessage(message);

            var stringTest = $"{DateTime.Now} Send message - {message}, from: {userId} to group: {message.GroupId}";

            var usersInGroup = repository.GerUsersId(message.GroupId);

            try
            {
                broker.SendMessage(message, usersInGroup);

                System.Diagnostics.Debug.WriteLine($"{DateTime.Now} Send to broker");
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"{ex.Message}");
                return Clients.Caller.SendAsync("Error", $"{ex.Message}");
            }

            return Clients.Caller.SendAsync("SendMessageResult", stringTest);
        }



        /// <summary>
        /// метод для получения сообщений (в т.ч. из брокера)
        /// </summary>
        /// <returns></returns>
        public async Task Enter()
        {
            try
            {
                var userId = getUserId(Context.GetHttpContext());

                if (userId != null)
                {
                    System.Diagnostics.Debug.WriteLine($"ID CONNECT - {Context.ConnectionId}");
                    var tag = broker.Connect((long)userId, Context.ConnectionId, async (route, message, clientId) =>
                   {
                       if (userId != message.SenderId && repository.CheckoToDelete(message.Id))
                       {
                           await hubContext.Clients.Client(clientId)
                            .SendAsync("EnterResult", message.Message);
                       }
                   });
                    if (tag != null)
                    {
                        repository.CreateOrUpdateTag((long)userId, tag);
                    }
                }
                else
                {
                    await Clients.Caller.SendAsync("Error", "bad token (Enter)");
                }
            }
            catch (Exception e) { }
        }

        /// <summary>
        /// при отключение юзера - отписка от брокера сообщений 
        /// </summary>
        /// <param name="exception"></param>
        /// <returns></returns>
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await base.OnDisconnectedAsync(exception);

            var userId = getUserId(Context.GetHttpContext());

            if (userId != null)
            {
                var tag = repository.GetTag((long)userId);
                broker.CancelOnDisconect(tag);
            }
        }

        /// <summary>
        /// получение id юзера из куки
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private long? getUserId(HttpContext context)
        {
            var userIdCookie = context.Request.Cookies[Cookie.userId];
            return repository.GetUserId(userIdCookie);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}

