import { equalTo, get, orderByChild, query, ref } from "firebase/database";
import { db } from "../../firebase.config";


const GetCreatorPolls = async(matricNumber)=>{

    try {
        const pollsRef = ref(db, "poll");
        const pollsQuery = query(pollsRef, orderByChild("pollCreator"), equalTo(matricNumber.trim()));

        const snapshot = await get(pollsQuery);

    if (snapshot.exists()) {
      const pollsData = snapshot.val();

      // Only return pollId and pollName
      const pollsArray = Object.entries(pollsData).map(([pollId, pollDetails]) => ({
        pollCode:pollId,
        pollName: pollDetails.pollName,
        pollCreator: pollDetails.pollCreator
      }));

      return pollsArray;
    } else {
      return [];
    }
    } catch (error) {
        console.log("An Error Occured::"+error)

        return []
    }

}



export default GetCreatorPolls;


