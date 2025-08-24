import { get, ref } from "firebase/database";
import { db } from "../../firebase.config";


const GetSinglePollsController = async(pollCode)=>{

    try{

          const pollSnap = await get(ref(db,`poll/${pollCode}`));

          if (pollSnap.exists()) {
            const pollData = pollSnap.val();

            return {status:true, msg:"Successful", data:pollData}
          }


    }
    catch(err){
        return {status:false, msg:"Error::"+err}

    }

}

export default GetSinglePollsController

