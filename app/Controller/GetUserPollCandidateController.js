import axios from "axios";


const GetUserPollCandidateController = async(userId, pollCode)=>{

    try{
        
        const URL = `https://r4f936axub.execute-api.us-east-1.amazonaws.com/dev/getuserpollcandidate?userid=${userId}&pollcode=${pollCode}`
        const response = (await axios.get(URL))

        return response;

    }
    catch(err){

        return err.code;

    }




}

export default GetUserPollCandidateController;