const config = require('../../../DBsetings.json');
let pgp = require("pg-promise")( /*options*/ );
let db = pgp(config);

//проверка, что такое мыло есть
const CheckUser = (mail) => {
    return new Promise((resolve, reject) => {
        db.many("select CheckUser($1);", mail)
            .then(function(data) {
                resolve(data[0].checkuser);
            }).catch(function() {
                reject("ERROR BD: CheckUser");
                return;
            });
    });
};

//проверка, что такой ник есть
const CheckNick = (nick) => {
    return new Promise((resolve, reject) => {
        db.many("select CheckNick($1);", nick)
            .then(function(data) {
                resolve(data[0].checknick);
            }).catch(function() {
                reject("ERROR BD: CheckNick");
                return;
            });
    });
};

//время бд сейчас
const TimeNow = () => {
    return new Promise((resolve, reject) => {
        db.many("SELECT CURRENT_TIMESTAMP;")
            .then(function(data) {
                resolve(String(data[0].current_timestamp));
            }).catch(function() {
                reject("ERROR BD: TimeNow");
                return;
            });
    });
};
//регистрация нового пользователя
const AddUser = (nick, mail, hashpas, role, city, createtime) => {
    return new Promise((resolve, reject) => {
        db.oneOrNone('select * from  CreateUser($1, $2, $3, $4, $5, $6);', [nick, mail, hashpas, role, city, createtime])
            .then(function(data) {
                resolve(data.createuser);
            }).catch(function(data) {
                console.log(data);
                reject("ERROR BD: AddUser");
                return;
            });
    });
};

//Дата создания по почте

const DateCreate = (mail) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone("select DateCreate($1);", [mail])
            .then(function(data) {
                resolve(data[0].datecreate);
            }).catch(function() {
                reject("ERROR BD: DateCreate");
                return;
            });
    });
};

//ID авторазации 
const LogUser = (mail, hashpas) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone("select LogUser($1,$2);", [mail, hashpas])
            .then(function(data) {
                resolve(data[0].loguser);
            }).catch(function() {
                reject("ERROR BD: LogUser");
                return;
            });
    });
};

//Роль пользователя
const RoleUser = (UserId) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone("select RoleUser($1);", UserId)
            .then(function(data) {
                resolve(data[0].roleuser);
            }).catch(function() {
                reject("ERROR BD: RoleUser");
                return;
            });
    });
};

//Данные об аккаунте по ID

const DataUserAccount = (userId, cityId = null) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone("select DataUserAccount($1,$2);", [userId, cityId])
            .then(function(data) {

                let strData = String(data[0].datauseraccount).replace(")", "");
                strData = strData.replace("(", "");
                resolve(strData.split(','));

            }).catch(function() {
                reject("ERROR BD: DataUserAccount");
                return;
            });
    });
};


//ID и ник по поиску 
const datauserlist = (nick) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone("select datauserlist($1) as User;", "%" + nick + "%")
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: datauserlist");
                return;
            });
    });
};

//count(ID и ник по поиску )
const Countdatauserlist = (nick) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone("select count(*) from ( select datauserlist($1) )a;", ["%" + nick + "%"])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: Countdatauserlist");
                return;
            });
    });
};

//ID и ник по поиску с ограничениями 
const datauserlistLimit = (nick, limit, offset) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone("select datauserlistwithlimit($1,$2,$3) as User;", ["%" + nick + "%", limit, offset])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: datauserlistLimit");
                return;
            });
    });
};


//Список друзей
const friendList = (id) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone("select friendList($1) as friend;", [id])
            .then(data => {
                resolve(data);
            }).catch(function(err) {
                console.log(err);
                reject("ERROR BD: friendList ");
                return;
            });

    });
};


//Список друзей странично
const friendListLimit = (id, limit, offset) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone("select friendListWithLimit($1,$2,$3) as friend;", [id, limit, offset])
            .then(data => {
                resolve(data);
            }).catch(function(err) {
                console.log(err);
                reject("ERROR BD: friendListLimit ");
                return;
            });

    });
};

