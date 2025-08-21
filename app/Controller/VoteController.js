// firebase-hooks.ts (or wherever you keep Firebase helper functions)
import { get, ref, runTransaction } from "firebase/database";
import { db } from "../../firebase.config";


const VoteController = async({pollId, candidateId, userId})=>{


  try {
        
        // Check if user already voted in this poll
        const pollVotesRef = ref(db, `votes/${pollId}`);
        const snapshot = await get(pollVotesRef);
        const pollVotes = snapshot.val() || {};

        // Flatten all users who voted
        const allVoters = Object.values(pollVotes).flatMap(candidate =>
          candidate ? Object.keys(candidate) : []
        );

        if (allVoters.includes(userId)) {
          console.log("User has already voted in this poll!");
          return false;
        }


         // Record user's vote
        const candidateRef = ref(db, `votes/${pollId}/${candidateId}/${userId}`);
        await runTransaction(candidateRef, () => true);

        console.log("Vote cast successfully!");



  } catch (error) {
    console.error("Error casting vote:", error);

    throw error;


  }






    // console.log(data.candidateId)


    // try{
    //     const URL = "https://r4f936axub.execute-api.us-east-1.amazonaws.com/dev/vote"
    //     const response = await axios.post(URL, data);

    //     return response.data;

    // }
    // catch(err){
    //     return err.code;
    // }



}


export default VoteController;