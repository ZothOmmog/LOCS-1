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
        }

        public long Id { get; set; }
        public string Login { get; set; }
        public string Hashpassword { get; set; }
        public string Role { get; set; }
        public long? IdCity { get; set; }

        public virtual ICollection<ChatMessage> ChatMessageRecipients { get; set; }
        public virtual ICollection<ChatMessage> ChatMessageSenders { get; set; }

    }
}
