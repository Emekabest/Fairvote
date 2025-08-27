import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Image, Keyboard, Text, TextInput, TouchableOpacity, View } from "react-native";
import SignInController from './Controller/SignInController';
import Header from "./header";
import Loader from "./loader";
import { globalNavBarStatus as setGlobalNavBar } from "./navbar";
import useSharedStore from "./Repository/store";
import ActivateFonts from "./Service/ActivateFont";
import AppDetails from "./Service/AppDetails";


interface SignInScreenProp{
    navigation:any
    route:any
}



const SignIn:React.FC<SignInScreenProp> =  ({navigation})=>{
    const [fontsLoaded] = useFonts(ActivateFonts);

    const router = useRouter();


    const loaderStore = useSharedStore((state) => state.value);
    const setLoaderStore = useSharedStore((state) => state.setValue); // ✅ directly call the hook


    const [isLoader, setIsLoader] = useState(false)



    const [isInputFocus, setIsInputFocus] = useState(false);
    const [matricNumber, setMatricNumber] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [formFeedback, setFormFeedbackMessage] = useState("");



        useFocusEffect(
        useCallback(() => {

            setGlobalNavBar(false)

        }, [])

    );



    useEffect(()=>{
     Keyboard.addListener("keyboardDidShow", () => {
         setIsInputFocus(true);
    });
    })



    const handlekeyhide =  useEffect(()=>{
         Keyboard.addListener("keyboardDidHide", () => {
         setIsInputFocus(false);

    });

    })



    
    const handleSignIn = async ()=>{

      loaderStore.setLoaderStatus(true)
      setIsLoader(true)
        
      const message =  await SignInController(matricNumber, password)

      setFormFeedbackMessage(message)


      if (message === "Successful"){

            loaderStore.setLoaderStatus(false)
            setLoaderStore({...loaderStore})   


           await AsyncStorage.setItem("hasLaunched", "true")
           await AsyncStorage.setItem("matric-number", matricNumber.trim());
        
         router.push("/home")
         router.dismissAll()   
    }
      else if (message === "ERR_BAD_RESPONSE"){
            console.log("Server Error")

            loaderStore.setFeedBackMode(true)
        
            return;
        }


        loaderStore.setLoaderStatus(false)
        setLoaderStore({...loaderStore})
    }



    useEffect(()=>{

        if (!loaderStore.getLoaderStatus()){
            setIsLoader(false)

        }

    },[loaderStore.getLoaderStatus()])


    


    return(
            <View className="h-[100%]">
                
                {
                    isLoader || !fontsLoaded ? 

                    <Loader />

                    :

                    <View className="h-[100%] bg-[#F5F5DC] items-center" style={{justifyContent: isInputFocus == true ? "flex-start" : "center", backgroundColor:AppDetails.color.backgroundColor }}>

                    <Header />
                    <Image source={require("../assets/images/icon.png")} className="w-24 h-24" />
                    <Text className="font-nunito-bold text-xl text-[#141414] mt-2 mb-5">INEC</Text>
                   <Text className="text-[#333] text-4xl font-nunito-bold">Login</Text>

                  <View className="h-[50%] w-[90%] rounded-3xl flex justify-center items-center">
                    <View className=" w-[90%] h-24">
                        <TextInput  placeholder="Matric Number" placeholderTextColor="gray" keyboardType="default" value={matricNumber}  onChangeText={setMatricNumber}  className="bg-white border border-gray-300 text-[#333] w-[100%]  rounded-3xl h-[70%] text-xl px-3"/>
                     </View>
                    <View className=" w-[90%] h-24">
                        <TextInput placeholder="Password" placeholderTextColor="gray" secureTextEntry={!passwordVisible} value={password} onChangeText={setPassword} className="bg-white border border-gray-300 text-[#333] w-[100%]  rounded-3xl h-[70%] text-xl px-3"/>
                    </View>
                    
                    <View className="items-center">
                        <Text className={formFeedback != "Successful" ? "text-red-800" : "text-green-600"}>{formFeedback}</Text>
                        <Text>Don't have an account?</Text>
                        <TouchableOpacity onPress={()=> router.push("/signup")}>
                            <Text className="text-black font-bold">Sign up</Text>
                        </TouchableOpacity>
                    </View>
                  </View>

            
                <TouchableOpacity className="rounded-full h-20 w-[95%] bg-[#C4A484] absolute bottom-3 justify-center items-center " onPress={handleSignIn}>
                        <Text className='font-nunito text-2xl'>Login</Text>
                </TouchableOpacity>
                    </View>
                }





            </View>
    )
}


export default SignIn