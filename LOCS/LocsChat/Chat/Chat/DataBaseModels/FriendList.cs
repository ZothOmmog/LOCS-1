using System;
using System.Collections.Generic;

#nullable disable

namespace Chat.DataBaseModels
{
    public partial class FriendList
    {
        public long Id { get; set; }
        public long? IdUser { get; set; }
        public long? IdUser2 { get; set; }
        public bool? Accept { get; set; }
        public bool? Deleted { get; set; }

        public virtual Userlist IdUser2Navigation { get; set; }
        public virtual Userlist IdUserNavigation { get; set; }
    }
}
