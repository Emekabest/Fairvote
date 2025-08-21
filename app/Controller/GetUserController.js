import { get, ref } from "firebase/database";
import { db } from "../../firebase.config";


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