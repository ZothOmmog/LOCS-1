using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chat.DataBaseModels;
namespace Chat
{
    public class ChatRepository
    {
        private LocsBD_DevContext context;
        public ChatRepository(LocsBD_DevContext context)
        {
            this.context = context;
        }


        /// <summary>
        /// добавление сообщения в бд
        /// </summary>
        /// <param name="from">от кого</param>
        /// <param name="to">кому</param>
        /// <param name="message">содержание сообщения</param>
        /// <returns></returns>
        public ChatMessage CreateMessage(long from, long to, string message)
        {
            var result = context.ChatMessages.Add(new ChatMessage()
            {
                Message = message,
                SenderId = from,
                RecipientId = to
            }).Entity;
            context.SaveChanges();

            return new ChatMessage() {
                Id = result.Id,
                Message = message,
                SenderId = from,
                RecipientId = to
            };
        }

        /// <summary>
        /// Получение id юзера по токену 
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        public long? GetUserId(string? token)
        {
            if (token == null)
            {
                return null;
            }

            var id = context.Tokens.FirstOrDefault(x => x.token == token);
            if (id != null)
            {
                return long.Parse(id.Obj);
            }
            else
            {
                return null;
            }
        }
    }
}
