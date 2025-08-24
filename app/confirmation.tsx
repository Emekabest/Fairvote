import React from "react"
import { TouchableOpacity, View } from "react-native"
import AppDetails from "./Service/AppDetails"


const Confirmation = ()=>{


    return (

        <View className="h-[100%] w-[100%] z-20 absolute top-0 items-center justify-center bg-[#fff]">
            <View className="h-60 p-3 w-[80%] rounded-xl ">

                <View className="h-[70%]">

                </View>

                <View className="h-[30%] flex-row justify-between">
                    <TouchableOpacity className="h-[100%] w-[45%] rounded-xl" activeOpacity={1} style={{backgroundColor:AppDetails.color.iconColors}}></TouchableOpacity>
                    <TouchableOpacity className="h-[100%] w-[45%] rounded-xl" activeOpacity={1}  style={{backgroundColor:AppDetails.color.iconColors}}></TouchableOpacity>
                </View>
            </View>
        </View>
    )


}

export default Confirmation