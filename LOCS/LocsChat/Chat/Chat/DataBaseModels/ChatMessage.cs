﻿using System;
using System.Collections.Generic;

#nullable disable

namespace Chat.DataBaseModels
{
    public partial class ChatMessage
    {
        public long Id { get; set; }
        public long? SenderId { get; set; }
        public string Message { get; set; }
        public bool Isread { get; set; } = false;
        public bool Deleted { get; set; } = false;
        public long? GroupId { get; set; }

        public virtual Group Group { get; set; }
        public virtual Userlist Sender { get; set; }
    }
}
