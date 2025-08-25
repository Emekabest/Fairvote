import { FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import useSharedStore from "./Repository/store";
import ActivateFonts from "./Service/ActivateFont";



let globalNavBarStatus:any;


const NavBar = ()=>{
    const [fontsLoaded] = useFonts(ActivateFonts);


    const [navBarStatus, setNavBarStatus] = useState(true)
    globalNavBarStatus = setNavBarStatus
    const [activeButton, setActiveButton] = useState("")

    const navBarStore = useSharedStore((state) => state.navBar);
    const setNavBarStore = useSharedStore((state) => state.setNavBar); 


    useEffect(()=>{

        setActiveButton(navBarStore.getActiveButton())

    },[navBarStore.getActiveButton()])


    // useEffect(()=>{    
    //     const checkIfLaunched = async ()=>{
    //         const value = await AsyncStorage.getItem('hasLaunched');
            

    //         if (value === 'true') {
    //             setNavBarStatus(true)

    //         } else {
    //             setNavBarStatus(false)
    //         }

    //     }
    //     checkIfLaunched();
    // },[])


    const handleSelection = (route:string)=>{

        if (route === "home" && activeButton != "home"){
            navBarStore.setActiveButton("home")
            setNavBarStore({...navBarStore})

            
            router.dismissAll()
            router.replace("/home")
        }
        else if(route === "poll" && activeButton != "poll"){
            navBarStore.setActiveButton("poll")
            setNavBarStore({...navBarStore})

            router.push("/poll")
        }
        else if(route === "profile" && activeButton != "profile"){
            navBarStore.setActiveButton("profile")
            setNavBarStore({...navBarStore})


            router.push("/profile")
        }



    }
    
    

    return(

        <View>

            {
                !fontsLoaded ?

                <View>

                </View>

                :
                
 <View className="h-28 w-[100%] absolute bottom-0 flex-row z-0" style = {{display:navBarStatus ? "flex" : "none"}}>
                <View className="h-[100%] w-[33%] items-center justify-center">
                    <TouchableOpacity className="items-center" onPress={()=> handleSelection("home")}>
                        <FontAwesome name="home" size={30} color={activeButton === "home" ? "#C4A484" : "#787878" } />
                        <Text className="font-nunito-bold text-sm" style = {{color: activeButton === "home" ? "#C4A484" : "#787878"}}>Home</Text>
                    </TouchableOpacity>
                </View>
                <View className="h-[100%] w-[34%] items-center">
                    <TouchableOpacity className="h-24 w-24 bg-[#C4A484] rounded-full items-center justify-center" onPress={()=> handleSelection("poll")}>
                        <FontAwesome name="plus" size={25} color="#fff"/>
                    </TouchableOpacity>
                </View>
                <View className="h-[100%] w-[33%] items-center justify-center">


                    <TouchableOpacity  className="items-center" onPress={()=> handleSelection("profile")}>
                        <FontAwesome name="user" size={30} color={activeButton === "profile" ? "#C4A484" : "#787878"  } />
                        <Text className="font-nunito text-sm" style={{color:activeButton === "profile" ? "#C4A484" : "#787878"  }}>Profile</Text>
                    </TouchableOpacity>

                </View>
           </View>

            }


          </View>
           
    )

}


export { globalNavBarStatus };

export default NavBar;
