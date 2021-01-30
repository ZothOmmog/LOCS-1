using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat
{
    public class MessageBrokerClient
    {
        private string host;
        public MessageBrokerClient(string host)
        {
            this.host = host;
        }
    }
}
