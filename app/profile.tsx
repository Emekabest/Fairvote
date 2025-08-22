import { router, useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { globalNavBarStatus as setGlobalNavBar } from "./navbar";
import useSharedStore from "./Repository/store";




const Profile = ()=>{

  const navBarStore = useSharedStore((state) => state.navBar);
    const setNavBarStore = useSharedStore((state) => state.setNavBar); 



    useFocusEffect(
        useCallback(() => {

            setGlobalNavBar(true)

            navBarStore.setActiveButton("profile")
            setNavBarStore({...navBarStore})

    }, []))


    return(
        <View className="h-[100%] bg-[#fff]">
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

            
        </View>
    )

}


export default Profile