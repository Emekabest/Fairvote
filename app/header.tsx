import { FontAwesome } from '@expo/vector-icons';
import { useNavigationState } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React from "react";
import { TouchableOpacity, View } from "react-native";
import AppDetails from './Service/AppDetails';
// import "../global.css";



interface HeaderProps{
    navigation:any
    route:any
}



const Header = ()=>{
    const routesLength = useNavigationState((state) => state.routes.length);


    const handleNavigation = ()=>{
    const router = useRouter();


    if (routesLength > 1){

        router.back()
    }
    

    }



    return(
        <View className="w-[100%] bg-[#C4A484] absolute top-0 px-5 justify-center z-10" style={{height:AppDetails.header.height}}>
            
            <TouchableOpacity onPress={handleNavigation}>
                <FontAwesome name="arrow-left" size={26} color="#333" />  
            </TouchableOpacity>

        </View>
    )

}

export default Header;