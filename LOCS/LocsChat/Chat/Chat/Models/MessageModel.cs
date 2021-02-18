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
    }
}
