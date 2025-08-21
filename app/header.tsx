import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from "react";
import { TouchableOpacity, View } from "react-native";
// import "../global.css";



interface HeaderProps{
    navigation:any
    route:any
}



const Header = ()=>{

    const router = useRouter();
    

    return(
        <View className="h-20 w-[100%] bg-[#C4A484] absolute top-0 px-5 justify-center z-10">
            
            <TouchableOpacity onPress={()=> router.back()}>
                <FontAwesome name="arrow-left" size={26} color="#333" />  
            </TouchableOpacity>

        </View>
    )

}

export default Header;