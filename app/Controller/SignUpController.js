import { get, ref, set } from "firebase/database";
import { db } from "../../firebase.config";
import TextFieldService from "../Service/TextFieldService";



const SignUpController = async(username, matricNumber, password)=>{

    let signupFeedbackMessage = TextFieldService(["username", "matricNumber", "password"], {username, matricNumber, password})

    if (signupFeedbackMessage != "Successful"){

      return signupFeedbackMessage;

    }

  



  const userRef = ref(db, `users/${matricNumber}`);
  

      try {
            const snapshot = await get(userRef);

            if (snapshot.exists()) {

                return "Vin already exist"

            }

            await set(userRef, {
                username,
                password
              });

              
              return "Successful"

      } catch (error) {

        return error.code
      }






      // const URL = "https://r4f936axub.execute-api.us-east-1.amazonaws.com/dev/signup"



    
      //   const message = axios.post(URL, {username, matricNumber, password}).then(async(res)=>{

          
      //     return res.data

      //   })
      //   .catch((err)=>{
      //       console.log('Error: ' + err + " Error code::"+ err.code)
          
      //     return err.code
      //   })


        
        
      //   return signupFeedbackMessage = message;

}



export default SignUpController;