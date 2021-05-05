import { observer, useLocalObservable } from "mobx-react-lite"
import EventContainer from "./events/eventContainer/EventContainer";


import './MainContainers.css';
import MainStore from "./store";
import { toJS } from "mobx";
import { useState, useEffect } from "react";



function MainContainers(){

    const mainStore = useLocalObservable(() => new MainStore())
    const [ searchState, setSearchState ] = useState(null)
    const [page, setPage] = useState(1);
   
    const data = mainStore.data
    const getDataFunc = () =>{
        setSearchState(toJS(mainStore))
        mainStore.getData(false)
    }

    const getDataFuncAdditional = () =>{
        mainStore.getData(true)
    }

    useEffect(()=>{
        getDataFunc();
    },[])
  
    return(
    <main className = "Main">
        <div className = "Main-content">
            <div className= "Main-content-result">
                <EventContainer items={data}/>
            </div>
            {mainStore.statusLoadMore=='loaded'?
                       
                <div className='load-button-wrap'>
                    <button 
                        className="load-button"
                        onClick={getDataFuncAdditional}
                        >Загрузить больше</button>
                </div>
                :
                null
            }
        </div>
    </main>
    );
}

export default observer(MainContainers);