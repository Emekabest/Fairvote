import { push, ref, set } from "firebase/database";
import { db } from "../../firebase.config";


const CreatePollController = async ({pollname, code, creator, candidateList})=>{

   // Build candidates object with unique keys
    const candidatesObj = {};
    candidateList.forEach(candidate => {
    const key = push(ref(db)).key; // generate unique key
    if (key) {
      candidatesObj[key] = {
        firstname: candidate.candidateFirstName,
        lastname: candidate.candidateLastName
      };
    }
    });




      const pollRef = ref(db, `poll/${code}`);

        try {
            await set(pollRef, {
            pollName: pollname,
            pollCreator: creator,
            candidates: candidatesObj,
            isActive:true
            });

            
        return "Successful"
        } catch (error) {
            
            return error.code
        }
      



    


    // try{
    //     const URL = "https://r4f936axub.execute-api.us-east-1.amazonaws.com/dev/createpoll"
    //     const response = await axios.post(URL, {name:pollname, code, creator});


    //     return response.data;

    // }
    // catch(err){
    //     return err.code;
    // }




}



export default CreatePollController;