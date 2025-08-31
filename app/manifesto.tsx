import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Confirmation from './confirmation';
import Header from './header';
import useSharedStore from './Repository/store';


const ManifestoScreen = () => {
  const params = useLocalSearchParams<{
    id: string;
    firstname: string;
    lastname: string;
    image: string;
    pollCode: string;
    pollName: string;
    manifesto: string;
  }>();

        const manifestoStore = useSharedStore((state) => state.manifestoImage);

        const [manifestoImage, setManifestoImage] = useState("");

        const [isConfirmation, setIsConfirmation] = useState(false)
        
        
        const confirmation_store = useSharedStore((state)=> state.confirmation)
        const setConfirmation_store = useSharedStore((state)=> state.setConfirmation)


  const {
    id: candidateId,
    firstname = 'Candidate',
    lastname = '',
    image,
    pollCode,
    pollName,
    manifesto,
  } = params;

  const [matricNumber, setMatricNumber] = useState('');
  const [voteMode, setVoteMode] = useState(true); // true if user can vote
  const [isVoting, setIsVoting] = useState(false);
  const [voteFeedback, setVoteFeedback] = useState('');

  const candidateName = `${firstname} ${lastname}`.trim();

  // Use the passed manifesto, or a placeholder if it's not available
  const manifestoText = manifesto && manifesto !== 'null'
    ? manifesto
    : `No manifesto has been provided for this candidate.`;

  useEffect(() => {
    // Defer the storage check to the next event loop tick. This allows the
    // screen transition animation to complete smoothly before we do any work.
    const timerId = setTimeout(() => {
      const checkVoteStatus = async () => {
        const userMatric = await AsyncStorage.getItem("matric-number");
        setMatricNumber(userMatric || '');

        if (pollCode) {
          const votedCandidateId = await AsyncStorage.getItem(pollCode);
          if (votedCandidateId) {
            setVoteMode(false); // User has already voted
          }
        }
      };
      checkVoteStatus();
    }, 0);

    return () => clearTimeout(timerId); // Cleanup the timeout
  }, [pollCode]);



  const handleVote = async () => {
    if (!voteMode || isVoting) return;

    const isHandleVote = ()=>{
      setIsVoting(true);
      setVoteFeedback('');

      // Simulate a successful vote for UI feedback for testing purposes
      setTimeout(() => {
        setIsVoting(false);
        setVoteFeedback('thanks for voting');
        setVoteMode(false); // Disable voting temporarily

        // Re-enable voting after 30 minutes for testing
        setTimeout(() => {
          setVoteMode(true);
          setVoteFeedback(''); // Clear the message
        }, 30 * 60 * 1000); // 30 minutes in milliseconds
      }, 1000); // Simulate 1-second network delay

    }

        setIsConfirmation(true)
        confirmation_store.setStatus(true)

        confirmation_store.setYesButtonFunction(isHandleVote)

        setConfirmation_store({...confirmation_store})
  };



      useEffect(()=>{
  
          if (!confirmation_store.getStatus()){
              setIsConfirmation(false)
  
          }
  
      },[confirmation_store.getStatus()])


  useEffect(() => {


    setManifestoImage(manifestoStore)

    console.log("Manifesto Image:", manifestoImage[0]);

    
  }, [manifestoImage]);    

  

  return (




    <View className="flex-1 bg-white">

      {

          isConfirmation ?

            <Confirmation />

          :
              ""
      }

      <Stack.Screen options={{ title: candidateName }} />
      <Header />
      <ScrollView contentContainerStyle={{ paddingBottom: 120, paddingTop: 60 }}>
        <View className="bg-[#fff] items-center justify-center">
                <Image source={require("../assets/images/fairvote-logo.png")} className="w-52 h-52" />
            <Text className="font-nunito-bold text-xl text-[#141414] mt-2 mb-5">Fair Vote</Text> 
        </View>
        <View className="p-5 items-center">
          {manifestoImage && manifestoImage !== 'null' ? (
                <Image
                source={{ uri: manifestoImage }}
                className="w-40 h-40 rounded-full border-4 border-gray-200"
                />
          ) : (
            <View className="w-40 h-40 rounded-full bg-gray-200 justify-center items-center">
              <Text className="text-gray-500">No Image</Text>
            </View>
          )}
          <Text className="text-3xl font-nunito-bold mt-4">{candidateName}</Text>
          <Text className="text-lg font-nunito text-gray-600">{pollName}</Text>
        </View>

        <View className="px-5 mt-5">
          <Text className="text-2xl font-nunito-bold mb-3">Our Manifesto</Text>
          <Text className="text-base font-nunito leading-6 text-gray-700">
            {manifestoText}
          </Text>
        </View>
      </ScrollView>

      
      {/* Voting Button Section */}
      <View className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-200">
        <TouchableOpacity
          onPress={handleVote}
          disabled={!voteMode || isVoting}
          className="h-20 w-full bg-[#C4A484] rounded-xl items-center justify-center"
          style={{ opacity: !voteMode || isVoting ? 0.6 : 1 }}>
          {isVoting ? (
            <ActivityIndicator color="white" />
          ) : voteMode ? (
            <Text className="font-nunito-bold text-2xl text-white">Vote</Text>
          ) : (
            <FontAwesome name="check" size={40} color="#333" />
          )}
        </TouchableOpacity>
        {voteFeedback && (
          <Text
            className={`text-center mt-2 font-nunito-bold ${
              voteFeedback === 'thanks for voting' ? 'text-green-600' : 'text-red-600'
            }`}
          >{voteFeedback}</Text>
        )}
      </View>
    </View>
  );
};

export default ManifestoScreen;