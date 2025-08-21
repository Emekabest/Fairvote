import AsyncStorage from "@react-native-async-storage/async-storage"
import GetPollController from "./GetPollController"
import GetUserController from "./GetUserController"


const HomeController = async ()=>{


    try{
        const matricNumber = await AsyncStorage.getItem("matric-number")

        const user = await GetUserController(matricNumber)
        const polls = await GetPollController(matricNumber)
        return {
            user,
            polls
        }

    }
    catch(err){

        return err.code
    }




    // try{
    //     const matricNumber = Number(await AsyncStorage.getItem("matric-number"))
    //     const URL = `https://r4f936axub.execute-api.us-east-1.amazonaws.com/dev/home?id=${matricNumber}`;

    //     const response = (await axios.get(URL));

        
    //     return response.data;
    // }
    // catch(err){
    //       console.log("Error message:", err.message);

    //       return err.code;
    // }


}


export default HomeController;