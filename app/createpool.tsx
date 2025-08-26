import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import CreatePollController from "./Controller/CreatePollController";
import Header from "./header";
import Loader from "./loader";
import { globalNavBarStatus as setGlobalNavBar } from "./navbar";
import useSharedStore from "./Repository/store";
import AppDetails from './Service/AppDetails';





let setIsLoader_global:any;
const CreatePool = ()=>{


    const { height } = Dimensions.get("window");
    

    const loaderStore = useSharedStore((state) => state.value); // ✅ directly call the hook
    const setLoaderStore = useSharedStore((state) => state.setValue); // ✅ directly call the hook


    const [isLoader, setIsLoader] = useState(false)


    type candidate = {
        id:string;
        candidateFirstName:string;
        candidateLastName:string;
        candidateImage:string
    }

    const [pollname, setPollName] = useState("")
    const [candidateList, setCandidateList] = useState<candidate[]>([]);

    const [candidateFirstName, setCandidateFirstName] = useState("");
    const [candidateLastName, setCandidateLastName] = useState("");


    const [formFeedbackMsg, setFormFeedBackMsg] = useState("");
    const formFeedBackTimeout = 5000;

    const [candidateImage, setCandidateImage] = useState("")
    


    useFocusEffect(
    useCallback(() => {
    
        setGlobalNavBar(false)
    
    }, [])
    );



    const handleSubmitCandidateData = ()=>{

        if (candidateFirstName.trim() === "" || candidateLastName.trim() === ""){

            setFormFeedBackMsg("A field is empty")

            setTimeout(()=>{
                setFormFeedBackMsg("")

             }, formFeedBackTimeout)

            return;
        }



        setFormFeedBackMsg("")
        setCandidateList([...candidateList, {id:Date.now().toString(), candidateFirstName, candidateLastName, candidateImage }])
        setCandidateFirstName("");
        setCandidateLastName("");
        setCandidateImage("");

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

            }

        },[loaderStore.getLoaderStatus()])


        const handleSelectImage = async()=>{

            const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 1,
            base64:true
            });

            
            if (!result.canceled) {
                const asset = result.assets[0];
                const base64Data = asset.base64;
                const mimeType = asset.type === "image" ? "image/jpeg" : "image/png"; 



                setCandidateImage(`data:${mimeType};base64,${base64Data}`);

                // convert the image to a Blob so Firebase Storage can upload it
                // const response = await fetch(pickedImage.uri);
                // const blob = await response.blob();

                // return the blob to parent (this will become candidate.imageFile)
                // onImagePicked(blob);
            }
        };

    
    

    return(
        <View className="h-[100%]" style={{backgroundColor:AppDetails.color.backgroundColor}}>

            {
                isLoader ?

                <Loader />

                :

                ""
            }
        
            <View>
                <Header />
                <View className="mt-20" style={{backgroundColor:AppDetails.color.backgroundColor, height:height - AppDetails.header.height, marginTop:AppDetails.header.height}}>
                    <View className="h-[40%] px-4" >


                        <View className="">
                            <TextInput className="text-xl text-center rounded-full font-nunito-bold bg-gray-100"  placeholderTextColor="gray" value={pollname} onChangeText={setPollName}  placeholder="Enter poll name" />

                            <TextInput className="h-12 rounded-full px-5 text-lg mb-2" placeholderTextColor="gray" value={candidateFirstName} onChangeText={setCandidateFirstName} placeholder="Enter candidate firstname" />

                            <TextInput className="h-12 rounded-full px-5 text-lg mb-3" placeholderTextColor="gray" value={candidateLastName} onChangeText={setCandidateLastName} placeholder="Enter candidate lastname" />

                            <View className="h-24 flex-row">

                                <View className="h-[100%] w-[30%] rounded-lg bg-gray-200 items-center justify-center overflow-hidden">
                                    <Image
                                        source={{ uri: candidateImage }}
                                        style={{ width: "100%", height: "100%"}}
                                    />
                                </View>
                                
                                <View className=" w-20 items-center justify-center">
                                    <TouchableOpacity className="w-10 h-10 items-center rounded-full justify-center" onPress={handleSelectImage} activeOpacity={1} style={{backgroundColor: AppDetails.color.iconColors}}>
                                        <FontAwesome name="plus" size={15} color="#fff"  className="" />
                                        
                                    </TouchableOpacity>
                                </View>

                            </View>

                            
                            <View className="w-[100%] items-center justify-center">

                                <Text className="pb-2 text-sm color-red-600">{formFeedbackMsg}</Text>

                                <TouchableOpacity  activeOpacity={1} className="h-12 w-[100%] rounded-full bg-[#C4A484] items-center justify-center" onPress={()=> handleSubmitCandidateData()}>
                                    <Text className="font-nunito-bold text-xl color-[#333]">Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    

                    <View className="h-[60%] px-4 pt-4">


                            <FlatList
                                data={candidateList}
                                keyExtractor={(candidateList) => candidateList.id}
                                renderItem={({ item }) => (

                                    <View className="h-20 w-[100%] mb-3 flex-row">
                                        <View className="w-[70%] h-[100%] flex-row">
                                            <View className="h-[100%] w-[30%]">
                                                    {
                                                        item.candidateImage ?

                                                        <Image
                                                            source={{ uri: item.candidateImage }}
                                                            style={{ width: "100%", height: "100%"}}
                                                        />
                                                        :
                                                        <View className="h-[100%] w-[100%] items-center justify-center">
                                                            <FontAwesome name="user-circle" size={50} color="#aaa"  className="" />
                                                        </View>

                                                    }

                                            </View>

                                            <View className="h-[100%] w-[70%] justify-center ml-3">
                                                    <Text className="font-nunito-bold text-lg color-[#333]">{item.candidateFirstName} {item.candidateLastName}</Text>
                                            </View>
                                            

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


                        <TouchableOpacity className="h-16 w-[100%] rounded-full bg-[#C4A484] items-center justify-center" onPress={handleCreatePoll}>
                            <Text className="font-nunito-bold color-[#333] text-2xl">Create</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </View>
    )
}

export { setIsLoader_global };
export default CreatePool;