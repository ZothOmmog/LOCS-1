----------
# url/user 
- ***аккаунт***
 Формат JSON ***сервер->React***
 Данные аккаунта:


		{ 
				"mail": "String",
				"nick": "String",
				"city": "String",
				"urlPicture" : "String",
				"acceptMail": true,
				"auth" :"Bool"
		}

---
# url/user/login
- ***валидация данных из формы входа***
 Формат POST ***React->Сервер***
 Данные входа:
 

		{ 
				"mail": "String",
				"pas": "String"
		}
			
 
- ***Ответ на корректность данных***
 Формат http status ***Сервер->React***
(добавляет два куки, userId - токен авторизации, roleId - индекс роли)
 
---

# url/user/registration 
- ***Регистрация***
 Формат POST ***React->Сервер***
 Данные регистрации:

		{ 
				"mail": "String",
				"nick": "String",
				"pas": "String"			
		}

- ***Ответ на корректность данных***
 Формат http status ***Сервер->React***
	(в случае существования почты или ника в системе - вернет status 400 {"CheckMail": 0 или 1, "CheckNick": 0 или 1} , где 0 - сущесвтует данное значение, 1 - не сущесвтует )

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
			"users": 
				[
					{
							"id_user"int,
							"nickname": string
					}
				]
		}
		
		

# url/user/logout
- ***Выход из аккаунта***
- ***Ответ сервера***
 Формат http status ***Сервер->React***


# url/user/Friends/колличеcтво_данных/страница
- Страничный вывод
- ***Список друзей, GET запрос***
- ***Ответ сервера.***
 Формат JSON ***Сервер->React***
 Данные поиска:
 
		{
			"count": Int,
			"users": 
				[
					{
							"id_user": int,
							"nickname": String

					}
				]
		}

		
		
# url/user/FriendRequests/колличеcтво_данных/страница
- Страничный вывод
- ***Список входящих заявок в друзья, GET запрос***
- ***Ответ сервера.***
 Формат JSON ***Сервер->React***
 Данные поиска:
 
		{
			"count": int,
			"users": 
				[
					{
							"id_user": int,
							"nickname": string
					}
				]
		}

			
# url/user/FriendRequestsSent/колличеcтво_данных/страница
- Страничный вывод
- ***Список отправленных заявок в друзья, GET запрос***
- ***Ответ сервера.***
 Формат JSON ***Сервер->React***
 Данные поиска:
 
		{
			"count": int,
			"users": 
				[
					{
							"id_user": int,
							"nickname": string
						
					}
				]
		}
		
# url/user/AddFriend
- ***Добавить в друзья (отправить заявку), Post запрос***
 Формат POST ***React->Сервер***
 Данные поиска:

		{
			"newFriend"	: int
		}
		
- ***Ответ сервера.***
 Формат http status ***Сервер->React***


		
# url/user/AcceptFriend
- ***Подтверждение заявки в друзья, Post запрос***
 Формат POST ***React->Сервер***
 Данные поиска:

		{
			"newFriend"	: int
		}
		
- ***Ответ сервера.***
 Формат http status  ***Сервер->React***

		
# url/user/DeleteFriend
- ***Удаление из друзей, Post запрос***
 Формат POST ***React->Сервер***
 Данные поиска:

		{
			"friend": int
		}
		
- ***Ответ сервера.***
 Формат http status  ***Сервер->React***
		
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
		
