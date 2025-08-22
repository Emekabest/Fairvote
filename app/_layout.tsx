import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView } from 'react-native';
import 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import '../global.css';
import NavBar from "./navbar";



export default function RootLayout() {

  

  const insets = useSafeAreaInsets();
  const usableHeight = Dimensions.get('screen').height;

  const [isLoading, setIsLoading] = useState(true);
  const [initialRouteName, setInitialRouteName] = useState("getstarted")



  useEffect(() => {
    const checkIfLaunched = async () => {
    //  await AsyncStorage.clear()
      try {

        const value = await AsyncStorage.getItem('hasLaunched');
        if (value === 'true') {
          router.replace('/home'); // or login, dashboard, etc.
        } else {
          console.log("Reached ooo")

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
