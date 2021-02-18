using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chat.DataBaseModels;
using Chat.Models;
using Microsoft.EntityFrameworkCore;

namespace Chat
{
    /// <summary>
    /// класс для работы с бд
    /// </summary>
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
        public void CreateMessage(MessageModel message)
        {
            var result = context.ChatMessages.Add(new ChatMessage()
            {
                Message = message.Message,
                SenderId = message.SenderId,
                GroupId = message.GroupId
            }).Entity;
            context.SaveChanges();
            message.Id = result.Id;
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

        /// <summary>
        /// список пользователей в группе
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public List<long?> GerUsersId(long? groupId)
        {
            return context.GroupUsers.Where(x => x.GroupId == groupId).Select(x => x.UserId).ToList();
        }



        /// <summary>
        /// проверка сообщения на удаление 
        /// </summary>
        /// <param name="messageId"></param>
        /// <returns></returns>
        public bool CheckoToDelete(long? messageId)
        {
            // var result = await context.ChatMessages.FirstOrDefaultAsync(x => x.Id == messageId);
            using (var newRep = new LocsBD_DevContext())
            {
                var result = newRep.ChatMessages.FirstOrDefault(x => x.Id == messageId);
                if (result != null)
                {
                    return !result.Deleted;
                }
                else
                {
                    return false;
                }
            }
        }

        /// <summary>
        /// Создание (или обновление) привязки тега и id подписки брокера сообщения
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="tag"></param>
        public void CreateOrUpdateTag(long userId, string tag)
        {
            var consumer = context.Consumers.FirstOrDefault(x => x.Userid == userId);
            if (consumer != null)
            {
                consumer.Tag = tag;
            }
            else
            {
                context.Consumers.Add(new Consumer()
                {
                    Userid = userId,
                    Tag = tag
                });
            }
            context.SaveChanges();
        }

        /// <summary>
        /// получение тега подписки брокера сообщения
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public string GetTag(long userId)
        {
            var consumer = context.Consumers.FirstOrDefault(x => x.Userid == userId);
            return consumer == null ? "" : consumer.Tag;
        }
    }
}
