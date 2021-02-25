using Chat.DataBaseModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Models
{
    public class MessageModel
    {
        public long? Id { get; set; }
        public long? SenderId { get; set; }
        public string Message { get; set; }
        public bool? Isread { get; set; } = false;
        public bool? Deleted { get; set; } = false;
        public long? GroupId { get; set; }
        public DateTime? dateTime { get; set; }
    }


    public class ErrorChat
    {
        public SendingErrorEnum code { get; set; }
        public string error { get; set; }
    }


    public class GroupModel
    {
        public long? groupId { get; set; }
        public bool IsPersonal { get; set; }
        public string titleGroup { get; set; }
        // public string partnerName { get; set; }
        public ChatMessage lastMessage { get; set; }
    }


    public class UsersModel
    {
        public long? userId { get; set; }
        public string nick { get; set; }
    }
    public class UserActivityModel
    {
        public string dateTime { get; set; }
        public bool? isOnline { get; set; }
    }

    public class groupModel
    {
        public List<long> usersId { get; set; }
        public string titleGroup { get; set; }
    }

    public class userToGroupModel
    {
        public long userId { get; set; }
        public long groupId { get; set; }
    }

    public class idArrayModel
    {
        public long[] id { get; set; }
    }
}
