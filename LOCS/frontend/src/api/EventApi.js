// import { FetchInstance } from "./api";

// const POST = 'POST';
// const GET = 'GET';

// class OrganizerApi extends FetchInstance {
//     __createEventRoute = 'org/createEvent';
    
//     __createEventBody = (idAddres, name, info, price, link, tags) => ({
//         idAddres: idAddres, 
//         name: name, 
//         info: info, 
//         price: price, 
//         link: link, 
//         tags: tags
//     });
    
//     createEvent = (idAddres, name, info, price, link, tags) => this.go(
//         POST,
//         this.__createEventRoute,
//         this.__createEventBody(idAddres, name, info, price, link, tags),
//         true
//     );
// }

// export const organizerApi = new OrganizerApi();