import { Text } from "react-native";
import React from "react";
import colors from "@/constants/colors";
import { LinearGradient } from "expo-linear-gradient";

const Header = ({ title }: { title: string }) => {
  return (
    <LinearGradient
      colors={[colors.blue, colors.green, colors.yellow]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ height: 100 }}
    >
      <Text className="text-white">{title}</Text>
    </LinearGradient>
  );
};

export default Header;
