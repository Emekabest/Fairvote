import { db } from "@/firebase.config";
import { get, ref } from "firebase/database";


const GetCandidateController = async (pollCode)=>{

    try {
          const candidatesRef =  ref(db, `poll/${pollCode}`);


          const snapshot = await get(candidatesRef);

            if (!snapshot.exists()) {
                console.log("No candidates found for this poll");
                return [];
            }   

            const pollData = snapshot.val();

            const candidatesArray = pollData.candidates
                ? Object.entries(pollData.candidates).map(([id, candidate]) => ({
                    id,
                    ...candidate
                    }))
                : [];


             return {
                    pollCode,
                    pollName: pollData.pollName,
                    candidates: candidatesArray
            };
        } catch (error) {
             console.error("Error fetching candidates:", error);
              return [];
        }

}

export default GetCandidateController;