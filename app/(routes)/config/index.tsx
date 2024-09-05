import {
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ConfigRoute from "@/components/config/ConfigRoute";
import AntDesign from "@expo/vector-icons/AntDesign";

const Config = () => {

  return (
    <SafeAreaView>
      <View className="px-6 mt-4" style={{rowGap: 12}}>
        <ConfigRoute href={"/config"} iconName="user" Icon={AntDesign} title="Usuário" />
        <ConfigRoute href={"/(routes)/config/dataManagement"} iconName="database" Icon={AntDesign} title="Gestão de dados" />
      </View>
    </SafeAreaView>
  );
};

export default Config;
