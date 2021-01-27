using System;
using System.Collections.Generic;

#nullable disable

namespace Chat.DataBaseModels
{
    public partial class ChatMessage
    {
        public long Id { get; set; }
        public long? SenderId { get; set; }
        public long? RecipientId { get; set; }
        public string Message { get; set; }

        public virtual Userlist Recipient { get; set; }
        public virtual Userlist Sender { get; set; }
    }
}
