
import { get, ref } from "firebase/database";
import { db } from "../../firebase.config";


const DeactivatePollcontroller = async(pollCode)=>{

        const pollRef =  ref(db, `poll/${pollCode}`);
        const snapshot = await get(pollRef);


         if (!snapshot.exists()){
                console.log("No Poll found");
                
                return [];
        }


        const pollData = snapshot.val();

        console.log(pollData)

}


export default DeactivatePollcontroller