/** 
 * Нормальизация данных с эндпоинта "url/event/list/колличеcтво_данных/страница"
 */
export const normalizeEventsList = events => events.Events.map(event => ({
    id: event.eventshortlist.id,
    name: event.eventshortlist.name,
    info: event.eventshortlist.info,
    image: event.eventshortlist.image,
    tags: event.tags
}));
