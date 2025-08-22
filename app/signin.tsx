import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Keyboard, Text, TextInput, TouchableOpacity, View } from "react-native";
import SignInController from './Controller/SignInController';
import Header from "./header";
import Loader from "./loader";
import { globalNavBarStatus as setGlobalNavBar } from "./navbar";
import useSharedStore from "./Repository/store";
import ActivateFonts from "./Service/ActivateFont";
import AppDetails from "./Service/AppDetails";



const SignIn = ()=>{
    const [fontsLoaded] = useFonts(ActivateFonts);
    const router = useRouter();

    const loaderStore = useSharedStore((state) => state.value);
    const setLoaderStore = useSharedStore((state) => state.setValue); // ✅ directly call the hook


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
    
        
    
        useEffect(()=>{
             Keyboard.addListener("keyboardDidHide", () => {
             setIsInputFocus(false);
    
            });
    
        })


        
    const [isLoader, setIsLoader] = useState(false);    

    const [isInputFocus, setIsInputFocus] = useState(false);
    const [username, setUsername] = useState('');
    const [matricNumber, setMatricNumber] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [formFeedback, setFormFeedbackMessage] = useState("");

    

    const handleSignIn = async ()=>{
      loaderStore.setLoaderStatus(true)
      setIsLoader(true)

      const message =  await SignInController(matricNumber, password);

      setFormFeedbackMessage(message);


      if (message == "Successful"){

        

          setLoaderStore({...loaderStore})  
            
        await AsyncStorage.setItem("hasLaunched", "true")
        await AsyncStorage.setItem("matric-number", matricNumber.trim());

        // const navigation = useNavigation();
        // navigation.dispatch(
        //     StackActions.replace("home") 
        //  );     

         router.dismissAll();
         router.replace("/home")
          loaderStore.setLoaderStatus(false)
 }else if (message === "ERR_BAD_RESPONSE"){

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
            <View className="h-[100%] items-center" style={{justifyContent: isInputFocus == true ? "flex-start" : "center", backgroundColor:AppDetails.color.backgroundColor }}>


                {
                    isLoader || !fontsLoaded ? 

                    <Loader />

                    :

                    ""

                }
                
                    <Header />
                  <Text className="color-[#333] text-4xl font-nunito-bold">Login</Text>

                  <View className="h-[50%] w-[90%] rounded-3xl flex justify-center items-center">
                    <View className=" w-[90%] h-24">
                        <TextInput  placeholder="Matric No" placeholderTextColor="gray" keyboardType="numeric" value={matricNumber}  onChangeText={setMatricNumber}  className="color-[#333] w-[100%]  rounded-3xl h-[70%] text-xl px-3"/>
                    </View>
                    <View className=" w-[90%] h-24">
                        <TextInput placeholder="Password" placeholderTextColor="gray" secureTextEntry={!passwordVisible} value={password} onChangeText={setPassword} className="color-[#333] w-[100%]  rounded-3xl h-[70%] text-xl px-3"/>
                    </View>
                    
                    <View className="items-center">
                        <Text className={formFeedback != "Successful" ? "text-red-800" : "text-green-600"}>{formFeedback}</Text>
                        <Text>New member?</Text>
                        <TouchableOpacity onPress={()=> router.push("/signup")}>
                            <Text className="color-black font-bold">Sign up</Text>
                        </TouchableOpacity>
                    </View>
                  </View>

            
                <TouchableOpacity className="rounded-full h-20 w-[95%] bg-[#C4A484] absolute bottom-3 justify-center items-center " onPress={handleSignIn}>
                        <Text className='font-nunito text-2xl'>SignIn</Text>
                </TouchableOpacity>

            </View>
    )
    

    

}




export default SignIn