**** - (не нужен при реализации spa)

--------
# url/
- **главная страница**
Формат JSON ***сервер->React***
 Для списка событий:
 
			[ "event": {
				"name": String ,
				"tags": [ String ],
				"info": String
			} ]


----------
# url/user 
- *** аккаунт***
 Формат JSON ***сервер->React***
 Данные аккаунта:


			[ "User": {
				"Mail": UserMail,
				"Nick": UserNickname,
				"City": UserCity,
				"UrlPicture" : Url,
				"Auth" : True //False
			} ]


---
###### **url/user/login 
	**страница входа
---
#url/user/login/postLogin
- ***валидация данных из формы входа***
 Формат POST ***React->Сервер***
 Данные входа:
 

			[ "Login": {
				"Mail": UserMail,
				"Password": UserNickname
			} ]
			
 
- ***Ответ на корректность данных***
 Формат JSON *** Сервер->React***
 Данные входа:
 

			[ "Login": {
				"Flag": True //False
			} ]

---
###### ** url/user/registration 
	**переход на форму регистрации
---

#url/user/registration/postreg 
- *** Регистрация***
 Формат POST ***React->Сервер***
 Данные регистрации:


			[ "Registration": {
				"mail": Mail,
				"nick": Nickname,
				"pas": Password,
				"acpas" : RepeatPassword
			} ]

- ***Ответ на корректность данных***
 Формат JSON *** Сервер->React***
 Данные входа:
 

			[ "Login": {
				"NickNameFlag": True, //False
				"MailFlag": True, //False
			} ]

