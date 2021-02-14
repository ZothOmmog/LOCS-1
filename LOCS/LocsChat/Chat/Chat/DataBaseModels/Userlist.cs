using System;
using System.Collections.Generic;

#nullable disable

namespace Chat.DataBaseModels
{
    public partial class Userlist
    {
        public Userlist()
        {
            ChatMessageRecipients = new HashSet<ChatMessage>();
            ChatMessageSenders = new HashSet<ChatMessage>();
            Consumers = new HashSet<Consumer>();
            GroupUsers = new HashSet<GroupUser>();
            Groups = new HashSet<Group>();
        }

        public long Id { get; set; }
        public string Login { get; set; }
        public string Hashpassword { get; set; }
        public string Role { get; set; }
        public long? IdCity { get; set; }

        public virtual ICollection<ChatMessage> ChatMessageRecipients { get; set; }
        public virtual ICollection<ChatMessage> ChatMessageSenders { get; set; }
        public virtual ICollection<Consumer> Consumers { get; set; }
        public virtual ICollection<GroupUser> GroupUsers { get; set; }
        public virtual ICollection<Group> Groups { get; set; }
    }
}
