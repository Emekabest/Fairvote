import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Confirmation from "./confirmation";
import { globalNavBarStatus as setGlobalNavBar } from "./navbar";
import useSharedStore from "./Repository/store";




const Profile = ()=>{

  const navBarStore = useSharedStore((state) => state.navBar);
    const setNavBarStore = useSharedStore((state) => state.setNavBar); 

     const confirmation_store = useSharedStore((state)=> state.confirmation)
    const setConfirmation_store = useSharedStore((state)=> state.setConfirmation)

    const [isConfirmation, setIsConfirmation] = useState(false)
    



    useFocusEffect(
        useCallback(() => {

            setGlobalNavBar(true)

            navBarStore.setActiveButton("profile")
            setNavBarStore({...navBarStore})

    }, []))



    const handleLogOut =()=>{
        setIsConfirmation(true)
        confirmation_store.setStatus(true)
        
        confirmation_store.setYesButtonFunction(async()=>{

             await AsyncStorage.removeItem("matric-number")

            router.dismissAll();
            router.replace("/signin")

        })

        setConfirmation_store({...confirmation_store})
    }

        useEffect(()=>{
    
            if (!confirmation_store.getStatus()){
                setIsConfirmation(false)
                // setGlobalNavBar(true)

    
            }else{
                    // setGlobalNavBar(false)

            }

            
    
        },[confirmation_store.getStatus()])


    return(
        <View className="h-[100%] bg-[#fff]">

             {

                isConfirmation ?

                     <Confirmation />

                :
                    ""

            }

            <View className="h-52 bg-[#C4A484]">
                
            </View>

            <TouchableOpacity className="h-20 px-4 mt-4 justify-center">
                <Text className="font-nunito-bold text-xl color-[#333]">My Profile</Text>

            </TouchableOpacity>


            <TouchableOpacity className="h-20 px-4 mt-4 justify-center" onPress={()=> router.push("/mypoll")}>
                <Text className="font-nunito-bold text-xl color-[#333]">My Polls</Text>

            </TouchableOpacity>

            <TouchableOpacity className="h-20 px-4 mt-4 justify-center">
                <Text className="font-nunito-bold text-xl color-[#333]">About</Text>

            </TouchableOpacity>


            <TouchableOpacity className="h-20 px-4 mt-4 justify-center">
                <Text className="font-nunito-bold text-xl color-[#333]">Terms and Conditions</Text>

            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} className="h-20 px-4 mt-4 justify-center" onPress={handleLogOut}>
                <Text className="font-nunito-bold text-xl color-[#333]">Log out</Text>

            </TouchableOpacity>

            
        </View>
    )

}


export default Profile