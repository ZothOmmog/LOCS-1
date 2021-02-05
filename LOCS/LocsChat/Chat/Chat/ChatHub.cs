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
       // private Dictionary<long, string> idTagCollection = new Dictionary<long, string>();
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
            var messageResult = repository.CreateMessage(from: (long)userId, to: recipientId, message: message);
            var stringTest = $"{DateTime.Now} Send message - {message}, from: {userId} to: {recipientId}";


            try
            {
                broker.SendMessage(messageResult);

                System.Diagnostics.Debug.WriteLine($"{DateTime.Now} Send to broker");
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"{ex.Message}");
                return Clients.Caller.SendAsync("Error", $"{ex.Message}");
            }

            return Clients.Caller.SendAsync("SendMessageResult", stringTest);
        }



        public async Task Enter()
        {
            try
            {
                var userId = getUserId(Context.GetHttpContext());

                if (userId != null)
                {

                    var tag = broker.Connect((long)userId, Context.UserIdentifier, async (route, message, clientId) =>
                   {
                       await hubContext.Clients.User(clientId).SendAsync("EnterResult", message.Message);
                   });
                    if (tag != null)
                    {
                        repository.CreateOrUpdateTag((long)userId, tag);
                       // idTagCollection.Add((long)userId, tag);
                    }
                    //await Clients.Caller.SendAsync("EnterResult", $"CONNECT USERID - {userId}");
                }
                else
                {
                    await Clients.Caller.SendAsync("Error", "bad token (Enter)");
                }
            } catch(Exception e)
            {

            }
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            // await Clients.All.SendAsync("Notify", $"{Context.UserIdentifier} покинул в чат");
            await base.OnDisconnectedAsync(exception);

            var userId = getUserId(Context.GetHttpContext());

            if (userId != null)
            {
                // var tag = idTagCollection[(long)userId];
                var tag = repository.GetTag((long)userId);
                //broker.CancelConsumer(tag);

                broker.CancelOnDisconect(tag);
                //broker.Dispose();
            }
            await Clients.All.SendAsync("Notify", $"{Context.UserIdentifier} покинул в чат");
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
            //if (disposing)
            //{
            //    broker.Dispose();
            //}

            base.Dispose(disposing);
        }
    }
}

