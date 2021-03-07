# ТЕГИ
--------
# url/admin/accepttag/:id
- **Подтвердить тег **
- **PUT запрос**

- ***Ответ на корректность данных***
 Формат http status ***Сервер->Клиент***
 
--------
# url/admin/tag/:id
- **Удалить тег **
- **DELETE запрос**

- ***Ответ на корректность данных***
 Формат http status ***Сервер->Клиент***
 
--------
# url/admin/tag
- **Добавить тег **
 Формат POST ***Клиент->Сервер***
 Данные входа:
 
		{
			"title" : text,
			"deleted" : bool,
			"accept" : bool,
			"countevents" : int
		}
		
- ***Ответ на корректность данных***
 Формат http status ***Сервер->Клиент***
 
--------
# url/admin/tag/:limit/:offset
- **Все теги **
 Формат GET ***Клиент->Сервер***
 Данные входа:
 
		{
			"id" : int,
			"title" : text,
			"deleted" : bool,
			"accept" : bool,
			"countevents" : int
		}
		
- ***Ответ на корректность данных***
 Формат http status ***Сервер->Клиент***
 Формат JSON ***сервер->Клиент***
 Данные :

		{
			"title" : text,
			"deleted" : bool,
			"accept" : bool,
			"countevents" : int
		}
		
--------
# url/admin/tag/:id
- **Изменить тег **
 Формат PUT ***Клиент->Сервер***
 Данные входа:
 
		{
			"title" : text,
			"deleted" : bool,
			"accept" : bool,
			"countevents" : int
		}
		
- ***Ответ на корректность данных***
 Формат http status ***Сервер->Клиент***
 
 
# ГОРОДА
--------
# url/admin/city/:limit/:offset
- **Все города **
 Формат GET ***Клиент->Сервер***		
- ***Ответ ***
 Формат JSON ***сервер->Клиент***
 Данные :

		{
			"id" : text,
			"title" : bool,
			"deleted" : bool
		}
	
	
--------
# url/admin/city
- **Добавить город **
 Формат POST ***Клиент->Сервер***
 Данные входа:
 
		{
			"title" : text,
			"deleted" : bool
		}
		
- ***Ответ на корректность данных***
 Формат http status ***Сервер->Клиент***
 
 --------
# url/admin/city/:id
- **Изменить город **
 Формат PUT ***Клиент->Сервер***
 Данные входа:
 
		{
			"title" : text,
			"deleted" : bool
		}
		
- ***Ответ на корректность данных***
 Формат http status ***Сервер->Клиент***
 
 --------
# url/admin/city/:id
- **Удалить город **
- **DELETE запрос**
- ***Ответ на корректность данных***
 Формат http status ***Сервер->Клиент***
 

 
# АДРЕС
--------
# url/admin/address/:limit/:offset
- **Все адреса **
 Формат GET ***Клиент->Сервер***		
- ***Ответ ***
 Формат JSON ***сервер->Клиент***
 Данные :
		{
			"id" : int,
			"street" : text,
			"house" : text,
			"latitude" : decimal,
			"longitude" : decimal,
			"id_city" : int,
			"deleted" : bool,
		}
	
--------
# url/admin/address
- **Добавить адрес **
 Формат POST ***Клиент->Сервер***
 Данные входа:
 
		{
			"street" : text,
			"house" : text,
			"latitude" : decimal,
			"longitude" : decimal,
			"id_city" : int,
			"deleted" : bool,
		}
		
- ***Ответ на корректность данных***
 Формат http status ***Сервер->Клиент***
 
 --------
# url/admin/address/:id
- **Изменить адрес **
 Формат PUT ***Клиент->Сервер***
 Данные входа:
 
		{
			"street" : text,
			"house" : text,
			"latitude" : decimal,
			"longitude" : decimal,
			"id_city" : int,
			"deleted" : bool,
		}
		
- ***Ответ на корректность данных***
 Формат http status ***Сервер->Клиент***
 
 --------
# url/admin/address/:id
- **Удалить район **
- **DELETE запрос**
- ***Ответ на корректность данных***
 Формат http status ***Сервер->Клиент***
 
# юзер/организаторы
--------
# url/admin/organization/:limit/:offset
- **Все организаторы **
 Формат GET ***Клиент->Сервер***		
- ***Ответ ***
 Формат JSON ***сервер->Клиент***
 Данные :
		{
			"id_user" : int,
			"info" : text,
			"organization_name" : text,
			"organization_link" : text,
			"logo" : text,
			"banned" : bool,
		}

--------
# url/admin/users/:limit/:offset
- **Все юзеры **
 Формат GET ***Клиент->Сервер***		
- ***Ответ ***
 Формат JSON ***сервер->Клиент***
 Данные :
		{
			"id_user" : int,
			"nickname" : text,
			"profile_picture" : text
		}

 --------
# url/admin/unban
- **Разбанить юзера **
 Формат POST ***Клиент->Сервер***
 Данные входа:
 
		{
			"id" : int
		}

- ***Ответ на корректность данных***
 Формат http status ***Сервер->Клиент***
 
  --------
# url/admin/ban
- **Забанить юзера + добавление причины и удаление всех ивентов**
 Формат POST ***Клиент->Сервер***
 Данные входа:
 
		{
			"id" : int,
			"reason" : text
		}

- ***Ответ на корректность данных***
 Формат http status ***Сервер->Клиент***
 
 
 
# СОБЫТИЕ
--------
# url/admin/event/:limit/:offset
- **Все события **
 Формат GET ***Клиент->Сервер***		
- ***Ответ ***
 Формат JSON ***сервер->Клиент***
 Данные :
		{
			"id" : int,
			"name" : text,
			"info" : text,
			"link" : text,
			"ticket_price" : decimal,
			"id_organizer" : int,
			"id_address": int,
			"published": bool,
			"image" : text,	
			"deleted" : bool,
			"datatime" : text
		}

 --------
# url/admin/event
- **Опубликовать событие **
 Формат POST ***Клиент->Сервер***
 Данные входа:
 
		{
			"id" : int
		}

- ***Ответ на корректность данных***
 Формат http status ***Сервер->Клиент***
 
 --------
# url/admin/event
- **Отмена публикации события **
 Формат PUT ***Клиент->Сервер***
 Данные входа:
 
		{
			"id" : int
		}

- ***Ответ на корректность данных***
 Формат http status ***Сервер->Клиент***
 
  --------
# url/admin/event
- **Удалить событие **
- **DELETE запрос**
- ***Ответ на корректность данных***
 Формат http status ***Сервер->Клиент***
 