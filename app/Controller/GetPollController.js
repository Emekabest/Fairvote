import { db } from "@/firebase.config";
import { get, ref } from "firebase/database";


const GetPollController = async(matricNumber)=>{
  

  try {
  const votesRef = ref(db, "votes");
  const snapshot = await get(votesRef);

  if (snapshot.exists()) {
    const votesData = snapshot.val();
    let userPolls = [];

    // loop through polls
    for (const pollCode of Object.keys(votesData)) {
      const candidates = votesData[pollCode];

      // loop through candidates under this poll
      for (const candidateId of Object.keys(candidates)) {
        const candidateVotes = candidates[candidateId];

        // check if userId is here
        if (candidateVotes[matricNumber]){
          // fetch poll details from "polls"
          const pollSnap = await get(ref(db, `poll/${pollCode}`));
          if (pollSnap.exists()) {
            const pollData = pollSnap.val();

            userPolls.push({
              pollCode,
              pollName:pollData.pollName,
              pollCreator:pollData.pollCreator
            });
          }
        }
      }
    }


    return userPolls;
  }

  return [];
}catch (error) {
      console.error("Error fetching user voted polls:", error);
    return [];
  }

}



export default GetPollController;