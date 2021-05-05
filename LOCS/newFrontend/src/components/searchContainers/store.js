import { makeAutoObservable, runInAction } from "mobx"

class SearchStore {

    tags = []
    search = ""
    dateTo = ""
    dateFrom = ""
    data = [];
    page = 1;
    eventsInList=1;
    statusLoadMore = "start"


    constructor(){
        makeAutoObservable(this)    
    }

    setDateFrom (date){
        this.dateFrom = date
        if(Date.parse(this.dateFrom)> Date.parse(this.dateTo))
            this.dateTo = date
    }

    setDateTo (date){
        this.dateTo = date
    }

    flushTags(){
        this.tags=[];
    }
    
    addTempTag (newTag){
        if(this.tags.some(tagItem => tagItem.id !== newTag.id) || this.tags.length===0 ){
            let newTempTags = this.tags.slice()
            newTempTags.push(newTag)
            this.tags = newTempTags;
            console.log(this.tags)
        }
    }
    removeTag(removableTag){
        if(this.tags.some(tagItem => tagItem.id === removableTag.id) && this.tags.length!==0 ){
            this.tags = this.tags.filter(tagItem=> tagItem.id !== removableTag.id)
        }
        if(this.tags.length===0)
            this.tags=[];
    }

    setSearch (search){
        this.search = search
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
        const response = await fetch('/event/search/'+this.eventsInList+'/'+this.page+'/', {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                word:(this.search===""? null:this.search),
                tags:(this.tags.length === 0?null: this.tags),
                dateFrom:(this.dateFrom===""? null:this.dateFrom),
                dateTo:(this.dateTo===""? null:this.dateTo)
            })
        })
        return await response.json();
    }
}

export default SearchStore