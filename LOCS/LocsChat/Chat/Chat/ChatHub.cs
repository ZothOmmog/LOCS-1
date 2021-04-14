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
        private CryptoProvider crypto;

        public ChatHub(ChatRepository repository, IHubContext<ChatHub> hubContext, MessageBrokerClient broker)
        {
            this.repository = repository;
            this.hubContext = hubContext;
            this.broker = broker;
            crypto = new CryptoProvider();
        }

        /// <summary>
        /// Отправка сообщения
        /// </summary>
        /// <param name="message">содержание сообщения</param>
        /// <param name="recipientId">id получателя</param>
        /// <returns></returns>
        public async Task SendMessage(MessageModel message)
        {
            try
            {
                var userId = getUserId(Context.GetHttpContext());
                if (userId == null)
                {
                    await Clients.Caller.SendAsync("Error", new ErrorChat()
                    {
                        code = SendingErrorEnum.token,
                        error = ErrorsString.token
                    });
                    return;
                }

                if (!repository.CheckUserOnGroup(userId, message.GroupId))
                {
                    await Clients.Caller.SendAsync("Error", new ErrorChat()
                    {
                        code = SendingErrorEnum.permissionsGroup,
                        error = ErrorsString.permissionsGroup
                    });
                    return;
                }

                message.SenderId = userId;
                message.Message = crypto.CryptMessage(message.Message, userId);
                repository.CreateMessage(message);

                var usersInGroup = repository.GetUsersId(message.GroupId);

                try
                {
                    broker.SendMessage(message, usersInGroup);
                }
                catch (Exception e)
                {
                    // System.Diagnostics.Debug.WriteLine($"{ex.Message}");
                    await Clients.Caller.SendAsync("Error", new ErrorChat()
                    {
                        code = SendingErrorEnum.broker,
                        error = ErrorsString.broker
                    });
                    return;
                }

                await Clients.Caller.SendAsync("SendMessageResult", true);
                return;
            }
            catch (Exception e)
            {
                await Clients.Caller.SendAsync("Error", new ErrorChat()
                {
                    code = SendingErrorEnum.serverError,
                    error = e.Message
                });
                return;
            }
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
                    repository.UserIsOnline((long)userId);
                    //System.Diagnostics.Debug.WriteLine($"ID CONNECT - {Context.ConnectionId}");
                    var tag = broker.Connect((long)userId, Context.ConnectionId, async (route, message, clientId) =>
                   {
                       if (userId != message.SenderId && repository.CheckoToDelete(message.Id))
                       {
                           message.Message = crypto.DecryptMessage(message.Message, message.SenderId);
                           await hubContext.Clients.Client(clientId)
                            .SendAsync("EnterResult", message);
                       }
                   });
                    if (tag != null)
                    {
                        repository.CreateOrUpdateTag((long)userId, tag);
                    }
                }
                else
                {
                    await Clients.Caller.SendAsync("Error", new ErrorChat()
                    {
                        code = SendingErrorEnum.token,
                        error = ErrorsString.token
                    });
                }
            }
            catch (Exception e)
            {
                await Clients.Caller.SendAsync("Error", new ErrorChat()
                {
                    code = SendingErrorEnum.serverError,
                    error = e.Message
                });
            }
        }

        /// <summary>
        /// при отключение юзера - отписка от брокера сообщений 
        /// </summary>
        /// <param name="exception"></param>
        /// <returns></returns>
        public override Task OnDisconnectedAsync(Exception exception)
        {

            var userId = getUserId(Context.GetHttpContext());

            if (userId != null)
            {
                repository.UpdateLastUserActivity((long)userId);
                var tag = repository.GetTag((long)userId);
                broker.CancelOnDisconect(tag);
            }
            return base.OnDisconnectedAsync(exception);

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