//Размер списка друзей 
const CountfriendListLimit = (id, limit, offset) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone("select count(*) from (select friendList($1))a;", [id])
            .then(data => {
                resolve(data);
            }).catch(function(err) {
                console.log(err);
                reject("ERROR BD: CountfriendListLimit ");
                return;
            });

    });
};

//Список отправленых заявок 
const friendRequestsSent = (id) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone("select friendRequestsSent($1) as request;", [id])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: friendRequestsSent");
                return;
            });
    });
};

//колличество отправленых заявок 
const countfriendRequestsSent = (id) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone("select count(*) from (select friendRequestsSent($1))a;", [id])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: countfriendRequestsSent");
                return;
            });
    });
};


//Список отправленых заявок странично 
const friendRequestsSentWithLimit = (id, limit, offset) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone("select friendRequestsSentWithLimit($1,$2,$3) as request;", [id, limit, offset])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: friendRequestsSentWithLimit");
                return;
            });
    });
};



//Список входящих заявок 
let friendRequests = (id) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone("select friendRequests($1) as request;", [id])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: friendRequests");
                return;
            });
    });
};

//Список входящих заявок (колличество)
let CountfriendRequests = (id) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone("select count(*) from (select friendRequests($1))a;", [id])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: CountfriendRequests");
                return;
            });
    });
};


//Список входящих заявок  странично
let friendRequestsWithLimit = (id, limit, offset) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone("select friendRequestsWithLimit($1,$2,$3) as request;", [id, limit, offset])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: friendRequestsWithLimit");
                return;
            });
    });
};


//доабвление в друзья
let addFriend = (id, id2) => {
    return new Promise((resolve, reject) => {
        db.result('Call AddFriend($1, $2);', [id, id2])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR BD: AddFriend");
                return;
            });
    })
}

//Подтверждение заявки в друзья (user 1 Подтверждает)
let acceptFriend = (id, id2) => {
    return new Promise((resolve, reject) => {
        db.result('Call AcceptFriend($1, $2);', [id, id2])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR BD: AcceptFriend");
                return;
            });
    })
}

//Удаление из друзей
let deleteFriend = (id, id2) => {
    return new Promise((resolve, reject) => {
        db.result('Call DeleteFriend($1, $2);', [id, id2])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR BD: DeleteFriend");
                return;
            });
    })
}


// Статус друзей. Проверка,  -1 - нет в друзьях, 0 отпралена заявка, 1 - входящая заявка, 2 - в друзьях
let friendStatus = (id, id2) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone("select FriendStatus($1, $2);", [id, id2])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: FriendStatus");
                return;
            });
    });
};

///////////////////
//добавить токен
let addToken = (tok, obj) => {
    return new Promise((resolve, reject) => {
        db.result('Call AddToken($1, $2);', [String(tok), String(obj)])
            .then(function(data) {
                resolve(true);
            }).catch(function(e) {
                console.log(e);
                reject("ERROR BD: addToken");
                return;
            });
    })
}

//удалить токен
let DeleteToken = (tok) => {
    return new Promise((resolve, reject) => {
        db.result('Call DeleteToken($1);', [tok])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR BD: DeleteToken");
                return;
            });
    })
}

//изменить роль на организатора в токене
let changeTokenToOrg = (tok) => {
    return new Promise((resolve, reject) => {
        db.result('Call changeTokenToOrg($1);', [tok])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR BD: changeTokenToOrg");
                return;
            });
    })
}

// вернуть токен 
let TakeToken = (tok) => {
    return new Promise((resolve, reject) => {
        db.oneOrNone("select TakeToken($1);", [tok])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: TakeToken");
                return;
            });
    });
};

//добавить токен для создания ссылки подтверждения аккаунта
let addTokenToAccept = (tok, obj) => {
    return new Promise((resolve, reject) => {
        db.result('Call AddTokenToAccept($1, $2);', [String(tok), Number(obj)])
            .then(function(data) {
                resolve(true);
            }).catch(function(e) {
                console.log(e);
                reject("ERROR BD: AddTokenToAccept");
                return;
            });
    })
}

