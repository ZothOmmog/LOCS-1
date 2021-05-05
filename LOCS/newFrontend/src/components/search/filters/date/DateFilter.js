import closeIcon from "./close.svg"
import "./DateFilter.css"
function DateFilter ({ title, value, onChange, minDate }){

    const _onChange = (e) => {
        onChange(e.target.value)
    }
    const flush = () =>{
        onChange('');
    }
    return (
        <div className="Date-input-wrap">
            <label>{title}</label>
            <input type="date" value={value || ""} onChange={_onChange} min={minDate || ''}/>
            <button className='Clear-Button'>
                <img src={closeIcon} onClick={flush}/>
            </button>
        </div>
    )
}

export default DateFilter