using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Chat.DataBaseModels;
using Chat.Models;
using Newtonsoft.Json;

namespace Chat
{
    [Route("api")]
    [ApiController]
    public class chatController : ControllerBase
    {
        private ChatRepository rep { get; set; }
        public chatController()
        {
            rep = new ChatRepository(new LocsBD_DevContext());
        }

        /// <summary>
        /// список переписок пользователя (должен быть авторизирован)
        /// </summary>
        /// <param name="limit"></param>
        /// <param name="offset"></param>
        /// <returns></returns>
        [HttpGet("group/{limit}/{offset}")]
        public IActionResult GetGroups(int limit, int offset)
        {
            try
            {
                var id = getUserId(HttpContext);
                if (id == null)
                {
                    return StatusCode(401);
                }
                var result = rep.GetUserGroups(id, limit, offset);
                return Ok(result);

            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        /// <summary>
        /// удаление сообщения
        /// </summary>
        /// <param name="messageId"></param>
        /// <returns></returns>
        [HttpDelete("message/{messageId}")]
        public IActionResult DeleteMessage(long messageId)
        {
            try
            {
                var id = getUserId(HttpContext);
                if (id == null)
                {
                    return StatusCode(401);
                }
                var result = rep.DeleteMessage(id, messageId);
                if (result)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }

            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        /// <summary>
        /// сделать сообщения прочитанными 
        /// </summary>
        /// <param name="messages"></param>
        /// <returns></returns>
        [HttpPut("message")]
        public IActionResult ReadMessage([FromBody] idArrayModel messages)
        {
            try
            {
                var id = getUserId(HttpContext);
                if (id == null)
                {
                    return StatusCode(401);
                }
                rep.ReadMessage(id, messages.id);

                return Ok();

            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }


        /// <summary>
        /// последняя активность пользователя по id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpGet("user/{userId}")]
        public IActionResult GetGroups(long userId)
        {
            try
            {
                var result = rep.GetUserActivity(userId);
                return Ok(result);

            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }



        /// <summary>
        /// получение истории сообщений группы
        /// </summary>
        /// <param name="messageId"></param>
        /// <returns></returns>
        [HttpGet("history/{groupId}/{limit}/{offset}")]
        public IActionResult GetMessages(long groupId, int limit, int offset)
        {
            try
            {
                var id = getUserId(HttpContext);
                if (id == null)
                {
                    return StatusCode(401);
                }
                var result = rep.GetMessages(id, groupId, limit, offset);

                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        /// <summary>
        /// создание беседы
        /// </summary>
        /// <param name="usersId"></param>
        /// <param name="titleGroup"></param>
        /// <returns></returns>
        [HttpPost("addGroup")]
        public IActionResult CreateGroup([FromBody] groupModel group)
        {
            try
            {
                var id = getUserId(HttpContext);
                if (id == null)
                {
                    return StatusCode(401);
                }
                var result = rep.CreateGroup((long)id, group);

                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }



        /// <summary>
        /// создание персонального чата
        /// </summary>
        /// <param name="usersId"></param>
        /// <returns></returns>
        [HttpPost("personalChat/{usersId}")]
        public IActionResult CreatePersonalChat(long usersId)
        {
            try
            {
                var id = getUserId(HttpContext);
                if (id == null)
                {
                    return StatusCode(401);
                }
                var result = rep.CreatePersonalChat(id, usersId);

                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }


        /// <summary>
        /// добавление юзера в существющую беседу (добавляет организатор)
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="groupId"></param>
        /// <returns></returns>
        [HttpPost("group")]
        public IActionResult AddUserToGroup([FromBody]userToGroupModel groupUser)
        {
            try
            {
                var id = getUserId(HttpContext);
                if (id == null)
                {
                    return StatusCode(401);
                }
                var result = rep.AddUserToGroup(id, groupUser);

                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }



        /// <summary>
        /// получение id юзера из куки
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private long? getUserId(HttpContext context)
        {
            var userIdCookie = context.Request.Cookies[Cookie.userId];
            return rep.GetUserId(userIdCookie);
        }
    }
}
