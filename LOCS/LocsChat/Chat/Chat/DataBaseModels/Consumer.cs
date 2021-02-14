using System;
using System.Collections.Generic;

#nullable disable

namespace Chat.DataBaseModels
{
    public partial class Consumer
    {
        public long Id { get; set; }
        public long? Userid { get; set; }
        public string Tag { get; set; }

        public virtual Userlist User { get; set; }
    }
}
