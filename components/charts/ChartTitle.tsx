import { View, Text } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import ThemedText from "../typography/ThemedText";

type Props = {
    iconName: keyof typeof AntDesign.glyphMap;
    title:string;
};

const ChartTitle = ({iconName, title}: Props) => {
  return (
    <View className="flex-row items-center gap-x-2">
      <View className="justify-center items-center w-[40px] h-[40px] rounded-2xl bg-[#1FBCFF]/10">
        <AntDesign name={iconName} size={24} color="black" />
      </View>
      <ThemedText className="font-isemibold text-base">
        {title}
      </ThemedText>
    </View>
  );
};

export default ChartTitle;
