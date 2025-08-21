import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing } from "react-native";


const Spinner = (details:any)=>{

        const [spinnerMode, setSpinnerMode] = useState(false);

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



    

    return (
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <FontAwesome name="spinner" size={details.size} color={details.color} />
            </Animated.View>
    )

}


export default Spinner