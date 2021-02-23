using System;
using System.Collections.Generic;

#nullable disable

namespace Chat.DataBaseModels
{
    public partial class GroupUser
    {
        public long Id { get; set; }
        public long? GroupId { get; set; }
        public long? UserId { get; set; }
        public bool IsPersonal { get; set; }

        public virtual Group Group { get; set; }
        public virtual Userlist User { get; set; }
    }
}
