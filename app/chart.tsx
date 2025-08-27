import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GetCandidateController from "./Controller/GetCandidateController";

const MAX_VOTES_PER_CANDIDATE = 50_000_000;
const VOTE_INTERVAL_MS = 1000; // 1 second

type Candidate = {
  id: string;
  firstname: string;
  lastname:string;
  image?: string;
};

// A list of distinct colors for the bars
const BAR_COLORS = ["#3498db", "#e74c3c", "#2ecc71", "#f1c40f", "#9b59b6", "#1abc9c", "#e67e22"];

const ChartScreen = () => {
  const { pollCode, pollName } = useLocalSearchParams<{ pollCode: string; pollName: string }>();

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [voteCounts, setVoteCounts] = useState<{ [key: string]: number }>({});
  const [isVotingActive, setIsVotingActive] = useState(true);

  // Fetch candidates when the screen loads using the pollCode
  useEffect(() => {
    const fetchCandidates = async () => {
      if (!pollCode) {
        setIsLoading(false);
        return;
      }
      try {
        const pollData: any = await GetCandidateController(pollCode);
        if (pollData?.candidates) {
          setCandidates(pollData.candidates);
          // Initialize votes for each candidate to 0
          const initialVotes: { [key: string]: number } = {};
          pollData.candidates.forEach((c: Candidate) => {
            initialVotes[c.id] = 0;
          });
          setVoteCounts(initialVotes);
        }
      } catch (error) {
        console.error("Failed to fetch candidates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidates();
  }, [pollCode]);

  // Run the voting simulation
  useEffect(() => {
    if (!isVotingActive || isLoading || candidates.length === 0) {
      return;
    }

    const interval = setInterval(() => {
      setVoteCounts(prevCounts => {
        const newCounts = { ...prevCounts };
        let allCandidatesHaveReachedMax = true;

        for (const candidate of candidates) {
          const currentVotes = newCounts[candidate.id] ?? 0;

          if (currentVotes < MAX_VOTES_PER_CANDIDATE) {
            allCandidatesHaveReachedMax = false;
            const randomVotes = Math.floor(Math.random() * 5000) + 1;
            newCounts[candidate.id] = Math.min(
              currentVotes + randomVotes,
              MAX_VOTES_PER_CANDIDATE
            );
          }
        }

        if (allCandidatesHaveReachedMax) {
          setIsVotingActive(false);
        }

        return newCounts;
      });
    }, VOTE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isVotingActive, candidates, isLoading]);

  // Calculate the highest vote count for scaling the bars
  const maxVotes = useMemo(() => {
    const allVotes = Object.values(voteCounts);
    if (allVotes.length === 0) return 1;
    return Math.max(...allVotes, 1);
  }, [voteCounts]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#C4A484" />
        <Text className="mt-4 font-nunito text-lg text-gray-600">Loading Live Chart...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['bottom', 'left', 'right']}>
      <View className="p-4">
        <Text className="text-3xl font-nunito-bold text-center mb-2 text-gray-800">{pollName}</Text>
        <Text className="text-lg font-nunito text-center mb-8 text-gray-500">Live Election Results</Text>
      </View>

      <View className="flex-1 justify-center px-4 pb-4">
        <View className="flex-row justify-around items-end h-[80%] w-full bg-gray-100 rounded-xl p-4 border border-gray-200">
          {candidates.map((candidate, index) => {
            const voteCount = voteCounts[candidate.id] ?? 0;
            const barHeightPercentage = maxVotes > 0 ? (voteCount / maxVotes) * 100 : 0;
            const barColor = BAR_COLORS[index % BAR_COLORS.length];

            return (
              <View key={candidate.id} className="flex-col items-center flex-1 h-full justify-end">
                <Text className="font-nunito-bold text-sm text-gray-800 mb-1">
                  {voteCount.toLocaleString()}
                </Text>
                <View
                  style={{
                    height: `${barHeightPercentage}%`,
                    backgroundColor: barColor,
                  }}
                  className="w-[50%] max-w-[50px] rounded-t-lg"
                />
                <View className="h-12 w-12 rounded-full bg-gray-300 mt-3 border-2 border-white shadow-md overflow-hidden justify-center items-center">
                  {candidate.image && candidate.image !== "null" ? (
                    <Image source={{ uri: candidate.image }} className="h-full w-full" />
                  ) : (
                    <FontAwesome name="user" size={24} color="#6b7280" />
                  )}
                </View>
                <Text className="font-nunito-bold text-xs text-center mt-2" numberOfLines={1}>
                  {candidate.firstname} {candidate.lastname}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChartScreen;
