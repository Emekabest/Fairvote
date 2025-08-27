import { db } from "../../firebase.config";


const UpdatePollController = (pollData) => {
  let timeoutId;
  const VOTE_LIMIT = 50000000;

  const updateLoop = async () => {
    if (!pollData || !pollData.pollCode || !Array.isArray(pollData.candidates)){
      console.error('Invalid pollData provided to UpdatePollController. Halting updates.');
      return;
    }

    
    try {
     // Get the current state of the poll from Firebase
      const pollRef = db.ref(`/polls/${pollData.pollCode}`);
      const snapshot = await pollRef.once('value');
      const currentPoll = snapshot.val();


      if (!currentPoll || !currentPoll.candidates) {
        console.error(`Poll ${pollData.pollCode} not found in DB. Halting updates.`);
        return;
      }

      
      // Calculate the current total votes
      const totalVotes = Object.values(currentPoll.candidates).reduce(
        (sum, candidate) => sum + (candidate.voteCount || 0),
        0
      );

      // Check if the vote limit has been reached
      if (totalVotes >= VOTE_LIMIT) {
        console.log(`Total votes reached ${VOTE_LIMIT}. Stopping updates for poll ${pollData.pollCode}.`);
        return; // Stop the loop
      }

      // Increment each candidate's vote count by a random amount
      const updatePromises = pollData.candidates.map(async (candidate) => {
        if (candidate && candidate.id) {
          const currentVoteCount = currentPoll.candidates[candidate.id]?.voteCount || 0;
          // Generate a random vote *increment* between 1000 and 5000
          const randomIncrement = Math.floor(Math.random() * 4001) + 1000;
          const newVoteCount = currentVoteCount + randomIncrement;

          const candidateRef = db.ref(`/polls/${pollData.pollCode}/candidates/${candidate.id}`);
          await candidateRef.update({ voteCount: newVoteCount });
        }
      });


      await Promise.all(updatePromises);
    } catch (error) {
      console.error(`An error occurred during the update loop for poll ${pollData.pollCode}:`, error);
    }   

    const intervals = [3000, 4000, 4000]; // Makes 4 seconds twice as likely, as per "3, 4 or 4 seconds"
    const randomInterval = intervals[Math.floor(Math.random() * intervals.length)];

    timeoutId = setTimeout(updateLoop, randomInterval);
  };

  console.log('Starting poll update loop...');
  updateLoop();

  return () => {
    if (timeoutId) clearTimeout(timeoutId);
    console.log('Stopped poll update loop.');
  };
};

export default UpdatePollController;