import { Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Octicons, EvilIcons, AntDesign, Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import colors from "@/constants/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import Sidebar from "./Sidebar";

const Header = ({ title, navigation }: { title: string; navigation: any }) => {
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false)

  const handlePress = () => {
    setIsSearchOpen((e) => !e);
  };

  const handleEndEditing = () => {
    if (!search) {
      setIsSearchOpen(false);
    }
  };

  const handleFilter = () => {
    setFilterOpen((e) => !e);
  }

  return (
    <>
    <LinearGradient
      colors={[colors.blue, colors.green, colors.yellow]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        height: 90,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        gap: 12,
        paddingBottom: 12,
      }}
    >
      {/* Abrir Drawer */}
      <TouchableOpacity
        className="pb-1"
        onPress={() => navigation.openDrawer()}
      >
        <Octicons name="three-bars" size={20} color="white" />
      </TouchableOpacity>

      {/* Pesquisa */}
      <View
        className={`flex-row flex-1 items-center 
        ${
          isSearchOpen
            ? "rounded-md h-[35px] bg-white justify-center px-2"
            : "justify-between transition-all w-fit"
        }`}
      >
        {/* Titulo */}
        <Text
          className={`text-white text-xl font-medium ${
            isSearchOpen && "hidden"
          }`}
        >
          {title}
        </Text>
        {/* Lupa */}
        <TouchableOpacity
          className={`items-center justify-center rounded-md w-fit h-fit
           ${!isSearchOpen && "hidden"}`}
          disabled={isSearchOpen}
        >
          <EvilIcons name="search" size={24} color="gray" />
        </TouchableOpacity>
        {/* Input de Pesquisa */}
        <TextInput
          value={search}
          className={`h-full hidden ${isSearchOpen && "flex"}`}
          style={{ flex: 1 }}
          onChangeText={(search) => {
            setSearch(search);
            router.setParams({ query: search });
          }}
          onEndEditing={handleEndEditing}
        />
        {/* Exit button */}
        {isSearchOpen && (
          <TouchableOpacity
            className="items-center justify-center rounded-md w-fit h-fit"
            onPress={handlePress}
          >
            <AntDesign name="close" size={24} color="gray" />
          </TouchableOpacity>
        )}
        {/* Icone Filtro e Lupa*/}
        {!isSearchOpen && (
          <View className="flex-row items-center justify-center gap-2">
            <TouchableOpacity
              className="bg-white items-center justify-center w-[35px] h-[35px] rounded-full"
              disabled={isSearchOpen}
              onPress={handlePress}
            >
              <EvilIcons
                name="search"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleFilter}>
              <Feather name="filter" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </LinearGradient>
    <Sidebar filterOpen={filterOpen}/>
    </>
  );
};

export default Header;
