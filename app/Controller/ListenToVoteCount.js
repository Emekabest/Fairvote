import { db } from "@/firebase.config"; // your initialized Firebase app
import { onValue, ref } from "firebase/database";


const ListenToVoteCount = (pollId, callback, candidates)=>{
    
  const pollRef = ref(db, `votes/${pollId}`);

  // Listen for real-time updates
  onValue(pollRef, (voteSnap) => {
    if (!voteSnap.exists()) {
      callback({});
      return;
    }

    const votesData = voteSnap.val();
    const counts = {};


    // Count number of users under each candidate
    candidates.forEach((candidate) => {
      const voters = votesData[candidate.id] || {}; // fallback if no votes
      counts[candidate.id] = Object.keys(voters).length;
    });

    callback(counts);
  });


}


export default ListenToVoteCount;