import { useFonts } from 'expo-font';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import "../global.css";
import Loader from './loader';
import { globalNavBarStatus as setGlobalNavBar } from "./navbar";
import ActivateFonts from "./Service/ActivateFont";
import AppDetails from './Service/AppDetails';


interface GetStartedProp{
    navigation:any
    route:any
}


const GetStarted:React.FC<GetStartedProp> =  ({navigation})=>{

    useFocusEffect(
        useCallback(() => {

            setGlobalNavBar(false)

  }, []));


   const router = useRouter();
  
      const [fontsLoaded] = useFonts(ActivateFonts);
      
        

return (

    

    <View className="h-[100%] flex justify-center items-center"  style={{backgroundColor:AppDetails.color.backgroundColor}}>

      {
        !fontsLoaded ?

        <Loader />

        :

        ""
      }


      <View className="h-[30%] w-[100%] flex justify-center items-center">
        <Text className="font-nunito-bold text-6xl color-[#333]">Welcome</Text>
        <Text className='text-lg'>Lets execute your power to elect!</Text>
      </View>


      <TouchableOpacity className="rounded-full h-20 w-[95%] bg-[#C4A484] absolute bottom-3 justify-center items-center " onPress={()=> router.push('./signup')}>
        <Text className='font-nunito text-3xl color-[#333]'>Get Started</Text>
      </TouchableOpacity>
    </View>
  );

}


export default GetStarted;