import { FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import HomeController from "./Controller/HomeController";
import Loader from "./loader";
import { globalNavBarStatus as setGlobalNavBar } from "./navbar";
import useSharedStore from "./Repository/store";
import ActivateFonts from "./Service/ActivateFont";
import Greeting from "./Service/GreetingService";





const Home = () => {

    const [fontsLoaded] = useFonts(ActivateFonts);




    const homeDataStore = useSharedStore((state) => state.homeData);
    const setHomeDataStore = useSharedStore((state) => state.setHomeData);

    const loaderStore = useSharedStore((state) => state.value);
    const setLoaderStore = useSharedStore((state) => state.setValue);

    const navBarStore = useSharedStore((state) => state.navBar);
    const setNavBarStore = useSharedStore((state) => state.setNavBar); 

    
    const recentlyVotedStore = useSharedStore((state)=> state.recentlyVoted)
    const setRecentlyVoted_Store = useSharedStore((state)=> state.setRecentlyVoted)

    


    const [isLoader, setIsLoader] = useState(false);    


    const [user, setUser] = useState({"matricNumber": 0, "username": "null"});
    const [polls, setPolls] = useState([{"pollCode": "0", "pollCreator": 0, "pollName": "null"}]);




        useFocusEffect(
        useCallback(() => {
              
            setGlobalNavBar(true)

            navBarStore.setActiveButton("home")
            setNavBarStore({...navBarStore})
        }, [])
    );



    // const [fontsLoaded] = useFonts(ActivateFonts);
    
      
    //   if (!fontsLoaded) {
    //   return null; // Or <AppLoading />
    //   }



    useEffect(()=>{

        const getHomeController = async ()=>{

            loaderStore.setLoaderStatus(true)
            setGlobalNavBar(false)

            const homeData = await HomeController();
                        
            if (homeData.user){
                 homeDataStore.setUserDetails({username: homeData.user.username})
                 homeDataStore.setUserPolls(homeData.polls)
                 homeDataStore.setIsChanges(false)

                 setHomeDataStore({...homeDataStore})
            }
            else if (homeData === "ERR_BAD_RESPONSE"){
                console.log("Server Error")
                loaderStore.setFeedBackMode(true)

                return;
            } 

            loaderStore.setLoaderStatus(false)
            setGlobalNavBar(true)
        }



        if (homeDataStore.getIsChanges()){
              getHomeController();
        }
    },[])




    useEffect(()=>{

        if (loaderStore.getLoaderStatus()){
            setIsLoader(true)
            
        }
        else{
            setIsLoader(false)
        }
        
    },[loaderStore.getLoaderStatus()])
            


    useEffect(()=>{

        const activateHomeData = ()=>{

            const user_store = homeDataStore.getUserDetails();
            const polls_store  = homeDataStore.getUserPolls();


            setUser(user_store);
            setPolls(polls_store)

        }

        activateHomeData()
    },[homeDataStore.getIsChanges()])
        
        


    return(
        <View className="h-[100%] bg-[#C4A484]">




                {
                    isLoader || !fontsLoaded ? 

                    <Loader />

                    :

                

                    <View>

                    <View className="h-[12%] flex-row">
                
                <View className="h-[100%] w-[70%]  flex-row items-center px-5">
                    <View className="h-16 w-16 bg-[#fff] rounded-full mr-3 items-center justify-center">
                        <FontAwesome name="user" size={50} color="#b3b3b3" />
                    </View>
                    <View>
                        <Text className="font-nunito text-sm">{Greeting()}</Text>
                        <Text className="font-nunito-bold text-2xl">{user.username}</Text>
                    </View>
                </View>
                <View className="h-[100%] w-[30%] flex-row justify-end items-center">
                    <View className="h-10 w-10 bg-gray-300 rounded-full mr-3"></View>
                </View> 
            </View>


            <View className="h-[82%] bg-[#fff] mt-16 rounded-t-3xl">

                    <Text className="pt-4 text-center font-bold text-lg">{polls.length < 2 ? "Poll" : "Polls"}: {polls.length}</Text>

                 <FlatList style= {{maxHeight:"100%", marginBottom:112}}
                            data={polls}
                            keyExtractor={(poll) => poll.pollCode}
                            renderItem={({ item }) => (

                                <TouchableOpacity onPress={()=> router.push({pathname:"/vote", params:{pollCode:item.pollCode, pollCreator:item.pollCreator, pollName:item.pollName}})} className="h-20 w-[100%] px-4 flex-row">
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

                }





        </View>
    )

}

export default Home;