//подтв аккаунт
let acceptMail = (tok) => {
    return new Promise((resolve, reject) => {
        db.result('Call acceptMail($1);', [tok])
            .then(function(data) {
                resolve(true);
            }).catch(function(e) {
                console.log(e);
                reject("ERROR BD: acceptMail");
                return;
            });
    })
}

//вернуть токен по id для подтв аккаунт
let returnTokenAcceptMail = (id) => {
    return new Promise((resolve, reject) => {
        db.oneOrNone('select * from returnTokenAcceptMail($1);', [id])
            .then(function(e) {
                resolve(e.returntokenacceptmail);
            }).catch(function(e) {
                console.log(e);
                reject("ERROR BD: returnTokenAcceptMail");
                return;
            });
    })
}



////
//Добавить район
let addDistrict = (title, id_city) => {
    return new Promise((resolve, reject) => {
        db.result('Call AddDistrict($1, $2);', [title, id_city])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR BD: AddDistrict");
                return;
            });
    })
}

//Добавить адрес
let addAddress = (street, house, latitude, longitude, idDistrict) => {
    return new Promise((resolve, reject) => {
        db.result('Call AddAddress($1, $2,$3,$4,$5);', [street, house, latitude, longitude, idDistrict])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR BD: AddAddress");
                return;
            });
    })
}


///////////////////

//id тегов по Id евента
let EventTags = (id) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone('select EventTags($1);', [id])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: EventTags");
                return;
            });
    })
}

//  данные для главной страницы 
let eventShortList = (limit, offset) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone('select eventShortList($1,$2);', [limit, offset])
            .then(function(data) {
                resolve(data);
            }).catch(function(e) {
                console.log(e);
                reject("ERROR BD: eventShortList");
                return;
            });
    })
}

//  колличество данных event для главной страницы 
let countEventShortList = () => {
    return new Promise((resolve, reject) => {
        db.manyOrNone('select * from  countEventShortList(); ', [])
            .then(function(data) {
                resolve(data[0].j.count);
            }).catch(function(e) {
                console.log(e);
                reject("ERROR BD: countEventShortList");
                return;
            });
    })
}


// полные данные о событии
let event = (id) => {
    return new Promise((resolve, reject) => {
        db.oneOrNone('select Event($1);', [id])
            .then(function(data) {
                resolve(data);
            }).catch(function(e) {
                console.log(e);
                reject("ERROR BD: Event");
                return;
            });
    })
}

//  тег по id
let tagById = (id) => {
    return new Promise((resolve, reject) => {
        db.oneOrNone('select tagById($1);', [id])
            .then(function(data) {
                resolve(data);
            }).catch(function(e) {
                console.log(e);
                reject("ERROR BD: tagById");
                return;
            });
    })

};

// удалить тег по id
let deleteTag = (id) => {
    return new Promise((resolve, reject) => {
        db.result('call deleteTag($1);', [id])
            .then(function(data) {
                resolve(data);
            }).catch(function(e) {
                console.log(e);
                reject("ERROR BD: deleteTag");
                return;
            });
    })

};

// подтв. тег 
let acceptTag = (id) => {
    return new Promise((resolve, reject) => {
        db.result('call acceptTag($1);', [id])
            .then(function(data) {
                resolve(data);
            }).catch(function(e) {
                console.log(e);
                reject("ERROR BD: acceptTag");
                return;
            });
    })
};

// добавить тег 
let addTag = (title) => {
    return new Promise((resolve, reject) => {
        db.result('call addTag($1);', [title])
            .then(function(data) {
                resolve(data);
            }).catch(function(e) {
                console.log(e);
                reject("ERROR BD: addTag");
                return;
            });
    })
};

// весь лист тегов
let tags = () => {
        return new Promise((resolve, reject) => {
            db.manyOrNone('select Tags();')
                .then(function(data) {
                    resolve(data);
                }).catch(function(e) {
                    console.log(e);
                    reject("ERROR BD: tags");
                    return;
                });
        })

    }
    // кол. тегов
