import { get, ref } from "firebase/database";
import { db } from "../../firebase.config";

const SignInController = async(matricNumber, password)=>{

    if (matricNumber.trim() == "" || password.trim() == ""){
        
        return "Please fill all fields"
    }



      const userRef = ref(db, `users/${matricNumber}`);


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