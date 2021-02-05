using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.DataBaseModels
{
    public partial class Consumers
    {
        public long Id { get; set; }
        public long userId { get; set; }
        public string tag { get; set; }
        public virtual Userlist user { get; set; }
    }
}
