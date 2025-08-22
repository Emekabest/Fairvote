import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import GetCreatorPolls from "./Controller/GetCeatorPolls";
import Header from "./header";
import Loader from "./loader";
import { globalNavBarStatus as setGlobalNavBar } from "./navbar";
import useSharedStore from "./Repository/store";


const MyPoll = ()=>{
    
    const [creatorPolls, setCreatorPolls] = useState<any>([{"pollCode": "0", "creator": 0, "pollName": "null"}]);


        const [isLoader, setIsLoader] = useState(false);
        const loaderStore = useSharedStore((state) => state.value);
        const setLoaderStore = useSharedStore((state) => state.setValue);
    
        useFocusEffect(
            useCallback(() => {

                setGlobalNavBar(false)

        }, []))

    

    useEffect(()=>{
        const getCreatorPolls = async()=>{
            loaderStore.setLoaderStatus(true)
            setIsLoader(true)


            const matricNumber = await AsyncStorage.getItem("matric-number")

            const polls = await GetCreatorPolls(matricNumber)
            setCreatorPolls(polls)



            loaderStore.setLoaderStatus(false)
            setLoaderStore({...loaderStore})
        }

        getCreatorPolls()
    },[])


    useEffect(()=>{

        if (loaderStore.getLoaderStatus()){
            setIsLoader(true)
        }
        else{
            setIsLoader(false)
        }
        
    },[loaderStore.getLoaderStatus()])
                




    return (
        <View>

            {
                isLoader ?

                <Loader />

                :

                ""
            }
            <Header />


             <View className="h-[100%] pt-20">
                

                    <FlatList style= {{maxHeight:"100%", marginBottom:112}}
                            data={creatorPolls}
                            keyExtractor={(poll) => poll.pollCode}
                            renderItem={({ item }) => (

                                <TouchableOpacity onPress={()=> router.push({pathname:"/vote", params:{pollCode:item.pollCode, pollName:item.pollName}})} className="h-20 w-[100%] px-4 flex-row">
                                    <View className="w-[70%] h-[100%] justify-center">
                                        <Text className="font-nunito-bold text-lg color-[#333]">{item.pollName}</Text>
                                    </View>
                                    <View className="w-[30%] h-[100%] justify-center items-end ">
                                    
                                    </View>
                                </TouchableOpacity>
                            )}
                            showsVerticalScrollIndicator={false}
                    />

                </View>

            
        </View>
    )

    
}

export default MyPoll