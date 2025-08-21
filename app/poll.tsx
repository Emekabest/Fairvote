import { FontAwesome } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import "../global.css";
import { globalNavBarStatus as setGlobalNavBar } from "./navbar";
import useSharedStore from "./Repository/store";
import AppDetails from "./Service/AppDetails";



const Pool = ()=>{

  const navBarStore = useSharedStore((state) => state.navBar);
  const setNavBarStore = useSharedStore((state) => state.setNavBar); 



    useFocusEffect(
        useCallback(() => {

            setGlobalNavBar(true)

            navBarStore.setActiveButton("poll")
            setNavBarStore({...navBarStore})

    }, []))







return(

        <View className="h-[100%] justify-center"  style={{backgroundColor:AppDetails.color.backgroundColor}}>
                <View className=" w-[100%] flex-row justify-around ">
                    <TouchableOpacity className="h-32 w-[40%] items-center justify-center rounded-xl" style={{borderWidth:1, borderColor:"#C9C9C9"}} onPress={()=> router.push("/createpool")}>
                        <FontAwesome name="plus-circle" size={30} color={"#C4A484"}/>
                        <Text className="text-lg font-nunito color-[#333]">Create Pool</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> router.push("/searchvote")} className="h-32 w-[40%] items-center justify-center rounded-xl" style={{borderWidth:1, borderColor:"#C9C9C9"}}>
                        <FontAwesome name="check" size={30} color={"#C4A484"}/>
                        <Text className="text-xl font-nunito color-[#333]">Vote</Text>
                    </TouchableOpacity>

                </View>

        </View>
    )


}



export default Pool;