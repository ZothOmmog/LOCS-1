using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Chat.DataBaseModels;

namespace Chat
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private ChatRepository rep { get; set; }
        public ChatController()
        {
            rep = new ChatRepository(new LocsBD_DevContext());
        }

        //to do:
        //список групп
        //удаление сообщений
        //получение истории сообщений
        // добавление группы 
        // добавление группы личной переписки
        //добавления пользователя в группу


        //шифрование ?
    }
}
