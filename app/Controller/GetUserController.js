import { db } from "@/firebase.config";
import { get, ref } from "firebase/database";


const GetUserController = async(matricNumber)=>{

    const userRef = ref(db, `users/${matricNumber}`);

    try {
        const snapshot = await get(userRef);
        if (!snapshot.exists()) {


          return "Error";
        }


        return snapshot.val();
    } catch (error) {
        return "Null"
    }


}


export default GetUserController;