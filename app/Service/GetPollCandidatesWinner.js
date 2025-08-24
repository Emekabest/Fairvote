


const GetPollCandidatesWinner = (candidates, voteCount) => {
  let highestVote = 0;
  let winners = [];

  candidates.forEach((candidate) => {

    const candidateVoteCount = Number(voteCount[candidate.id]) || 0;

    if (candidateVoteCount > highestVote) {
      // New leader found → reset winners array
      highestVote = candidateVoteCount;
      winners = [candidate];
    } else if (candidateVoteCount === highestVote) {
      // Tie → add candidate to winners array
      winners.push(candidate);
    }
  });

  return { highestVote, winners };
};

export default GetPollCandidatesWinner