import EventItem from "../eventItem/EventItem"
import "./EventContainer.css"
function EventContainer({items}) {
    return(
        <div className="Content-Items-Container">
            { items && items.map(item => (
                   <EventItem
                        key={item.id}
                        item={item}
                   /> 
            ))}
        </div>
    );
}

export default EventContainer