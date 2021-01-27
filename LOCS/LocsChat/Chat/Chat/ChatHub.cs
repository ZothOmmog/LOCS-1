using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using Chat.DataBaseModels;

namespace Chat
{
    public class ChatHub : Hub
    {

        //private LocsBD_DevContext context = new LocsBD_DevContext();



        public Task SendMessage(string message)
        {
            return Clients.All.SendAsync("SendMessage", message);
        }

        public Task Send()
        {
            return Clients.All.SendAsync("AAA1", "asd");
        }


        public override Task OnConnectedAsync()
        {
            return Clients.All.SendAsync("connect", "подключился " +  Context.ConnectionId);
        }
    }
}
