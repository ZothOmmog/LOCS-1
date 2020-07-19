export const normalizeEvents = eventsFromServer => eventsFromServer ? eventsFromServer.map(event => ({
    id: event.searchevent.id,
    name: event.searchevent.name,
    info: event.searchevent.info,
    type: `${event.tags.reduce((acc, tag) => acc + ' ' + tag)}`,
})): null;
