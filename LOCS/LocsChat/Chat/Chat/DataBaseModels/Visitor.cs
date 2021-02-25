using System;
using System.Collections.Generic;

#nullable disable

namespace Chat.DataBaseModels
{
    public partial class Visitor
    {
        public long? IdUser { get; set; }
        public string Nickname { get; set; }
        public string ProfilePicture { get; set; }

        public virtual Userlist IdUserNavigation { get; set; }
    }
}
