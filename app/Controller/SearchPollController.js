import { get, ref } from "firebase/database";
import { db } from "../../firebase.config";



const SearchPollController = async(pollCode)=>{

      try {
       const pollRef = ref(db, `poll/${pollCode}`);

       const snapshot = await get(pollRef);


    if (snapshot.exists()) {
      let pollData = snapshot.val()
        


      // ✅ Return the poll data
      return { success: true, data: pollData };
    } else {

        
      return { success: false, message: "Poll not found. Please check the poll code." };
    }
  } catch (error) {
    console.error("Error searching poll:", error);
    return { success: false, message: "Something went wrong while searching. Try again." };
  }




}

export default SearchPollController;