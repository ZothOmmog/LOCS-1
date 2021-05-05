import useSWR from 'swr'
import searchIcon from "./search.svg"
import "./SubmitSearch.css"

function SubmitSearch({onClick}) {
    
    return(
        <div className ='Main-Submit-Button-Wrap'>
            <button className='Submit-Button' onClick={onClick}><img src={searchIcon}/></button>
        </div>
    )
}

export default SubmitSearch