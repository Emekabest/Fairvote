import { get, ref } from "firebase/database";
import { db } from "../../firebase.config";

const SignInController = async(vin, password)=>{

    if (vin.trim() == "" || password.trim() == ""){
        
        return "Please fill all fields"
    }



      const userRef = ref(db, `users/${vin}`);


      try {
        const snapshot = await get(userRef);
        if (!snapshot.exists()) {


          return "Incorrect Vin or password";
        }



        const userData = snapshot.val();
        if (userData.password === password) {

          return "Successful";
        } else {
          

          return "Incorrect Vin or password";
        }
      } catch (error) {
        
        return error.code;
      }
    
    
    


}

export default SignInController;