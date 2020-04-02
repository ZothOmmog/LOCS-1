**** - (не нужен для React)

----------
# url/ - главная страница 
----------
	## Формат JSON ***сервер->React***
		### Для списка событий:
<
[
		"event": {
			"name": String ,
			"tags": [ String ],
			"info": String
		}
]
>

----------
# url/user - аккаунт
----------
		## Формат JSON ***сервер->React***
		### Данные аккаунта:
<
[
		"Account": {
			"Mail": UserMail,
			"Nick": UserNickname,
			"City": UserCity,
			"UrlPicture" : Url
		}
]
>


	#### **** 2.1)url/user/login - переход на форму входа 
	2.2)url/user/login/postLogin - валидация данных из формы входа, обработка и переадресация на пункт 2
	#### **** 2.3)url/user/registration - переход на форму регистрации
	2.4)url/user/registration/postreg - валидация данных из формы регистрации, обработка и переадресация на пункт 2

# url/event -события

	**** 3.1)url/event/create - переход на форму создания события