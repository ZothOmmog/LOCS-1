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

        public void CreateOrUpdateTag(long userId, string tag)
        {
            var consumer = context.Consumers.FirstOrDefault(x => x.Userid == userId);
            if(consumer != null)
            {
                consumer.Tag = tag;
            } else
            {
                context.Consumers.Add(new Consumer()
                {
                    Userid = userId,
                    Tag = tag
                });
            }
            context.SaveChanges();
        }

        public string GetTag(long userId)
        {
            var consumer = context.Consumers.FirstOrDefault(x => x.Userid == userId);
            return consumer == null ? "" : consumer.Tag;
        }

        //добавить место для хравнения тегов подключения, удаления и создания, чтобы после отключания брокер не высылал сообщения 

        //public async Task AddСonsumer(int userId, string client, string tag)
        //{
        //    if (!string.IsNullOrEmpty(client) && !string.IsNullOrEmpty(tag))
        //    {
        //        var exist = await _context.Сonsumers.FirstOrDefaultAsync(x => x.Client == client && x.UserId == userId);

        //        if (exist != null)
        //        {
        //            exist.СonsumerTag = tag;
        //        }
        //        else
        //        {
        //            await _context.Сonsumers.AddAsync(new Сonsumers()
        //            {
        //                Client = client,
        //                UserId = userId,
        //                СonsumerTag = tag
        //            });
        //        }

        //        await _context.SaveChangesAsync();
        //    }
        //}
        //public async Task<string> GetConsumerTag(int userId, string client)
        //{
        //    return await _context.Сonsumers.Where(x => x.Client == client && x.UserId == userId).Select(x => x.СonsumerTag).FirstOrDefaultAsync();
        //}



    }
}
