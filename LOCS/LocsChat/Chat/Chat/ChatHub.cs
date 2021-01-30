using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using Chat.DataBaseModels;
using Microsoft.AspNetCore.Http;


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
        public Task SendMessage(string message, long recipientId)
        {
            var userId = getUserId(Context.GetHttpContext());
            if (userId == null)
            {
                return Clients.Caller.SendAsync("Error", "bad token (SendMessage)");
            }
            var messageId = repository.CreateMessage(from: (long)userId, to : recipientId, message: message);
            var stringTest = $"{DateTime.Now} Send message - {message}, from: {userId} to: {recipientId}";

            return Clients.Caller.SendAsync("SendMessageResult", stringTest);
        }


        public Task Enter()
        {
            var userId = getUserId(Context.GetHttpContext());

            if (userId != null)
            {
                return Clients.Caller.SendAsync("EnterResult", $"CONNECT USERID - {userId}");
            }
            else
            {
                return Clients.Caller.SendAsync("Error", "bad token (Enter)");
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

    }
}

