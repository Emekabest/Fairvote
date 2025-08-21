import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, FlatList, Text, TouchableOpacity, View } from "react-native";
import GetCandidateController from "./Controller/GetCandidateController";
import GetUsersVote from "./Controller/GetUsersVote";

import ListenToVoteCount from "./Controller/ListenToVoteCount";
import VoteController from "./Controller/VoteController";
import Header from "./header";
import Loader from "./loader";
import { globalNavBarStatus as setGlobalNavBar } from "./navbar";
import useSharedStore from "./Repository/store";
import AppDetails from "./Service/AppDetails";
import Spinner from "./spinner";



const VoteScreen = ()=>{
    const { height } = Dimensions.get("window");
    const { pollCode, pollName } = useLocalSearchParams();

        
        const [candidates, setCandidates] = useState<any>([{"firstName": "null", "id": 0, "lastname": "null ", "pollCode": "0", "voteCount": 0}])

        const [checkedCandidate, setCheckedCandidate] = useState<String>("");

        const [voteMode, setVoteMode] = useState(true);

        const [votes, setVotes] = useState<{[key: string]: number }>({});

        const [voteCounts, setVoteCounts] = useState<any>({});




        const loaderStore = useSharedStore((state) => state.value);
        const setLoaderStore = useSharedStore((state) => state.setValue);


        const recentlyVotedStore = useSharedStore((state)=> state.recentlyVoted)
        const setRecentlyVoted_Store = useSharedStore((state)=> state.setRecentlyVoted)

        const homeDataStore = useSharedStore((state) => state.homeData);
        const setHomeDataStore = useSharedStore((state) => state.setHomeData);




        const [isLoader, setIsLoader] = useState(false);
        const [loadingVote, setLoadingVote] = useState(false)
        


        useFocusEffect(
            useCallback(() => {

                    setGlobalNavBar(false)
                
            }, [])
    
        );


        


    useEffect(() => {
        const getUserVote = async()=>{

            const userId = Number(await AsyncStorage.getItem("matric-number"))

            const candidateId = await GetUsersVote(pollCode, userId)

            if (candidateId){
                setVoteMode(false);
                setCheckedCandidate(candidateId);
            }
        } 

        getUserVote()
    }, [checkedCandidate, pollCode]);




    

    useEffect(()=>{

        const getCandidateController = async ()=>{
            loaderStore.setLoaderStatus(true)

            const pollData:any = await GetCandidateController(pollCode);
            // console.log(pollData)
            if (pollData.pollCode){
                setCandidates(pollData.candidates)

            }
            else if (pollData === "ERR_NETWORK"){
                loaderStore.setFeedBackMode(true)
                loaderStore.setFeedBackMessage("A Network Error Occured, Try Again!")
                loaderStore.setReturnBackPage("/home")
                setLoaderStore({...loaderStore})

                console.log("NetWork Error")

                return;
            }



            loaderStore.setLoaderStatus(false)
            setLoaderStore({...loaderStore})
        }


        getCandidateController()
    },[])
    


        useEffect(()=>{
    
            if (loaderStore.getLoaderStatus()){
                setIsLoader(true)
    
            }
            else{
                setIsLoader(false)
            }
    
        },[loaderStore.getLoaderStatus()])
            


    
    const handleCheckedCandidate = (id:String)=>{

        setCheckedCandidate(id)
    }



    const handleVote = async()=>{
        if (!checkedCandidate){

            return;
        }
        setLoadingVote(true)
        const userId = Number(await AsyncStorage.getItem("matric-number"))


        const response = await VoteController({
            pollId:pollCode.toString(),
            candidateId:checkedCandidate,
            userId
        })



        setLoadingVote(false)

        setVoteMode(false)

        homeDataStore.setIsChanges(true)
    }





    useEffect(() => {
    const unsubscribe = ListenToVoteCount(pollCode, (counts:any) => {
        setVoteCounts(counts);
    }, candidates);
    console.log(voteCounts)

  // optional: return unsubscribe if you implement off() cleanup
    }, [candidates]);






    return(
        <View>

            {
                isLoader ?

                <Loader />

                :

                ""
             
            }

               <View>

                <Header />
                <View className="h-[91%] mt-20 items-center" style={{backgroundColor:AppDetails.color.backgroundColor}}>
                <View className="h-20 justify-center items-center">
                    <Text className="font-nunito-bold text-xl color-[#333]">{pollName}</Text>
                </View>
                <View className="w-[100%] pl-4 items-start flex-row">
                    <Text>Pollcode:</Text>
                    <Text className="font-medium">{pollCode}</Text>
                    <TouchableOpacity>
                        <FontAwesome className="pl-4" name="copy" size={18} color="#333" />
                    </TouchableOpacity>
                </View>
                
                <FlatList className="px-4" style= {{maxHeight:"100%", marginBottom:112}}
                            data={candidates}
                            keyExtractor={(candidate) => candidate.id}
                            renderItem={({ item }) => (

                                <View className="h-52 mt-4 rounded-2xl bg-[#cece9f] w-[100%] px-4 flex-row">
                                    <View className="w-[70%] h-[100%] justify-center">
                                        <Text className="font-nunito-bold text-lg color-[#333]">{item.firstname} {item.lastname}</Text>
                                        <Text>Votes: {voteCounts[item.id] ?? 0}</Text>
                                    </View>
                                    <View  className="w-[30%]  h-[100%] justify-center items-end ">


                                            {

                                                voteMode ?

                                                <TouchableOpacity onPress={()=> handleCheckedCandidate(item.id)}>
                                                    <FontAwesome name={checkedCandidate === item.id ? "check-square-o" : "square-o"} size={40} color="#C4A484" />
                                                </TouchableOpacity>

                                                :
                                                <View>
                                                    <FontAwesome name={checkedCandidate === item.id ? "check-square-o" : "square-o"} size={40} color={checkedCandidate === item.id ? "green" : "#C4A484"} />
                                                </View>

                                            }

                                       
                                    </View>
                                </View>
                            )}
                            showsVerticalScrollIndicator={false}
                />


                {
                    voteMode ? 

                        <TouchableOpacity onPress={handleVote} className="absolute h-20 w-[50%] bottom-4 bg-[#C4A484] rounded-xl items-center justify-center" 
                            style={{opacity:checkedCandidate ? 1 : 0.6 }}
                        >
                                    <Text className="font-nunito-bold text-2xl color-[#333]">Vote</Text>
                        </TouchableOpacity>

                        :

                        ""

                }


                {
                    loadingVote ?
                    
                        <View className="absolute h-20 w-[50%] bottom-4 bg-[#C4A484] rounded-xl items-center justify-center">
                                <Spinner color="#333" size={25} />
                        </View>

                        :

                        ""
                }


                {
                        !voteMode ?

                        <View className="absolute h-20 w-[50%] bottom-0 bg-[#C4A484] rounded-xl opacity-40 items-center justify-center">
                                    <FontAwesome name="check"  size={40} color="#333" />
                        </View>

                        :

                        ""

                }
                            
                    
                </View>

                </View>

        </View>
    )
}

export default VoteScreen