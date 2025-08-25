


const LoaderService = {

    loaderStatus:false,
    feedbackMode:false,
    feedbackMessage:"",
    returnBackPage:"",
       

    setLoaderStatus(isloader){
        this.loaderStatus = isloader;

    },

    
    getLoaderStatus(){
        return this.loaderStatus;

    },


    setFeedBackMode(isFeedBackMode){
        this.feedbackMode = isFeedBackMode;

    },

    getFeedBackMode(){
        return this.feedbackMode;
        
    },


    setFeedBackMessage(isFeedBackMessage){
        this.feedbackMessage = isFeedBackMessage;
    },

    getFeedBackMessage(){
        return this.feedbackMessage;
    },
    

    setReturnBackPage(returnBackPage){
        this.returnBackPage = returnBackPage
    },

    getReturnBackPage(){

        return this.returnBackPage
    }

}




export default LoaderService;

