import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, Text, TextInput, TouchableOpacity, View } from "react-native";
import SearchPollController from "./Controller/SearchPollController";
import Header from "./header";
import Loader from "./loader";
import { globalNavBarStatus as setGlobalNavBar } from "./navbar";
import useSharedStore from "./Repository/store";
import AppDetails from "./Service/AppDetails";


const SearchVote = ()=>{
    const { height } = Dimensions.get("window");

    const loaderStore = useSharedStore((state) => state.value);
    const setLoaderStore = useSharedStore((state) => state.setValue);

    const [isLoader, setIsLoader] = useState(false)

    const [pollCode, setPollCode] = useState("");
    const [formFeedback, setFormFeedBack] = useState("")

    

    useFocusEffect(
        useCallback(() => {

            setGlobalNavBar(false)

    }, []))





    const handleSearchPoll = async()=>{

        if (pollCode.trim() === ""){

            setFormFeedBack("Please enter a code");

            return;
        }

        loaderStore.setLoaderStatus(true)
        setIsLoader(true)



        const response = await SearchPollController(pollCode.trim())
        if (response.success === false){
            console.log("An error occured")
            console.log(response.message)


            loaderStore.setFeedBackMode(true)
            loaderStore.setFeedBackMessage(response.message)
            setLoaderStore({...loaderStore})

            return;
        }
        else if (response.success === true){
                
                setFormFeedBack("Successful")
                loaderStore.setLoaderStatus(false)
                setLoaderStore({...loaderStore})   
                router.push({pathname:"/vote", params:{pollCode:pollCode.trim(), pollName:response.data.pollName}})
        }
    }
    

    useEffect(()=>{

            if (!loaderStore.getLoaderStatus()){
                setIsLoader(false)
    
            }
            else{
                setIsLoader(true)

            }
    
    },[loaderStore.getLoaderStatus()])
    


    
    return(
        <View className="h-[100%] bg-[#F5F5DC]" style={{backgroundColor:AppDetails.color.backgroundColor}}>
            
            <Header />

            {
                isLoader ?

                <Loader />

                :
                null
            }


            <View className="mt-20 px-4 items-center" >
                <TextInput placeholder="Enter the poll code" placeholderTextColor="gray" keyboardType="numeric" value = {pollCode} onChangeText={setPollCode} className="color-[#333] w-[100%] mt-4  rounded-3xl h-[30%] text-xl px-3"/>
                <Text className={formFeedback != "Successful" ? "text-red-800" : "text-green-600"}>{formFeedback}</Text>
               

                <TouchableOpacity className="rounded-full h-16 w-[80%] bg-[#C4A484] absolute bottom-3 justify-center items-center " onPress={handleSearchPoll}>
                        <Text className='font-nunito text-2xl'>Search</Text>
                </TouchableOpacity>
            </View>                   

        </View>
    )

}


export default SearchVote;