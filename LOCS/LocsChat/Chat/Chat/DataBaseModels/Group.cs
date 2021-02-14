using System;
using System.Collections.Generic;

#nullable disable

namespace Chat.DataBaseModels
{
    public partial class Group
    {
        public Group()
        {
            ChatMessages = new HashSet<ChatMessage>();
            GroupUsers = new HashSet<GroupUser>();
        }

        public long Id { get; set; }
        public long? CreatorId { get; set; }
        public string Title { get; set; }

        public virtual Userlist Creator { get; set; }
        public virtual ICollection<ChatMessage> ChatMessages { get; set; }
        public virtual ICollection<GroupUser> GroupUsers { get; set; }
    }
}
