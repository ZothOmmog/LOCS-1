----------
# SIGNALR 
- ***Подключение и получение сообщейний***
 Для использования чата юзер должен быть авторизирован, путь подключения url/chat , пример:
 
		const hubConnection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:53266/chat", {
                transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling
            })
            .build();


 Для подключения используется метод Enter , пример:
 
		hubConnection.start().then(() => {
			//вызов метода для получения истории отправленных сообщений из брокера
			hubConnection.invoke("Enter");
		}).catch(err => {
			console.error(err.toString());
		});
		
 Для отправки сообщения используется метод SendMessage , пример: 
			
		document.getElementById("sendBtn").addEventListener("click", function (e) {
			let messageText = document.getElementById("message").value;
			let groupId = Number(document.getElementById("groupId").value);
			//структура для отправки 
			let message = {
				Message: messageText,
				GroupId: groupId
			}
			hubConnection.invoke("SendMessage", message);
		});
		
 Для получения результата отправки сообщения используется метод SendMessageResult, пример:
 
		//получение статуса отправки сообщения
        hubConnection.on('SendMessageResult', function (message) {
            // создает элемент <p> для сообщения пользователя
            let elem = document.createElement("p");
            elem.appendChild(document.createTextNode(JSON.stringify(message)));

            var firstElem = document.getElementById("chatroom").firstChild;
            document.getElementById("chatroom").insertBefore(elem, firstElem);
        });
		
 Для получения сообщений используется метод EnterResult, пример:
		
        hubConnection.on("EnterResult", function (message) {
            let elem = document.createElement("p");
            elem.appendChild(document.createTextNode(JSON.stringify(message)));
            document.getElementById("chatroom").appendChild(elem);
        });

 Структура сообщения: 
 
		long Id - id сообщения
        long SenderId - id отправителя
        string Message - содержание сообщения
        bool Isread - статус прочитано сообщение или нет
        long GroupId - id чата 
        DateTime dateTime - дата-время (с часовым поясом) отправки 
 
  для получения ошибок используется метод Error, пример:
  
        hubConnection.on('Error', function (message) {
            let elem = document.createElement("p");
            elem.appendChild(document.createTextNode(JSON.stringify(message)));
            var firstElem = document.getElementById("chatroom").firstChild;
            document.getElementById("chatroom").insertBefore(elem, firstElem);
        });
 
---
----------
# REST API для получения данных 

# url/api/chat/groupUsers/{groupId}
- ***метод для получения списка пользователей чата***
 Формат GET 
- ***Ответ***

		[
			"userId" : long,
			"nick": string
		]
		
--- 
 
 # url/api/chat/group/{limit}/{offset}
- ***список переписок пользователя ***
 Формат GET 
 - ***Ответ***
 
		[
		 "groupId" : long,
         "IsPersonal" : bool,
         "titleGroup" : string, 
         "lastMessage" : {
				long Id - id сообщения
				long SenderId - id отправителя
				string Message - содержание сообщения
				bool Isread - статус прочитано сообщение или нет
				long GroupId - id чата 
				DateTime dateTime - дата-время (с часовым поясом) отправки 
			}
		]
 
 
--- 
 # url/api/chat/message/{messageId}
- ***удаление сообщения***
 Формат DELETE 
 - ***Ответ status code***
 
--- 
 # url/api/chat/readMessage
- ***сделать сообщения прочитанными***
 Формат PUT 
- ***формат запроса***
		
		{ 
			"id" :  [int]
		} 

 - ***Ответ status code***
 
 
 --- 
 # url/api/chat/user/{userId}
- ***последняя активность пользователя по id***
 Формат GET 
 - ***Ответ***
		
		{
			"dateTime" : string,
			"isOnline" : bool
		}
 
 --- 
 # url/api/chat/history/{groupId}/{limit}/{offset}
- ***получение истории сообщений группы***
 Формат GET 
 - ***Ответ***
		
		{
				long Id - id сообщения
				long SenderId - id отправителя
				string Message - содержание сообщения
				bool Isread - статус прочитано сообщение или нет
				long GroupId - id чата 
				DateTime dateTime - дата-время (с часовым поясом) отправки 
		}
  
--- 
 # url/api/chat/addGroup
- ***создание беседы***
 Формат POST 
- ***формат запроса***
		
		{ 
			"usersId"  : [long] ,
			"titleGroup" : string
		} 

 - ***Ответ id группы ***
   
 --- 
 # url/api/chat/personalChat/{usersId}
- ***создание персонального чата***
 Формат POST 
 - ***Ответ id группы *** 
 
 
 --- 
 # url/api/chat/group
- ***добавление юзера в существющую беседу (добавляет организатор)***
 Формат POST 
 - ***Запрос***
		
		{
			userId : long ,
			groupId : long
		}
 
 - ***Ответ bool status *** 