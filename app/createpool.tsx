import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import CreatePollController from "./Controller/CreatePollController";
import Header from "./header";
import Loader from "./loader";
import { globalNavBarStatus as setGlobalNavBar } from "./navbar";
import useSharedStore from "./Repository/store";
import AppDetails from './Service/AppDetails';





let setIsLoader_global:any;
const CreatePool = ()=>{




    const loaderStore = useSharedStore((state) => state.value); // ✅ directly call the hook
    const setLoaderStore = useSharedStore((state) => state.setValue); // ✅ directly call the hook


    const [isLoader, setIsLoader] = useState(false)


    type candidate = {
        id:string;
        candidateFirstName:string;
        candidateLastName:string;
    }

    const [pollname, setPollName] = useState("")
    const [candidateList, setCandidateList] = useState<candidate[]>([]);

    const [candidateFirstName, setCandidateFirstName] = useState("");
    const [candidateLastName, setCandidateLastName] = useState("");


    const [formFeedbackMsg, setFormFeedBackMsg] = useState("");
    const formFeedBackTimeout = 5000;
    


    useFocusEffect(
    useCallback(() => {
    
        setGlobalNavBar(false)
    
    }, [])
    );



    const handleSubmitCandidateNames = ()=>{


        if (candidateFirstName.trim() === "" || candidateLastName.trim() === ""){

            setFormFeedBackMsg("A field is empty")

            setTimeout(()=>{
                setFormFeedBackMsg("")

             }, formFeedBackTimeout)

            return;
        }



        setFormFeedBackMsg("")
        setCandidateList([...candidateList, {id:Date.now().toString(), candidateFirstName, candidateLastName }])
        setCandidateFirstName("");
        setCandidateLastName("");

    }




   const handleDeleteCandidateList = (id:string)=>{

       setCandidateList(prevList => prevList.filter(candidate => candidate.id !== id));

   }





    const handleCreatePoll = async ()=>{
        

        if (candidateList.length === 0 || pollname.trim() === ""){

            setFormFeedBackMsg("Please ensure you have added a candidate and a poll name")
            
            setTimeout(()=>{
                setFormFeedBackMsg("")

            }, formFeedBackTimeout)

            return;
        }




        loaderStore.setLoaderStatus(true)
        setIsLoader(true)

        
        const pollCode = Date.now().toString();
        const creator = await AsyncStorage.getItem("matric-number")//Not yet done with this!




        const createPoolFeedback = await CreatePollController({pollname, code:pollCode, creator, candidateList});

       if (createPoolFeedback === "Successful"){
            loaderStore.setFeedBackMode(true)
            loaderStore.setFeedBackMessage("Poll Created Successfully!")
            setLoaderStore({...loaderStore})
            console.log("New Poll Created")

        }
        else{

            loaderStore.setFeedBackMode(true)
            loaderStore.setFeedBackMessage("A Network Error Occured, Try Again!")
            setLoaderStore({...loaderStore})
            console.log("Network error")

            console.log(createPoolFeedback)

            return;
            
        }


    

        // setIsLoader(false)
        // setFormFeedBackMsg("")
        // loaderStore.setLoaderStatus(false)
        // setLoaderStore({...loaderStore})
    }




        useEffect(()=>{

            if (!loaderStore.getLoaderStatus()){

                setIsLoader(false)
                console.log("LoaderStore::"+loaderStore.getLoaderStatus())

            }

        },[loaderStore.getLoaderStatus()])
    

    return(
        <View>

            {
                isLoader ?

                <Loader />

                :

                ""
            }
            
            <Header />
            <View className="h-[92%] mt-20" style={{backgroundColor:AppDetails.color.backgroundColor}}>
                <View className="h-[40%] pt-3 px-4" >

                    <Text className="font-nunito-bold text-center text-lg color-[#333]">Enter Canditate Details</Text>

                    <View className="pt-5">

                        <TextInput className="h-15 rounded-full px-5 font-nunito text-2xl mb-5" value={candidateFirstName} onChangeText={setCandidateFirstName} placeholder="firstname" />

                        <TextInput className="h-15 rounded-full px-5 font-nunito text-2xl mt-5" value={candidateLastName} onChangeText={setCandidateLastName} placeholder="lastname" />
                        <View className="w-[100%] h-36 items-center justify-center">

                            <Text className="pb-3 text-sm color-red-600">{formFeedbackMsg}</Text>

                            <TouchableOpacity className="h-14 w-[100%] rounded-full bg-[#C4A484] items-center justify-center" onPress={()=> handleSubmitCandidateNames()}>
                                <Text className="font-nunito-bold text-xl color-[#333]">Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                

                <View className="h-[60%] px-4">
                    <TextInput className="h-[10%] font-nunito-bold text-lg text-center" value={pollname} onChangeText={setPollName}  placeholder="Enter name of poll" />


                        <FlatList
                            data={candidateList}
                            keyExtractor={(candidateList) => candidateList.id}
                            renderItem={({ item }) => (

                                <View className="h-20 w-[100%] flex-row">
                                    <View className="w-[70%] h-[100%] justify-center">
                                        <Text className="font-nunito-bold text-lg color-[#333]">{item.candidateFirstName} {item.candidateLastName}</Text>
                                    </View>
                                    <View className="w-[30%] h-[100%] justify-center items-end ">
                                        <TouchableOpacity onPress={()=> handleDeleteCandidateList(item.id)}>
                                            <FontAwesome name="trash" size={25} color="#C4A484"/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                            showsVerticalScrollIndicator={false}
                        />


                    <TouchableOpacity className="h-16 w-[100%] rounded-full bg-[#C4A484] items-center justify-center mb-5" onPress={handleCreatePoll}>
                        <Text className="font-nunito-bold color-[#333] text-2xl">Create</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}

export { setIsLoader_global };
export default CreatePool;