import { observer, useLocalObservable } from "mobx-react-lite"
import DateFilter from "../search/filters/date/DateFilter";
import TagsFilter from "../search/filters/tags/TagsFilter";
import SearchInput from "../search/searchInput/SearchInput";
import SubmitSearch from "../search/submit/SubmitSearch";
import EventContainer from "../events/eventContainer/EventContainer";

import useSWR from 'swr'

import './SearchContainers.css';
import SearchStore from "./store";
import { toJS } from "mobx";
import { useState } from "react";



function SearchContainers(){

    const searchStore = useLocalObservable(() => new SearchStore())
    const [ searchState, setSearchState ] = useState(null)
    const [page, setPage] = useState(1);
   
    const data = searchStore.data
    const submitSearchFunc = () =>{
        setSearchState(toJS(searchStore))
        searchStore.getData(false)
    }

    const submitSearchFuncAdditional = () =>{
        searchStore.getData(true)
    }

  
    return(
    <main className = "Search">
        <div className = "Search-left-sidebar">
            <div className="Filter-container">
                <DateFilter 
                        title="От:"
                        value={searchStore.dateFrom} 
                        onChange={(num) => searchStore.setDateFrom(num)}
                    />
                <DateFilter 
                        title="До:"
                        value={searchStore.dateTo} 
                        onChange={(num) => searchStore.setDateTo(num)}
                        minDate={searchStore.dateFrom}
                    />
            </div>
            <TagsFilter searchStore={searchStore}/>
        </div> 
        <div className = "Search-content">
            <div className= "Search-content-search">
                <div className="Search-content-search-container">
                    <SearchInput
                        value={searchStore.search}
                        onChange={(search) => searchStore.setSearch(search)}
                    />
                    <SubmitSearch onClick={submitSearchFunc}/>
                </div>
            </div>
            <div className= "Search-content-result">
                <EventContainer items={data}/>
            </div>
            {searchStore.statusLoadMore=='loaded'?
                       
                <div className='load-button-wrap'>
                    <button 
                        className="load-button"
                        onClick={submitSearchFuncAdditional}
                        >Загрузить больше</button>
                </div>
                :
                null
            }
        </div>
    </main>
    );
}

export default observer(SearchContainers);