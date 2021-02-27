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
        private CryptoProvider crypto;
        public ChatRepository(LocsBD_DevContext context)
        {
            this.context = context;
            crypto = new CryptoProvider();
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
            message.dateTime = result.Datatime;
        }

        public IEnumerable<UsersModel> GetGroupsUsers(long? userId, long? groupId)
        {
            var check = context.GroupUsers.FirstOrDefault(x => x.GroupId == groupId && x.UserId == userId);
            if (check == null)
            {
                return null;
            }
            return context.GroupUsers.Where(x => x.GroupId == groupId).Select(x => new UsersModel()
            {
                userId = x.UserId,
                nick = context.Visitors.FirstOrDefault(z => z.IdUser == x.UserId).Nickname ?? ""
            }).ToList();
        }

        /// <summary>
        /// получить имя собеседника, название для персональной беседы
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="groupId"></param>
        /// <returns></returns>
        private string GetTitlePersonalGroup(long? userId, long? groupId)
        {
            var grop = context.GroupUsers.FirstOrDefault(x => x.GroupId == groupId && x.UserId != userId);
            var visitor = context.Visitors.FirstOrDefault(x => x.IdUser == grop.UserId);
            return visitor == null ? "" : visitor.Nickname;
        }

        /// <summary>
        /// страничный вывод бесед, в которых состоит пользователь
        /// </summary>
        /// <param name="id"></param>
        /// <param name="limit"></param>
        /// <param name="offset"></param>
        /// <returns></returns>
        public IEnumerable<GroupModel> GetUserGroups(long? userId, int limit, int offset)
        {
            offset = offset <= 0 ? 1 : offset;
            limit = limit <= 0 ? 1 : limit;
            offset = (offset - 1) * limit;

            var groups = context.GroupUsers.Where(x => x.UserId == userId).Skip(offset).Take(limit).Select(x => new GroupModel()
            {
                IsPersonal = x.IsPersonal,
                groupId = x.GroupId,
                titleGroup = context.Groups.FirstOrDefault(y => y.Id == x.GroupId).Title,
                lastMessage = context.ChatMessages.OrderBy(y => y.Datatime).LastOrDefault(z => z.GroupId == x.GroupId && z.Deleted == false)
            }).ToList();

            foreach (var group in groups)
            {
                if (group.IsPersonal)
                {
                    group.titleGroup = GetTitlePersonalGroup(userId, group.groupId);
                }
                if (group.lastMessage != null) {
                    group.lastMessage.Message = crypto.DecryptMessage(group.lastMessage.Message, group.lastMessage.SenderId);
                }

            }


            return groups;
        }

        /// <summary>
        /// удаление сообщения
        /// </summary>
        /// <param name="id"></param>
        /// <param name="messageId"></param>
        /// <returns></returns>
        public bool DeleteMessage(long? id, long messageId)
        {
            var mes = context.ChatMessages.FirstOrDefault(x => x.Id == messageId && x.SenderId == id && x.Deleted == false);
            if (mes != null)
            {
                mes.Deleted = true;
                context.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }
        /// <summary>
        /// устанвока сообщений в состоние прочтения
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="messages"></param>
        public void ReadMessage(long? userId, IEnumerable<long> messages)
        {
            foreach (var messageId in messages)
            {
                var message = context.ChatMessages.FirstOrDefault(x => x.Id == messageId && x.SenderId != userId && x.Deleted == false);
                if (message == null)
                {
                    continue;
                }
                var group = context.GroupUsers.FirstOrDefault(x => x.GroupId == message.GroupId && x.UserId == userId);
                if (group == null)
                {
                    continue;
                }
                message.Isread = true;
                context.SaveChanges();
            }
        }

        /// <summary>
        /// получение активности юзера
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public UserActivityModel GetUserActivity(long userId)
        {
            var activity = context.UserLastActivity.FirstOrDefault(x => x.UserId == userId);
            if (activity == null)
            {
                return null;
            }
            else
            {
                return new UserActivityModel()
                {
                    isOnline = activity.IsOnline,
                    dateTime = activity.LastActivity.ToString()
                };
            }
        }

        /// <summary>
        /// создание группы 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="usersId"></param>
        /// <returns></returns>
        public long CreateGroup(long userCreatorId, groupModel group)
        {
            var newGroup = context.Groups.Add(new Group()
            {
                CreatorId = userCreatorId,
                Title = group.titleGroup
            }).Entity;
            context.SaveChanges();

            var list = group.usersId.Append(userCreatorId);
            list = list.Distinct().ToList();

            foreach (var id in list)
            {
                context.GroupUsers.Add(new GroupUser()
                {
                    GroupId = newGroup.Id,
                    IsPersonal = false,
                    UserId = id
                });
                context.SaveChanges();
            }
            context.SaveChanges();
            return newGroup.Id;
        }


        /// <summary>
        /// создание личного чата
        /// </summary>
        /// <param name="id"></param>
        /// <param name="usersId"></param>
        /// <returns></returns>
        public long? CreatePersonalChat(long? id, long usersId)
        {
            if (id == usersId)
            {
                return null;
            }

            var checkUser = context.GroupUsers.Where(x => x.IsPersonal == true && x.UserId == id).Select(x => x.GroupId).ToList();
            var checSecondUser = context.GroupUsers.Where(x => x.IsPersonal == true && x.UserId == usersId).Select(x => x.GroupId).ToList();

            var result = checkUser.FirstOrDefault(x => checSecondUser.Contains(x));
            result = result == null ? 0 : result;
            if (result != 0)
            {
                return result;
            }

            var newGroup = context.Groups.Add(new Group()
            {
                CreatorId = null,
                Title = null
            }).Entity;
            context.SaveChanges();

            context.GroupUsers.Add(new GroupUser()
            {
                GroupId = newGroup.Id,
                IsPersonal = true,
                UserId = id
            });
            context.GroupUsers.Add(new GroupUser()
            {
                GroupId = newGroup.Id,
                IsPersonal = true,
                UserId = usersId
            });
            context.SaveChanges();

            return newGroup.Id;
        }


        /// <summary>
        /// добавление юзера в группу
        /// </summary>
        /// <param name="creatorId"></param>
        /// <param name="userId"></param>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public bool AddUserToGroup(long? creatorId, userToGroupModel groupUser)
        {
            var group = context.Groups.FirstOrDefault(x => x.Id == groupUser.groupId && x.CreatorId == creatorId);
            var userInGroup = context.GroupUsers.FirstOrDefault(x => x.GroupId == groupUser.groupId && x.UserId == groupUser.userId);
            if (group == null || userInGroup != null)
            {
                return false;
            }

            context.GroupUsers.Add(new GroupUser()
            {
                GroupId = groupUser.groupId,
                IsPersonal = false,
                UserId = groupUser.userId
            });
            context.SaveChanges();
            return true;
        }

        /// <summary>
        /// получение историии сообщений группы
        /// </summary>
        /// <param name="id"></param>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public IEnumerable<MessageModel> GetMessages(long? userId, long groupId, int limit, int offset)
        {
            offset = offset <= 0 ? 1 : offset;
            limit = limit <= 0 ? 1 : limit;
            offset = (offset - 1) * limit;

            var checkGroup = context.GroupUsers.FirstOrDefault(x => x.GroupId == groupId && x.UserId == userId);
            if (checkGroup == null)
            {
                return null;
            }
            var history = context.ChatMessages.Where(x => x.GroupId == groupId && x.Deleted == false).Skip(offset).Take(limit).Select(x => new MessageModel()
            {
                Id = x.Id,
                SenderId = x.SenderId,
                Message = crypto.DecryptMessage(x.Message, x.SenderId),
                Isread = x.Isread,
                GroupId = x.GroupId,
                dateTime = x.Datatime
            });
            return history;
        }

        /// <summary>
        /// проверка, что юзер состоит в группе
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public bool CheckUserOnGroup(long? userId, long? groupId)
        {
            var result = context.GroupUsers.FirstOrDefault(x => x.GroupId == groupId && x.UserId == userId);
            if (result != null)
            {
                return true;
            }
            else
            {
                return false;
            }
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


        /// <summary>
        /// установка юзера в состояние онлайн
        /// </summary>
        /// <param name="userId"></param>
        public void UserIsOnline(long userId)
        {
            var user = context.UserLastActivity.FirstOrDefault(x => x.UserId == userId);
            if (user != null)
            {
                user.IsOnline = true;
            }
            else
            {
                context.UserLastActivity.Add(new UserLastActivity()
                {
                    UserId = userId,
                    IsOnline = true
                });
            }
            context.SaveChanges();
        }

        /// <summary>
        /// обнолвение даты времени последней активности пользователя
        /// </summary>
        /// <param name="userId"></param>
        public void UpdateLastUserActivity(long userId)
        {
            var user = context.UserLastActivity.FirstOrDefault(x => x.UserId == userId);
            if (user != null)
            {
                user.LastActivity = DateTime.UtcNow;
                user.IsOnline = false;
            }
            else
            {
                context.UserLastActivity.Add(new UserLastActivity()
                {
                    UserId = userId,
                    LastActivity = DateTime.UtcNow,
                    IsOnline = false
                });
            }
            context.SaveChanges();
        }
    }
}
