import { FetchInstance } from "./api";

const POST = 'POST';
const GET = 'GET';

class OrganizerApi extends FetchInstance {
    __getMeOrgRoute = 'org/';
    __getMyEventsRoute = (pageSize, pageNumber) => `org/myEvents/${pageSize}/${pageNumber}`
    __signUpRoute = 'org/registration';
    __deleteEventRoute = 'org/delete';
    __createEventRoute = 'org/createEvent';
    __editEventRoute = 'org/chaneEvent';
    __getOrgRoute = 'org/account';
    __searchOrgRoute = (pageSize, pageNumber) => `org/search/${pageSize}/${pageNumber}`
    __getOrgEventsRoute = 'org/events';
    __subscribeRoute = 'org/subscribe';
    __unSubscribeRoute = 'org/unSubscribe';
    __subscribersRoute = 'org/subs';
    __subscribesRoute = (pageSize, pageNumber) => `org/subUser/${pageSize}/${pageNumber}`
    __subscribersPagesRoute = (pageSize, pageNumber) => `org/subs/${pageSize}/${pageNumber}`
    
    
    __signUpBody = (info, orgName, orgLink, logoLink) => ({ info: info, organizationName: orgName, organizationLink: orgLink, logo: logoLink });
    __deleteEventBody = (id) => ({ idEvent: id });
    __createEventBody = (idAddress, name, info, price, link, tags, timestamp) => ({ idAddress, name, info, price, link, tags, timestamp });
    __editEventBody = (eventId, idAddres, name, info, price, link, tags) => ({ idEvent: eventId, idAddress: idAddres, name: name, info: info, price: price, link: link, tags: tags });
    __getOrgBody = (orgId) => ({ org: orgId });
    __searchOrgBody = (word) => ({ word: word });
    __getOrgEventsBody = (orgId) => ({ org: orgId });
    __subscribeBody = (orgId) => ({ org: orgId });
    __unSubscribeBody = (orgId) => ({ org: orgId });
    __subscribersBody = (orgId) => ({ org: orgId });
    __subscribesBody = () => ({});
    __subscribersPagesBody = (orgId) => ({ org: orgId });

    getMeOrg = () => this.go(GET, this.__getMeOrgRoute, null, true);
    getMyEvents = (pageSize, pageNumber) => this.go(GET, this.__getMyEventsRoute(pageSize, pageNumber), null, true);
    signUp = (info, orgName, orgLink, logoLink) => this.go(POST, this.__signUpRoute, this.__signUpBody(info, orgName, orgLink, logoLink), true);
    deleteEvent = (id) => this.go(POST, this.__deleteEventRoute, this.__deleteEventBody(id), true);
    createEvent = (idAddress, name, info, price, link, tags, timestamp) => this.go(POST, this.__createEventRoute, this.__createEventBody(idAddress, name, info, price, link, tags, timestamp), true);
    editEvent = (eventId, idAddress, name, info, price, link, tags) => this.go(POST, this.__editEventRoute, this.__editEventBody(eventId, idAddress, name, info, price, link, tags), true);
    getOrg = (orgId) => this.go(POST, this.__getOrgRoute, this.__getOrgBody(orgId), false);
    searchOrg = (pageSize, pageNumber, word) => this.go(POST, this.__searchOrgRoute(pageSize, pageNumber), this.__searchOrgBody(word), false);
    getOrgEvents = (orgId) => this.go(POST, this.__getOrgEventsRoute, this.__getOrgEventsBody(orgId), false);
    subscribe = (orgId) => this.go(POST, this.__subscribeRoute, this.__subscribeBody(orgId), true);
    unSubscribe = (orgId) => this.go(POST, this.__unSubscribeRoute, this.__unSubscribeBody(orgId), true);
    subscribers = (orgId) => this.go(POST, this.__subscribersRoute, this.__subscribersBody(orgId), true);
    subscribes = (pageSize, pageNumber) => this.go(POST, this.__subscribesRoute(pageSize, pageNumber), this.__subscribesBody(), true);
    subscribersPages = (pageSize, pageNumber, orgId) => this.go(POST, this.__subscribersPagesRoute(pageSize, pageNumber), this.__subscribersPagesBody(orgId), true);
}

export const organizerApi = new OrganizerApi();