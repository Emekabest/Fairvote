import { get, ref } from "firebase/database";
import { db } from "../../firebase.config";

const SignInController = async(matricNumber, password)=>{

    if (matricNumber.trim() == "" || password.trim() == ""){

        console.log("Please fill all fields")
        
        return "Please fill all fields"
    }



      const userRef = ref(db, `users/${matricNumber}`);


      try {
        const snapshot = await get(userRef);
        if (!snapshot.exists()) {


          return "Incorrect matric number or password";
        }



        const userData = snapshot.val();
        if (userData.password === password) {

          return "Successful";
        } else {
          

          return "Incorrect matric number or password";
        }
      } catch (error) {
        
        return error.code;
      }
    
    
    


}

export default SignInController;