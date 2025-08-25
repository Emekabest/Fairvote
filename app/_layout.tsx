import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, Stack } from 'expo-router';
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView } from 'react-native';
import 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import '../global.css';
import NavBar from "./navbar";

// keep splash visible while loading
SplashScreen.preventAutoHideAsync();


export default function RootLayout() {


    useEffect(() => {
    const prepare = async () => {
      // ⏳ wait for 2 seconds before hiding
      await new Promise(resolve => setTimeout(resolve, 5000));
      await SplashScreen.hideAsync();
    };

    prepare();
  }, []);

  

  const insets = useSafeAreaInsets();
  const usableHeight = Dimensions.get('screen').height;

  const [isLoading, setIsLoading] = useState(true);
  const [initialRouteName, setInitialRouteName] = useState("getstarted")



  useEffect(() => {
    const checkIfLaunched = async () => {
    //  await AsyncStorage.clear()
    
      try {

        const value = await AsyncStorage.getItem('hasLaunched');
        const isUser = await AsyncStorage.getItem("matric-number");
        console.log("ahah")

        if (value === 'true' && isUser){
          router.replace('/home'); // or login, dashboard, etc.
          console.log(isUser)
        }
        else if(!isUser){
            router.replace('/signin'); // or login, dashboard, etc. 
        }
        
        else {
          router.replace('/getstarted');
        }
        
      } catch (e) {
        console.error('Failed to load launch status');
      } finally {
        setIsLoading(false);
      }
    };




    checkIfLaunched();
  }, []);

  

  return (
      <SafeAreaView style={{height: usableHeight,paddingTop:insets.top, backgroundColor:"#fff"}}>
        <StatusBar style="dark" />
        <Stack initialRouteName={initialRouteName}>
          <Stack.Screen name='home' options={{headerShown:false}} />
          <Stack.Screen name="getstarted" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen name='signin' options={{headerShown:false}} />
          <Stack.Screen name='poll' options={{headerShown:false}} />
          <Stack.Screen name='createpool' options={{headerShown:false}} />
          <Stack.Screen name='searchvote' options={{headerShown:false}} />
          <Stack.Screen name='vote' options={{headerShown:false}} />
          <Stack.Screen name='profile' options={{headerShown:false}} />
          <Stack.Screen name='mypoll' options={{headerShown:false}} />

        </Stack>

        <NavBar />
      </SafeAreaView>
  );
}
