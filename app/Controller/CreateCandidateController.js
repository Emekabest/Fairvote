import { ref } from "firebase/database";
import { db } from "../../firebase.config";


const CreateCandidateController = async (pollCode, candidateList)=>{


      const candidatesRef = ref(db, `polls/${pollCode}/candidates`);


    const newCandidateList = candidateList.map(candidate => ({
        firstname: candidate.candidateFirstName,
        lastname: candidate.candidateLastName,
        pollCode
    }));






    // try{




    //      const url = "https://r4f936axub.execute-api.us-east-1.amazonaws.com/dev/createcandidate"

    //      const response = await axios.post(url, {candidates:newCandidateList});

    //      return response.data;

    // }
    // catch(err){

    //     return err.code;
    // }

  
}


export default CreateCandidateController;