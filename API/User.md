----------
# url/user 
- ***аккаунт***
 Формат JSON ***сервер->React***
 Данные аккаунта:


		{ 
			"User": 
			{
				"Mail": "String",
				"Nick": "String",
				"City": "String",
				"UrlPicture" : "String",
				"Auth" :"Bool"
			} 
		}

---
# url/user/login/postLogin
- ***валидация данных из формы входа***
 Формат POST ***React->Сервер***
 Данные входа:
 

		{ 
			"Login": 
			{
				"mail": "String",
				"pas": "String"
			 }
		}
			
 
- ***Ответ на корректность данных***
 Формат JSON ***Сервер->React***
 Данные входа:
 

		{ 
			"Login":
			{
				"Flag": "Bool"
			}
		}


---

# url/user/registration/postreg 
- ***Регистрация***
 Формат POST ***React->Сервер***
 Данные регистрации:

		{ 
			"Registration":
			{
				"mail": "String",
				"nick": "String",
				"pas": "String"
			}
		}

- ***Ответ на корректность данных***
 Формат JSON ***Сервер->React***
 Данные входа:
 

		{
			"Login":
			{
				"NickNameFlag":"Bool",
				"MailFlag": "Bool"
			}
		}



# url/user/SearchUser 
- ***Поиск пользователей***
 Формат POST ***React->Сервер***
 Данные поиска:

		{
			"nick"	: "String"
		}

- ***Ответ***
 Формат JSON ***Сервер->React***
 Данные поиска:
 
		[
			{
				"user": {
					"id_user": "Int",
					"nickname": "String"
				}
			},
		]
		
# url/user/SearchUser/колличеcтво_данных/страница
- Страничный вывод
- ***Поиск пользователей***
 Формат POST ***React->Сервер***
 Данные поиска:

		{
			"nick"	: String
		}

- ***Ответ***
 Формат JSON ***Сервер->React***
 Данные поиска:
 
		{
			"count": int,
			"data": [
				{
					"user": {
						"id_user"int,
						"nickname": string
					}
				}
			]
		}
		
		

# url/user/logout
- ***Выход из аккаунта***
- ***Ответ сервера***
 Формат JSON ***Сервер->React***
 Данные поиска:
 
		{
    		"logout": "bool"
		}

# url/user/Friends
- ***Список друзей, GET запрос***
- ***Ответ сервера.***
 Формат JSON ***Сервер->React***
 Данные поиска:

		[
			{
				"friend": {
					"id_user": int,
					"nickname": string
				}
			},
		]
 В случае, если не авторизован или присутсвует ошибка 
	
		{
			err: "string"
		}
		

# url/user/Friends/колличеcтво_данных/страница
- Страничный вывод
- ***Список друзей, GET запрос***
- ***Ответ сервера.***
 Формат JSON ***Сервер->React***
 Данные поиска:
 
		{
			"count": Int,
			"data": [
				{
					"friend": {
						"id_user": int,
						"nickname": String
					}
				}
			]
		}
		
 В случае, если не авторизован или присутсвует ошибка 
	
		{
			err: "string"
		}
		
# url/user/FriendRequests
- ***Список входящих заявок в друзья, GET запрос***
- ***Ответ сервера.***
 Формат JSON ***Сервер->React***
 Данные поиска:
 
			[
				{
					"request": {
						"id_user": int,
						"nickname": string
					}
				},
			]
			
 В случае, если не авторизован или присутсвует ошибка 
	
		{
			err: "string"
		}
		
# url/user/FriendRequests/колличеcтво_данных/страница
- Страничный вывод
- ***Список входящих заявок в друзья, GET запрос***
- ***Ответ сервера.***
 Формат JSON ***Сервер->React***
 Данные поиска:
 
		{
			"count": int,
			"data": [
				{
					"request": {
						"id_user": int,
						"nickname": string
					}
				}
			]
		}

 В случае, если не авторизован или присутсвует ошибка 
	
		{
			err: "string"
		}
		
# url/user/FriendRequestsSent
- ***Список отправленных заявок в друзья, GET запрос***
- ***Ответ сервера.***
 Формат JSON ***Сервер->React***
 Данные поиска:
 
			[
				{
					"request": {
						"id_user": int,
						"nickname": string
					}
				},
			]
			
 В случае, если не авторизован или присутсвует ошибка 
	
		{
			err: "string"
		}
		
# url/user/FriendRequestsSent/колличеcтво_данных/страница
- Страничный вывод
- ***Список отправленных заявок в друзья, GET запрос***
- ***Ответ сервера.***
 Формат JSON ***Сервер->React***
 Данные поиска:
 
		{
			"count": int,
			"data": [
				{
					"request": {
						"id_user": int,
						"nickname": string
					}
				}
			]
		}
		
 В случае, если не авторизован или присутсвует ошибка 
	
		{
			err: "string"
		}
		
		
# url/user/AddFriend
- ***Добавить в друзья (отправить заявку), Post запрос***
 Формат POST ***React->Сервер***
 Данные поиска:

		{
			"newFriend"	: int
		}
		
- ***Ответ сервера.***
 Формат JSON ***Сервер->React***
 Данные поиска:
 
		{
			"add": true
		}
		
 В случае, если не авторизован или присутсвует ошибка 
	
		{
			err: "string"
		}
		
# url/user/AcceptFriend
- ***Подтверждение заявки в друзья, Post запрос***
 Формат POST ***React->Сервер***
 Данные поиска:

		{
			"newFriend"	: int
		}
		
- ***Ответ сервера.***
 Формат JSON ***Сервер->React***
 Данные поиска:
 
		{
			"add": true
		}
		
 В случае, если не авторизован или присутсвует ошибка 
	
		{
			err: "string"
		}
		
# url/user/DeleteFriend
- ***Удаление из друзей, Post запрос***
 Формат POST ***React->Сервер***
 Данные поиска:

		{
			"friend": int
		}
		
- ***Ответ сервера.***
 Формат JSON ***Сервер->React***
 Данные поиска:
 
		{
			"add": true
		}
		
 В случае, если не авторизован или присутсвует ошибка 
	
		{
			err: "string"
		}
		
# url/user/UserAccount
- ***Данные профиля другого юзера, Post запрос***
 Формат POST ***React->Сервер***
 Данные поиска:

			{
				"user":"2"
			}
		
- ***Ответ сервера.***
 Формат JSON ***Сервер->React***
 Данные поиска:
  ***Status*** cтатус друзей. Проверка,  -1 - нет в друзьях, 0 отпралена заявка, 1 - входящая заявка, 2 - в друзьях
 
		{
			"Status": int,
			"User": {
				"Mail": string,
				"Nick": string,
				"City":string,
				"UrlPicture": string,
			}
		}
		
 В случае, если не авторизован или присутсвует ошибка 
	
		{
			err: "string"
		}
		
