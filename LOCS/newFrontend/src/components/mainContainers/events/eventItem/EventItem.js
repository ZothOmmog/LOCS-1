
import "./EventItem.css"
import defaultPic from "./mockimg.jpg"
function EventItem({item}) {
    const date = new Date(item.datatime);
    return(
        <div className ="Event-Item">
            <a href="#">
                <div className = "Event-item-image"><img src={item.image ? item.image : defaultPic}/></div>
                <div className = "Event-item-description">
                    <h4 className='Title-Item'>{item.name}</h4>
                    <p>{item.idAddress} &bull; {item.date.split('-').join('.')}</p>
                </div>
            </a>
        </div>
    )
    
}

export default EventItem