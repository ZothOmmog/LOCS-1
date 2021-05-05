import "./SearchInput.css"

function SearchInput({value,onChange}){
    const _onChange = (e) => {
        onChange(e.target.value)
    }
    return(
            <input className="Search-Input" type="text"  value={value || ""} placeholder="Введите запрос..." onChange={_onChange}/>
    );
}

export default SearchInput
