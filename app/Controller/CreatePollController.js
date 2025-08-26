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
        lastname: candidate.candidateLastName,
        image: candidate.candidateImage || null,
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
    

}



export default CreatePollController;