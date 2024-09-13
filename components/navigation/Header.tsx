import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  SimpleLineIcons,
  Octicons,
  EvilIcons,
  AntDesign,
  Feather,
} from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import Sidebar from "./Sidebar";

const Header = ({ title, navigation }: { title: string; navigation: any }) => {
  const params = useLocalSearchParams<{
    query?: string;
    queryId?: string;
    sortBy?: string;
    sortOrder: string;
  }>();
  const [search, setSearch] = useState(params.query);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const textInputRef = useRef<TextInput>(null);

  const handlePress = () => {
    setIsSearchOpen((e) => !e);
    setTimeout(() => {
      if (textInputRef.current) {
        textInputRef.current.focus();
      }
    }, 100);
  };

  const handleExit = () => {
    setIsSearchOpen((e) => !e);
    setSearch("");
    router.setParams({ query: "" });
    Keyboard.dismiss();
  };

  const handleClean = () => {
    setSearch("");
    router.setParams({ query: "" });
  };

  const handleEndEditing = () => {
    if (!search) {
      setIsSearchOpen(false);
    }
    Keyboard.dismiss();
  };

  const handleFilter = () => {
    setFilterOpen((e) => !e);
  };

  const handleTouchOutside = () => {
    setFilterOpen(false);
  };

  return (
    <>
      <View
        style={{
          height: 60,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          gap: 12,
          paddingBottom: 12,
          backgroundColor: colors.blue,
        }}
      >
        {/* Abrir Drawer */}
        <TouchableOpacity
          className="pb-1"
          onPress={() => {
            navigation.openDrawer();
            handleEndEditing();
          }}
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
            className={`items-center justify-center rounded-md w-7 h-7 p-0 m-0
           ${!isSearchOpen && "hidden"}`}
            disabled={isSearchOpen}
          >
            <EvilIcons
              name="search"
              style={{ marginBottom: 4 }}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
          {/* Input de Pesquisa */}
          <TextInput
            value={search}
            style={[
              { flex: 1, height: "100%" },
              !isSearchOpen && { display: "none" },
            ]}
            ref={textInputRef}
            onChangeText={(search) => {
              setSearch(search);
              router.setParams({ query: search });
            }}
            onEndEditing={handleEndEditing}
          />
          {/* Exit button */}
          {isSearchOpen && (
            <View className="flex-row gap-x-1">
              <TouchableOpacity
                className="items-center justify-center rounded-md w-fit h-fit"
                onPress={handleClean}
              >
                <SimpleLineIcons
                  name="trash"
                  thickness
                  size={18}
                  color="gray"
                />
              </TouchableOpacity>

              <TouchableOpacity
                className="items-center justify-center rounded-md w-fit h-fit"
                onPress={handleExit}
              >
                <AntDesign name="close" size={20} color="gray" />
              </TouchableOpacity>
            </View>
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
                  style={{ marginBottom: 4 }}
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
      </View>
      {filterOpen && (
        <TouchableWithoutFeedback onPress={handleTouchOutside}>
          <View style={styles.outsiteComponent} />
        </TouchableWithoutFeedback>
      )}
      <Sidebar filterOpen={filterOpen} setFilterOpen={setFilterOpen} />
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  outsiteComponent: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
