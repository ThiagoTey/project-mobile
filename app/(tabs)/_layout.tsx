import colors from "@/constants/colors";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import CustomDrawerContent from "@/components/CustomDrawerContent";


const GradientHeader = () => (
  <LinearGradient
    colors={[colors.blue, colors.green, colors.yellow]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={StyleSheet.absoluteFill}
  />
);

export default function TabLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawerContent}
        initialRouteName="Home"
        screenOptions={{
          headerBackground: () => <GradientHeader />,
          drawerLabelStyle: { marginLeft: -20 },
        }}
      >
        <Drawer.Screen
          name="home"
          options={{
            drawerLabel: "Home",
            title: "Home",
            drawerIcon: ({ size, color }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="products"
          options={{
            drawerLabel: "Produtos",
            title: "Produtos",
            drawerIcon: ({ size, color }) => (
              <AntDesign name="inbox" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="units"
          options={{
            drawerLabel: "Unidades",
            title: "Unidades",
            headerBackground: () => <GradientHeader />,
            drawerIcon: ({ size, color }) => (
              <AntDesign name="inbox" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="groups"
          options={{
            drawerLabel: "Grupos",
            title: "Grupos",
            headerBackground: () => <GradientHeader />,
            drawerIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="account-group-outline" size={size} color={color} />
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
