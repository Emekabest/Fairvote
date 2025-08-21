import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Text, TouchableOpacity, View } from "react-native";
import useSharedStore from "./Repository/store";
import AppDetails from "./Service/AppDetails";


const Loader = ()=>{

    const loaderStore = useSharedStore((state) => state.value); // ✅ directly call the hook
    const setLoaderStore = useSharedStore((state) => state.setValue); // ✅ directly call the hook

    

    let  loaderTimeOut:any;
    const loaderTimeOutValue = 20000; //Milliseconds
    const [spinnerMode, setSpinnerMode] = useState(false);
    const [feedBackMessage, setFeedBackMessage] = useState("Opps An Error Occured, Try Again");

    
    useEffect(()=>{

        setSpinnerMode(true)

    },[])
    


        const spinValue = useRef(new Animated.Value(0)).current;
        useEffect(() => {
            if (spinnerMode){
            spinValue.setValue(0);

            Animated.loop(
            Animated.timing(spinValue, {
            toValue: 1,
            duration: 1000, // 1 second for full rotation
            easing: Easing.linear,
            useNativeDriver: true,
        })
        ).start();
        }else{
            spinValue.stopAnimation();
        }
        
    }, [spinnerMode]);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],

    });


    useEffect(()=>{

        if (loaderStore.getFeedBackMode()){
            setSpinnerMode(false)

            setFeedBackMessage(loaderStore.getFeedBackMessage())
        }

    },[loaderStore.getFeedBackMode()])
    




    const handleLoaderFeedBack  = ()=>{

        if (feedBackMessage == "Poll Created Successfully!"){
                router.push("/poll")
        }

        if(loaderStore.getReturnBackPage()){
            const path = loaderStore.getReturnBackPage();
            router.push(path)

        }

        loaderStore.setFeedBackMode(false)
        loaderStore.setLoaderStatus(false)
        setLoaderStore({...loaderStore})        
    }
    



    return(
         <View className="h-[100%] w-[100%] absolute top-0 z-50 flex-1 justify-center items-center"  style={{backgroundColor:AppDetails.color.backgroundColor}}> 
         {/* <Header />  */}

         {
            spinnerMode ?
            
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
                    <FontAwesome name="spinner" size={40} color="#C4A484" />
            </Animated.View>

            :

            <View className="h-60 w-[80%]  items-center justify-center rounded-2xl" >
                <Text className="font-nunito-bold text-xl text-ellipsis color-[#333]">{feedBackMessage}</Text>
                <TouchableOpacity onPress={handleLoaderFeedBack} className="w-[80%] h-14 absolute bottom-2 rounded-full justify-center items-center bg-[#C4A484]">
                    <Text className="font-nunito-bold text-xl color-[#333]">Ok</Text>
                </TouchableOpacity>
            </View>


         }

            




         </View>
    )
}



export default Loader

