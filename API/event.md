--------
# url/event/list/колличеcтво_данных/страница
- **краткая форма мероприятий для главной страницы**
- **Страничный вывод, GET запрос**
Формат JSON ***сервер->React***
 список событий:
 
		[
			{
				"id": int,
				"name": string,
				"date": string,
				"address": {
					"id": int,
					"street": string,
					"house": string,
					"latitude": decimal,
					"longitude": decimal,
					"id_city": 1
				},
				"image": string,
				"tags": [int]
			}
		]

----------
# url/event/info 
- ***полная ифнормация об мероприятии***
- **POST запрос**
 Формат POST ***React->Сервер***
 Данные входа:
 
		{
			"idEvent" : int
		}


 Формат JSON ***сервер->React***
 Данные аккаунта:

		{
				"id": int,
				"name": string,
				"info": string,
				"link": string,
				"ticket_price": float,
				"id_organizer": int,
				"address": {
					"id": int,
					"street": string,
					"house": string,
					"latitude": decimal,
					"longitude": decimal,
					"id_city": 1
				},
				"image": string,
				"organization_name": string,
				"countvisitor": int,
				"logo": string,
				"datatime": string,
				"tags": [int],
				"statusVisit": bool ( отображается при авторизации, true - идет на событие, false - не идет)
		}

---
# url/event/tag/колличеcтво_данных/страница
- ***список всех тегов странично***
- **GET запрос**
 Формат JSON ***Сервер->React***
 Данные:
 
		[
			{
					"id":int,
					"title": string
			}
		]	

		
---
# url/event/tag/id_Тега
- ***список всех тегов (/id_Тега при необходимости получения конкретного тега - необязательная переменная)***
- **GET запрос**
 Формат JSON ***Сервер->React***
 Данные:
 
		
			{
					"id":int,
					"title": string
			}
		
---
# url/event/tag
- ***отправить тег для предложения***
- **POST запрос**
 Формат JSON ***React->Сервер***
 Данные:
 
			{
					"title": string
			}	
		
---
# url/event/search/колличеcтво_данных/страница
- ***поиск по мероприятиям (по названию и информации о нем), (каждый отрибут необязательный, должен быть хотя бы один)***
- **POST запрос**
 Формат POST ***React->Сервер***
 Данные входа:
 
		{
			"word" : string,
			"tags": [int],
			"dateFrom" : string ("2021-05-05 14:30:30+00") ,
			"dateTo" : string
		}

 Формат JSON ***сервер->React***
 Данные аккаунта:

		[
			{
				"id": int,
				"name": string,
				"info": string,
				"image": string,
				"tags": [int],
				"address": {
					"id": 65065,
					"street": "Петропавловская улица",
					"house": "121",
					"latitude": 58.0069246,
					"longitude": 56.1957681,
					"id_city": 1
				}
			}	
		]
		
---

# url/event/searchTag
- ***поиск тегов по слову (возвращает до 10 тегов)***
- **POST запрос**
 Формат POST ***React->Сервер***
 Данные входа:
 
		{
			"word" : string
		}

 Формат JSON ***сервер->React***
 Данные аккаунта:

		[
			{
				"id": int,
				"title": string
			}	
		]
		

---