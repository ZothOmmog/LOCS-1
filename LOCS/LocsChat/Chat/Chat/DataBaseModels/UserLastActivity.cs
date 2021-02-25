using System;
using System.Collections.Generic;

#nullable disable

namespace Chat.DataBaseModels
{
    public partial class UserLastActivity
    {
        public long Id { get; set; }
        public long? UserId { get; set; }
        public DateTime? LastActivity { get; set; }
        public bool? IsOnline { get; set; }

        public virtual Userlist User { get; set; }
    }
}
