

const ConfirmationService = {

    status:false,

    yesButtonFunction:null,


    setStatus(isStatus){

        this.status = isStatus;
    },
    
    
    getStatus(){

        return this.status;
    },


    setYesButtonFunction(isYesButtonFunction){

        this.yesButtonFunction = isYesButtonFunction
    },

    getYesButtonFunction(){

        return this.yesButtonFunction
    }
}



export default ConfirmationService