let CountTags = () => {
    return new Promise((resolve, reject) => {
        db.oneOrNone('select CountTags();')
            .then(function(data) {
                resolve(data);
            }).catch(function(e) {
                console.log(e);
                reject("ERROR BD: CountTags");
                return;
            });
    })

}

// весь лист тегов странично
let tagsLim = (limit, offset) => {
        return new Promise((resolve, reject) => {
            db.manyOrNone('select Tags($1,$2);', [limit, offset])
                .then(function(data) {
                    resolve(data);
                }).catch(function(e) {
                    console.log(e);
                    reject("ERROR BD: tags");
                    return;
                });
        })

    }
    // поиск евентов 
let searchEvent = (word, limit, offset) => {
        return new Promise((resolve, reject) => {
            db.manyOrNone('select searchEvent($1,$2,$3);', ["%" + word + "%", limit, offset])
                .then(function(data) {
                    resolve(data);
                }).catch(function(e) {
                    console.log(e);
                    reject("ERROR BD: searchEvent");
                    return;
                });
        })
    }
    //кол поиск евентов 
let countSearchEvent = (word) => {
    return new Promise((resolve, reject) => {
        db.oneOrNone('select countSearchEvent($1);', ["%" + word + "%"])
            .then(function(data) {
                resolve(data.countsearchevent.count);
            }).catch(function(e) {
                console.log(e);
                reject("ERROR BD: searchEvent");
                return;
            });
    })
}

///регистрация организатора 
let registationOrganizer = (id, info, organizationName, organizationLink, logo) => {
    return new Promise((resolve, reject) => {
        db.result('call userToOrganizer($1,$2,$3,$4,$5);', [id, info, organizationName, organizationLink, logo])
            .then(function(data) {
                resolve(true);
            }).catch(function(e) {
                console.log(e);
                reject("ERROR BD: searchEvent");
                return;
            });
    })
}

//изменние профиля организатора
let changeDataAboutOrg = (id, name, info, organizationLink) => {
    return new Promise((resolve, reject) => {
        db.result('call changedataaboutorg($1,$2,$3,$4);', [id, name, info, organizationLink])
            .then(function(data) {
                resolve(true);
            }).catch(function(e) {
                // console.log(e);
                //console.log("ERROR BD: changeDataAboutOrg");
                reject(e);
                return;
            });
    });
}




//Добавить событие (не учитывает теги, отдельная процедура)
let addEvent = (name, info, link, ticket_price, id_org, id_address, datatime, publish = true) => {
    return new Promise((resolve, reject) => {
        db.oneOrNone('select AddEvent($1, $2,$3,$4,$5,$6,$7,$8);', [name, info, link, ticket_price, id_org, id_address, publish, datatime])
            .then(function(data) {
                resolve(data.addevent);
            }).catch(function(e) {
                console.log(e);
                reject("ERROR BD: AddEvent");
                return;
            });
    })
}

//Удалить событие
let deleteEvent = (idEvent, idOrganizer) => {
    return new Promise((resolve, reject) => {
        db.result('Call DeleteEvent($1,$2);', [idEvent, idOrganizer])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR BD: deleteEvent");
                return;
            });
    })
}

//добавить тег евенту (tag - или название или id)
let addEventTag = (idEvent, tag) => {
    return new Promise((resolve, reject) => {
        db.result('Call AddEventTag($1,$2);', [idEvent, Number.parseInt(tag)])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR BD: AddEventTag");
                return;
            });
    })
}

//Изменение мероприятия (без тегов)
let changeEvent = (idev, name, info, link, ticketPrice, idOrg,
    idAddress, datatime, publish = true) => {
    return new Promise((resolve, reject) => {
        db.oneOrNone('select ChangeEvent($1,$2,$3,$4,$5,$6,$7,$8,$9);', [idev, name, info, link, ticketPrice, idOrg, idAddress, datatime, publish])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: changeEvent");
                return;
            });
    })
}

