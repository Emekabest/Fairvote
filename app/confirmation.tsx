import { useFonts } from "expo-font"
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import useSharedStore from "./Repository/store"
import ActivateFonts from "./Service/ActivateFont"
import AppDetails from "./Service/AppDetails"


const Confirmation = ()=>{

    const confirmation_store = useSharedStore((state)=> state.confirmation)
    const setConfirmation_store = useSharedStore((state)=> state.setConfirmation)


        const [fontsLoaded] = useFonts(ActivateFonts);


    const handleActionButton = (action:String)=>{


        if (action === "yes"){
            const executeYesFunction = confirmation_store.getYesButtonFunction();
            executeYesFunction()
            
        }
        else{


        }

        confirmation_store.setStatus(false)
        setConfirmation_store({...confirmation_store})
    }



    return (
        <View className="h-[100%] w-[100%] z-50 absolute top-0 items-center justify-center">
            {
                !fontsLoaded ?

                <View />

                :

                <View className="h-60 p-3 w-[80%] rounded-xl bg-[#fff]">

                <View className="h-[70%] items-center justify-center">
                        <Text className="text-xl font-nunito-bold color-[#333]">Do you confirm your actions?</Text>
                </View>
                <View className="h-[30%] flex-row justify-between">
                    <TouchableOpacity onPress={()=> handleActionButton("yes")} className="h-[100%] justify-center items-center w-[45%] rounded-xl" activeOpacity={1} style={{backgroundColor:AppDetails.color.iconColors}}>
                        <Text className="font-nunito-bold text-xl color-[#333]">Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> handleActionButton("no")} className="h-[100%] justify-center items-center w-[45%] rounded-xl" activeOpacity={1}  style={{backgroundColor:AppDetails.color.iconColors}}>
                        <Text className="font-nunito-bold text-xl color-[#333]">No</Text>
                    </TouchableOpacity>
                </View>
            </View>
                    


            }
            
        </View>
    )

}

export default Confirmation