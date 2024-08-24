import colors from "@/constants/Colors";
import { Drawer } from "expo-router/drawer";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import {
  MaterialCommunityIcons,
  FontAwesome6,
  AntDesign,
} from "@expo/vector-icons";

import CustomDrawerContent from "@/components/CustomDrawerContent";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";

// const GradientHeader = () => (
//   <LinearGradient
//     colors={[colors.blue, colors.green, colors.yellow]}
//     start={{ x: 0, y: 0 }}
//     end={{ x: 1, y: 1 }}
//     style={StyleSheet.absoluteFill}
//   />
// );

export default function TabLayout() {

  const {isLoggedIn} = useAuth()

  useEffect(() => {
    if(!isLoggedIn) {
      router.replace('/')
    }
  },[isLoggedIn])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawerContent}
        initialRouteName="home/index"
        screenOptions={{
          headerStyle: {backgroundColor: colors.blue},
          headerTitleStyle: {
            color: "white",
          },
          headerTintColor: "white",
          drawerLabelStyle: { marginLeft: -20 },
        }}
      >
        <Drawer.Screen
          name="home/index"
          options={{
            drawerLabel: "Home",
            title: "Home",
            // header: () => <Header/>,
            drawerIcon: ({ size, color }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="products/index"
          options={{
            drawerLabel: "Produtos",
            title: "Produtos",
            header: (props) => <Header {...props} title="Produtos" />,
            drawerIcon: ({ size, color }) => (
              <AntDesign name="inbox" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="units/index"
          options={{
            drawerLabel: "Unidades",
            title: "Unidades",
            drawerIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="inbox" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="groups/index"
          options={{
            drawerLabel: "Grupos",
            title: "Grupos",
            drawerIcon: ({ size, color }) => (
              <FontAwesome6 name="layer-group" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  HeaderStyles: {
    color: "white",
  },
});
