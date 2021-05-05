import { makeAutoObservable, runInAction } from "mobx"

class mainStore {

    
    data = [];
    page = 1;
    eventsInList=1;
    statusLoadMore = "start"


    constructor(){
        makeAutoObservable(this)    
    }
    async getData(flag){
        {flag ? this.page++:this.page=1}
        this.statusLoadMore='pending'
        const data = await this.makeRequest()
        runInAction(() => {
            // console.log(data.slice())

            if(flag){
                // if(data.length>0)
                this.data= this.data.concat(data); 
            }else
                this.data = data

            this.statusLoadMore='loaded'
            if(data.length<this.eventsInList)
                this.statusLoadMore='end'
        })
    }

    

    async makeRequest(){
        const response = await fetch('/event/list/'+this.eventsInList+'/'+this.page+'', {
            method:"GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return await response.json();
    }
}

export default mainStore