//удаление тегов у события 
let deleteEventTag = (id) => {
    return new Promise((resolve, reject) => {
        db.result('Call deleteEventTag($1);', [id])
            .then(function() {
                resolve(true);
            }).catch(function() {
                reject("ERROR BD: deleteEventTag");
                return;
            });
    })
}

//данные об организаторе
let organizerData = (id) => {
    return new Promise((resolve, reject) => {
        db.oneOrNone('select  organizerData($1);', [id])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: organizerData");
                return;
            });
    })
}

//данные об мероприятиях для организатора
let organizerEvents = (id) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone('select   organizerEvents($1);', [id])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: organizerEvents");
                return;
            });
    })
}

//Поиск организаторов странично
let searchOrglimit = (word, limit, offset) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone('select  searchOrg($1,$2,$3);', ["%" + word + "%", limit, offset])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: searchOrglimit");
                return;
            });
    })
}

//Поиск организаторов 
let searchOrg = (word) => {
        return new Promise((resolve, reject) => {
            db.manyOrNone('select   searchOrg($1);', ["%" + word + "%"])
                .then(function(data) {
                    resolve(data);
                }).catch(function() {
                    reject("ERROR BD: searchOrg");
                    return;
                });
        })
    }
    //кол Поиск организаторов 
let countSearchOrg = (word) => {
    return new Promise((resolve, reject) => {
        db.oneOrNone('select count(*) from  searchOrg($1);', ["%" + word + "%"])
            .then(function(data) {
                resolve(data.count);
            }).catch(function() {
                reject("ERROR BD: countSearchOrg");
                return;
            });
    })
}

//Статус подписки, Проверка, 0 не подписан, 1 - подписан
let subStatus = (idOrg, idUser) => {
    return new Promise((resolve, reject) => {
        db.oneOrNone('select   subStatus($1,$2);', [idOrg, idUser])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: subStatus");
                return;
            });
    })
}


//Подписка на организатора
let subOrg = (id_org, id_user) => {
    return new Promise((resolve, reject) => {
        db.result('Call subOrg($1,$2);', [id_org, id_user])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR BD: subOrg");
                return;
            });
    })
}

//список подписчиков организатора странично
let subscribersLimit = (idOrg, count, start) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone('select   subscribers($1,$2,$3);', [idOrg, count, start])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: subscribersLimit");
                return;
            });
    })
}

//список подписчиков организатора
let subscribers = (idOrg) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone('select  subscribers($1);', [idOrg])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: subscribers");
                return;
            });
    })
}


//кол подп организатора
let countSubscribers = (idOrg) => {
    return new Promise((resolve, reject) => {
        db.oneOrNone('select count(*) from subscribers($1);', [idOrg])
            .then(function(data) {
                resolve(data.count);
            }).catch(function() {
                reject("ERROR BD: countSubscribers");
                return;
            });
    })
}

//кол. подписчиков организатора
let countSub = (idOrg) => {
    return new Promise((resolve, reject) => {
        db.oneOrNone('select count(*) from   subscribers($1);', [idOrg])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: countSub");
                return;
            });
    })
}


//Отписка от организатора
let unSubOrg = (id_org, id_user) => {
    return new Promise((resolve, reject) => {
        db.result('Call unSubOrg($1,$2);', [id_org, id_user])
            .then(function(data) {
                resolve(true);
            }).catch(function() {
                reject("ERROR BD: unSubOrg");
                return;
            });
    })
}

//Список подписок
let subList = (id_user) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone('select subList($1);', [id_user])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: subList");
                return;
            });
    })
}

//кол записей Список подписок
let countSubList = (id_user) => {
    return new Promise((resolve, reject) => {
        db.oneOrNone('select count(*) from subList($1);', [id_user])
            .then(function(data) {
                resolve(data.count);
            }).catch(function() {
                reject("ERROR BD: countSubList");
                return;
            });
    })
}

//Список подписок странично
let subListLimit = (id_user, count, start) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone('select subList($1,$2,$3);', [id_user, count, start])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: subListLimit");
                return;
            });
    })
}


//Список событий странично по id организатора
let eventOrgListLimit = (id_user, count, start) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone('select eventOrgListLimit($1,$2,$3);', [id_user, count, start])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: eventOrgListLimit");
                return;
            });
    })
}

