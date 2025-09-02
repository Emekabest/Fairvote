import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Header from "./header";
import { globalNavBarStatus as setGlobalNavBar } from "./navbar";
import useSharedStore from "./Repository/store";


const CategoryScreen = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Select Election Category");
  const options = ["Presidential Election", "Govornorship Election", "House of Assembly Election"]

        const voteCategoryStore = useSharedStore((state) => state.voteCategory);
        const setVoteCategoryStore = useSharedStore((state) => state.setVoteCategory);
  

      useFocusEffect(
        useCallback(() => {

            setGlobalNavBar(false)


    }, []))

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {



    setSelectedValue(option);
    setIsOpen(false);
  };

  const handleConfirm = () => {
    if (selectedValue === "Presidential Election"){
      router.push({
        pathname: "vote",
        params: {
          pollCode: "1756212994383",
          pollCreator: "",
          pollName: "Presidential Election"
        }
      } as any);
    }
    else if (selectedValue === "Govornorship Election"){
       router.push({
        pathname: "vote",
        params: {
          pollCode: "1756212994383",
          pollCreator: "",
          pollName: "Govornorship Election"
        }
      } as any);
    }else if (selectedValue === "House of Assembly Election"){

       router.push({
        pathname: "vote",
        params: {
          pollCode: "1756212994383",
          pollCreator: "",
          pollName: "House of Assembly Election"
        }
      } as any);

    }

    
    
  }

  

  return (
    <View className=" flex-1 bg-white">
      <Header />
      <View className="flex-1 justify-center items-center p-5">
        <Image source={require("../assets/images/fairvote-logo.png")} className="w-60 h-60 mb-10" />
        <Text className="font-nunito-bold text-2xl text-[#141414] mt-2 mb-5">Fair Vote</Text>
        
        <View className="w-full">
          {/* Dropdown Button */}
          <TouchableOpacity
            onPress={toggleDropdown}
            className="flex-row items-center justify-between p-4 border border-gray-300 rounded-lg bg-white"
          >
            <Text className="text-lg font-nunito">{selectedValue}</Text>
            <FontAwesome
              name={isOpen ? "chevron-up" : "chevron-down"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>


          {isOpen && (
            <View className="mt-2 border border-gray-300 rounded-lg bg-white">
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSelect(option)}
                  className={`p-4 ${
                    index < options.length - 1 ? "border-b border-gray-200" : ""
                  }`}
                >
                  <Text className="text-lg font-nunito">{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}



          {/* Confirm Button */}
          <TouchableOpacity
            onPress={handleConfirm}
            className="mt-8 bg-[#C4A484] p-4 rounded-lg items-center">
            <Text className="text-white text-lg font-nunito-bold">Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CategoryScreen;