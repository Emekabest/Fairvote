import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from 'expo-clipboard';
import { Link, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import Confirmation from "./confirmation";
import DeactivatePollController from "./Controller/DeactivatePollController";
import GetCandidateController from "./Controller/GetCandidateController";
import GetSinglePollController from "./Controller/GetSinglePollController";
import GetUsersVote from "./Controller/GetUsersVote";
import ListenToVoteCount from "./Controller/ListenToVoteCount";
import VoteController from "./Controller/VoteController";
import Header from "./header";
import Loader from "./loader";
import { globalNavBarStatus as setGlobalNavBar } from "./navbar";
import useSharedStore from "./Repository/store";
import AppDetails from "./Service/AppDetails";
import GetPollCandidatesWinner from "./Service/GetPollCandidatesWinner";


const VoteScreen = ()=>{
    const { height } = Dimensions.get("window");
    const { pollCode, pollName, pollCreator } = useLocalSearchParams();

        
        const [isCreator, setIsCreator] = useState(false);

        const [candidates, setCandidates] = useState<any>([{"firstName": "null", "id": 0, "lastname": "null ", "pollCode": "0", "voteCount": 0, "image": "null"}])

        const [checkedCandidate, setCheckedCandidate] = useState<String>("");
        const [pollWinner, setPollWinner] = useState({firstname:"", id:"", lastname:""});

        const [voteMode, setVoteMode] = useState(true);

        const [votes, setVotes] = useState<{[key: string]: number }>({});

        const [voteCounts, setVoteCounts] = useState<any>({});

        const [pollActive, setPollActive] = useState(false)



        const loaderStore = useSharedStore((state) => state.value);
        const setLoaderStore = useSharedStore((state) => state.setValue);


        const confirmation_store = useSharedStore((state)=> state.confirmation)
        const setConfirmation_store = useSharedStore((state)=> state.setConfirmation)

        const [isConfirmation, setIsConfirmation] = useState(false)


        const homeDataStore = useSharedStore((state) => state.homeData);
        const setHomeDataStore = useSharedStore((state) => state.setHomeData);

        const [copyFeedBack, setCopyFeedBack] = useState("")



        const [isLoader, setIsLoader] = useState(false);
        const [loadingVote, setLoadingVote] = useState(false)

        


        useFocusEffect(
            useCallback(() => {

                    setGlobalNavBar(false)



            }, [])
        );


        useEffect(()=>{
            const validatePollCreator = async()=>{
                const userId = await AsyncStorage.getItem("matric-number")

                if (pollCreator === userId){

                    setIsCreator(true)
                }
                else{
                    setIsCreator(false)
                }

            }
            validatePollCreator()
        },[pollCreator])

        


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




        const getSinglePoll = async()=>{
            const response = await GetSinglePollController(pollCode)
            
            if(response?.status){
                
                setPollActive(response.data.isActive)
            }


        }

    

    useEffect(()=>{

        const getCandidateController = async ()=>{
            loaderStore.setLoaderStatus(true)

            const pollData:any = await GetCandidateController(pollCode);
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


            await getSinglePoll()

            loaderStore.setLoaderStatus(false)
            setLoaderStore({...loaderStore})
        }


        getCandidateController()
    },[pollCode])
    


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
        if (!checkedCandidate || !voteMode){

            return;
        }

        
        const userId = Number(await AsyncStorage.getItem("matric-number"))

        const response = await VoteController({
            pollId:pollCode.toString(),
            candidateId:checkedCandidate,
            userId
        })

        
        setVoteMode(false)
        homeDataStore.setIsChanges(true)
    }





    useEffect(() => {
    const unsubscribe = ListenToVoteCount(pollCode, (counts:any) =>{

        setVoteCounts(counts);

    }, candidates);
    }, [candidates]);




    useEffect(()=>{

            setTimeout(()=>{

                setCopyFeedBack("")

        },3000)
    },[copyFeedBack])


    const handleCopyPollCode = ()=>{

        Clipboard.setStringAsync(pollCode.toString())

        setCopyFeedBack("copied")

    }




 

        









    const handleDeactivateVote = async()=>{

        if (!pollActive){
            return;
        }
        const activateConfirmation = async()=>{

            const response = await DeactivatePollController(pollCode)

            if (response.status){
                setPollActive(false)

            }
        }
        
        setIsConfirmation(true)
        confirmation_store.setStatus(true)

        confirmation_store.setYesButtonFunction(activateConfirmation)

        setConfirmation_store({...confirmation_store})
    }


    useEffect(()=>{

        if (!confirmation_store.getStatus()){
            setIsConfirmation(false)

        }

    },[confirmation_store.getStatus()])






    
    

    useEffect(()=>{
        const getPollCandidateWinner = ()=>{
            const result = GetPollCandidatesWinner(candidates, voteCounts)

            if (result.winners.length === 1){

                setPollWinner(result.winners[0])
            }
            
        }
        getPollCandidateWinner()
    },[candidates, voteCounts])

    return(
        <View style={{height:"100%"}}>


            {
                isLoader ?

                <Loader />

                :

                ""
             
            }


            {

                isConfirmation ?

                     <Confirmation />

                :
                    ""

            }
            

               <View>

                    <Header />

                    <View className="" style={{height:height - AppDetails.header.height, marginTop:AppDetails.header.height}}>

                        <View className="h-[15%] px-4">

                            <View className="h-20 flex-row items-center justify-between">
                                <View className="flex-row items-center">
                                    <View className="h-4 w-4 mr-3 rounded-lg" style={{backgroundColor:pollActive ? "#64ED5A" : "#BFBFBF" }} />
                                    <Text className="font-nunito-bold text-xl color-[#333]">{pollName}</Text>
                                </View>

                                <Link
                                    href={{
                                        pathname: "/chart",
                                        params: { pollCode: pollCode, pollName: pollName }
                                    }}
                                    asChild
                                >
                                    <TouchableOpacity className="bg-[#C4A484] py-2 px-4 rounded-lg">
                                        <Text className="font-nunito-bold text-[#333]">View Chart</Text>
                                    </TouchableOpacity>
                                </Link>
                            </View>
                            <View className="w-[100%] items-start flex-row">
                                <Text className="text-sm">Code:</Text>
                                <Text className="font-medium text-sm">{pollCode}</Text>
                                <TouchableOpacity onPress={handleCopyPollCode}>
                                    <FontAwesome className="pl-3" name="copy" size={15} color="#333" />
                                </TouchableOpacity>

                                <Text className="absolute right-3 font-nunito-bold">{copyFeedBack}</Text>
                            </View>

                            {

                                !pollActive ? 

                                <View className="items-center pt-3">
                                    {

                                        pollWinner.id ?

                                            <Text className="font-extrabold">The Winner is: {pollWinner.lastname} {pollWinner.firstname}</Text>

                                        :

                                            <Text className="font-extrabold">The result is a draw</Text>

                                    }

                                </View>

                                :

                                <View />
                            }

                            
                        
                        </View>


                            <FlatList className="px-4" style= {{maxHeight:"75%"}}
                                        data={candidates}
                                        keyExtractor={(candidate) => candidate.id}
                                        renderItem={({ item }) => (

                                            <View className="h-52 mt-4 rounded-2xl bg-[#cece9f] w-[100%] px-4 flex-row">
                                                <View className="w-[70%] h-[100%] flex-row items-center">
                                                    <View className="h-24 w-24 rounded-2xl overflow-hidden">
                                                        {
                                                            item.image ?

                                                            <Image
                                                                source={{ uri: item.image }}
                                                                style={{ width: "100%", height: "100%"}}
                                                                /> 

                                                        :

                                                            <FontAwesome name="user-circle" size={80} color="#fff" />

                                                        }
                                                     </View>


                                                     <View className="pl-4">
                                                        <Text className="font-nunito-bold text-lg color-[#333]">{item.firstname} {item.lastname}</Text>
                                                        <Text>Votes: {voteCounts[item.id] ?? 0}</Text>
                                                     </View>
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

                            <View className="h-[10%] px-4"  style={{display:"flex", flexDirection:isCreator ? "row" : "column",  alignItems:isCreator ? "stretch" : "center" }}>

                                <View className="h-[100%] w-[50%] justify-center items-center" style={{display:isCreator ? "flex" : "none"}}>
                                        <TouchableOpacity activeOpacity={1} onPress={handleDeactivateVote}>
                                            <FontAwesome name={pollActive ? "toggle-on" : "toggle-off"} size={40} color={AppDetails.color.iconColors}></FontAwesome>
                                        </TouchableOpacity>
                                </View>

                               
                                <View className="h-[100%] justify-center items-center" style = {{width:isCreator ? "50%" : "100%"}}>

                                    {

                                        pollActive ?
                                        
                                        <TouchableOpacity onPress={handleVote} activeOpacity={voteMode ? 1 : 0.6} className="h-20 w-[100%] bg-[#C4A484] rounded-xl items-center justify-center" 
                                        style={{opacity:voteMode ? 1 : 0.6 }}>
                                        {

                                            voteMode ?

                                                <Text className="font-nunito-bold text-2xl color-[#333]">Vote</Text>
                                            
                                            :

                                                <FontAwesome name="check"  size={40} color="#333" />
                                        }
                                        </TouchableOpacity>

                                        :


                                        <Text className="color-[#ff3737] font-nunito-bold">This poll session has ended</Text>


                                    }

                                    
                                </View>

                            
                            


                            {/* {
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

                            } */}


                            </View>

                    </View>

                </View>

        </View>
    )
}

export default VoteScreen