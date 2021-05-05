
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
                    <p>Где-то &bull; {date.getDate()}.{((date.getMonth()+1)< 10? "0"+(date.getMonth()+1) : (date.getMonth()+1))}.{date.getFullYear()} {((date.getHours()+1)< 10? "0"+(date.getHours()+1) : date.getHours())}:{((date.getMinutes())< 10? "0"+(date.getMinutes()) : (date.getMinutes()))}</p>
                </div>
            </a>
        </div>
    )
    
}

export default EventItem