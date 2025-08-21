

const HomeService = {

    isChanges:true,

    userDetails:{},

    userPoll:[],

    setIsChanges(status){
        this.isChanges = status
    },

    getIsChanges(){

        return this.isChanges
    },

    setUserDetails(isUserDetails){
        this.userDetails = isUserDetails

    },

    getUserDetails(){
        return this.userDetails

    },

    setUserPolls(isuserPoll){
        this.userPoll = isuserPoll

    },

    getUserPolls(){
        return this.userPoll
    }
    
}


export default HomeService