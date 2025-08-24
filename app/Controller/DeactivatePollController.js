
import { ref, update } from "firebase/database";
import { db } from "../../firebase.config";


const DeactivatePollcontroller = async(pollCode)=>{
                console.log(typeof(pollCode))

        try{

                const pollRef = ref(db, `poll/${pollCode}`);
                const snapshot = await update(pollRef, { isActive: false });        

                return {status:true , message:"Successful"}
        }
        catch(err){
                
                return {status:false , message:"An error occured::"+err}

        }


}


export default DeactivatePollcontroller