//Список событий по id организатора
let eventOrgList = (id_user) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone('select eventOrgList($1);', [id_user])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: eventOrgList");
                return;
            });
    })
}


//кол Список событий по id организатора
let countEventOrgList = (id_user) => {
    return new Promise((resolve, reject) => {
        db.oneOrNone('select count(*) from eventOrgList($1);', [id_user])
            .then(function(data) {
                resolve(data.count);
            }).catch(function() {
                reject("ERROR BD: countEventOrgList");
                return;
            });
    })
}


//проверка имени организатора
const checkOrganizationName = (nick) => {
    return new Promise((resolve, reject) => {
        db.one("select checkOrg($1);", [nick])
            .then(function(data) {
                resolve(data.checkorg);
            }).catch(function() {
                reject("ERROR BD: checkOrganizationName");
                return;
            });
    });
};

//получение id адреса
const getIdAddress = (street, house) => {
    return new Promise((resolve, reject) => {
        db.one("select getAddress($1,$2);", [street, house])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: getIdAddress");
                return;
            });
    });
};

//получение id адреса, поиск
const searchAddress = (word) => {
    return new Promise((resolve, reject) => {
        db.manyOrNone("select searchAddress($1);", ["%" + word + "%"])
            .then(function(data) {
                resolve(data);
            }).catch(function() {
                reject("ERROR BD: searchAddress");
                return;
            });
    });
};


////загрузка фото
//загрузка фото лк
const addPhotoAcc = (id, photo) => {
    return new Promise((resolve, reject) => {
        db.result('Call AddPhotoAcc($1, $2);', [id, photo])
            .then(function(data) {
                resolve(true);
            }).catch(function(e) {
                reject("ERROR BD: addPhotoAcc");
                return;
            });
    });
};

//загрузка фото организатора
const addPhotoOrg = (id, photo) => {
    return new Promise((resolve, reject) => {
        db.result('Call AddPhotoOrg($1, $2);', [id, photo])
            .then(function(data) {
                resolve(true);
            }).catch(function(e) {
                reject("ERROR BD: addPhotoOrg");
                return;
            });
    });
};

