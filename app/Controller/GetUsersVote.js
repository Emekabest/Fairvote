import { db } from "@/firebase.config"; // your initialized Firebase app
import { get, ref } from "firebase/database";

const GetUsersVote = async(pollId, userId)=>{

     try {
    const votesRef = ref(db, `votes/${pollId}`);
    const snapshot = await get(votesRef);

    if (!snapshot.exists()) return null;

    const votesData = snapshot.val();

    // Loop through candidates to see if userId exists
    for (let [candidateId, voters] of Object.entries(votesData)) {
      if (voters && voters[userId]) {
        return candidateId; // user voted for this candidate
      }
    }

    return null; // user hasn't voted yet
  } catch (error) {
    console.error("Error getting user vote:", error);
    return null;
  }


}

export default GetUsersVote