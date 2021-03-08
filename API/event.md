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
				"idAddress": int,
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
				"id_address": int,
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
- ***поиск по мероприятиям (по названию и информации о нем)***
- **POST запрос**
 Формат POST ***React->Сервер***
 Данные входа:
 
		{
			"word" : string
		}

 Формат JSON ***сервер->React***
 Данные аккаунта:

		{
			"count": int,
			"events": [
					{
						"id": int,
						"name": string,
						"info": string,
						"image": string,
						"tags": [int]
					}	
				]
		}

---