//загрузка фото события
const addPhotoEvent = (idOrg, idEvent, photo) => {
    return new Promise((resolve, reject) => {
        db.result('Call AddPhotoEvent($1, $2, $3);', [idOrg, idEvent, photo])
            .then(function(data) {
                resolve(true);
            }).catch(function(e) {
                reject("ERROR BD: addPhotoEvent");
                return;
            });
    });
};
module.exports = {

    //пользователь
    'CheckUser': CheckUser, //проверка, что такое мыло есть
    'CheckNick': CheckNick, //проверка, что такой ник есть
    'AddUser': AddUser, //регистрация нового пользователя
    'DateCreate': DateCreate, //Дата создания по почте
    'LogUser': LogUser, //ID авторазации 
    'RoleUser': RoleUser, //Роль пользователя
    'DataUserAccount': DataUserAccount, //Данные об аккаунте по ID

    'datauserlist': datauserlist, //ID и ник по поиску 
    'datauserlistLimit': datauserlistLimit, //ID и ник по поиску с ограничениями
    'Countdatauserlist': Countdatauserlist, //count(ID и ник по поиску )

    'friendList': friendList, //Список друзей
    'friendListLimit': friendListLimit, //Список друзей странично
    'CountfriendListLimit': CountfriendListLimit, //Размер списка друзей 

    'friendRequestsWithLimit': friendRequestsWithLimit, //Список входящих заявок постранично 
    'friendRequests': friendRequests, //Список входящих заявок
    'CountfriendRequests': CountfriendRequests, //Колличество  входящих заявок

    'friendRequestsSent': friendRequestsSent, //Список отправленых заявок 
    'countfriendRequestsSent': countfriendRequestsSent, //Колличество отправленых заявок
    'friendRequestsSentWithLimit': friendRequestsSentWithLimit, //Список отправленых заявок с ограничениями


    'addFriend': addFriend, //доабвление в друзья
    'acceptFriend': acceptFriend, //Подтверждение заявки в друзья (user 1 Подтверждает)
    'deleteFriend': deleteFriend, //Удаление из друзей
    'friendStatus': friendStatus, // Статус друзей. Проверка,  -1 - нет в друзьях, 0 отпралена заявка, 1 - входящая заявка, 2 - в друзьях

    ///бд
    'TimeNow': TimeNow, //время бд сейчас
    'addToken': addToken, //добавить токен
    'TakeToken': TakeToken, //вернуть токен
    'deleteToken': DeleteToken, //удалить токен
    'changeTokenToOrg': changeTokenToOrg, //изменить роль на организатора в токене

    'acceptMail': acceptMail, //подтв аккаунт
    'returnTokenAcceptMail': returnTokenAcceptMail, //вернуть токен по id для подтв аккаунт

    //для админки 
    'addDistrict': addDistrict, //Добавить район
    'addAddress': addAddress, //Добавить адрес
    'addTag': addTag, //добавить тег
    'acceptTag': acceptTag, // подтв. тег
    'deleteTag': deleteTag, //удалить тег

    //события 
    'EventTags': EventTags, //Теги по Id евента
    'eventShortList': eventShortList, //  данные для главной страницы 
    'event': event, //полные данные о событии
    'countEventShortList': countEventShortList, //  колличество данных event для главной страницы 

    'tags': tags, //весь лист тегов
    'CountTags': CountTags, //кол тегов
    'tagsLim': tagsLim, //весь лист тегов странично
    'tagById': tagById, //  тег по id


    'searchEvent': searchEvent, //поиск евентов (без тегов)
    'countSearchEvent': countSearchEvent, //кол поиск евентов 


    //организатор
    'addEvent': addEvent, //создать событие
    'deleteEvent': deleteEvent, //удалить событие
    'addEventTag': addEventTag, //добавить тег евенту

    'addTokenToAccept': addTokenToAccept, //добавить токен для создания ссылки подтверждения аккаунта


    'registationOrganizer': registationOrganizer, ///регистрация организатора 

    'changeDataAboutOrg': changeDataAboutOrg, //изменние профиля организатора

    'changeEvent': changeEvent, //изменить событие (без тегов)
    'deleteEventTag': deleteEventTag, //удаление тегов у события

    'organizerData': organizerData, //данные об организаторе

    'organizerEvents': organizerEvents, //данные об мероприятиях для организатора
    'searchOrglimit': searchOrglimit, //Поиск организаторов странично
    'subStatus': subStatus, //Статус подписки, Проверка, 0 не подписан, 1 - подписан

    'subscribersLimit': subscribersLimit, //список подписчиков организатора странично
    'countSubscribers': countSubscribers, //кол подп организатора
    'countEventOrgList': countEventOrgList, //кол Список событий по id организатора
    'countSearchOrg': countSearchOrg, // кол Поиск организаторов 

    'countSubList': countSubList, //rол записей Список подписок

    'subscribers': subscribers, //список подписчиков организатора
    'countSub': countSub, //кол. подписчиков организатора

    'getIdAddress': getIdAddress, //получение id адреса
    'searchAddress': searchAddress, //получение id адреса, поиск

    //работа с организаторами
    'subList': subList, //Список подписок
    'subListLimit': subListLimit, // Список подписок странично
    'unSubOrg': unSubOrg, //Отписка от организатора
    'subOrg': subOrg, //Подписка на организатора
    'searchOrg': searchOrg, //Поиск организаторов 

    'eventOrgList': eventOrgList, //Список событий по id организатора
    'eventOrgListLimit': eventOrgListLimit, //Список событий странично по id организатора

    'checkOrganizationName': checkOrganizationName, //проверка имени организатора

    //фото
    'addPhotoAcc': addPhotoAcc, //загрузка фото лк
    'addPhotoOrg': addPhotoOrg, //загрузка фото организатора
    'addPhotoEvent': addPhotoEvent, //загрузка фото события

};