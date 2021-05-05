import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite";
import {BsTrash , BsTrashFill} from 'react-icons/bs';
import "./TagsFilter.css";

function TagsFilter ({searchStore}){
  
    
    const [ value, setValue ] = useState('')
    const [ tempTags, setTempTags] = useState([]);
	const [ lastValue, setLastValue ] = useState('')

    const _onChange = (e) => {
		setValue(e.target.value)
	}

    useEffect(() => {
		if(value.length > 1 && lastValue !== null){
			if(value === lastValue) return 
			setLastValue(null)
			fetch('/event/searchTag', {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    word:(value===""? null:value),
                })
            }).then((res) => { 
                return res.json()
            }).then((res) => {
                setTimeout(() => setLastValue(value), 500)
                setTempTags(res);
            })
            
		}
	}, [value, lastValue])


    
    return (
        <div className="Filter-container">
            <button className="Tags-Flush" onClick={()=>searchStore.flushTags()}>Сбросить все {<BsTrashFill className="Filter-icon"/>}</button>
            <input className='Filter-Tag-search' placeholder="Введите тематику..." onChange={_onChange} value={value || ''}/>
            { tempTags && tempTags.length!==0 ?
                <ul className="Filter-tag-suggest">
                    {tempTags && tempTags.map(tagTempItem => (
                        (searchStore.tags.some(x => x.id === tagTempItem.id) ? null:
                        <li className="suggest-item"
                            key={tagTempItem.id}
                            onClick={()=> searchStore.addTempTag(tagTempItem)}
                            >
                            {tagTempItem.title}
                        </li>)))
                    }                    
                </ul>:null
            }

            {searchStore.tags && searchStore.tags.length!==0?
                <ul>
                    {
                        searchStore.tags && searchStore.tags.map( tagItem =>(
                            <li className=""
                                key={tagItem.id}
                                onClick={()=>searchStore.removeTag(tagItem)}
                                >
                                {tagItem.title}
                                <BsTrash className="Filter-icon"/>
                                </li>
                        ))
                    }
                </ul>:null
            }
            
        </div>
    );
}
export default observer(TagsFilter)