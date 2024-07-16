import colors from "@/constants/colors";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

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
      <Drawer initialRouteName="Home"
        screenOptions={{
          headerBackground: () => <GradientHeader />,
        }}
      >
        <Drawer.Screen
          name="home"
          options={{
            drawerLabel: "Home",
            title: "Home",
          }}
        />
        <Drawer.Screen
          name="products"
          options={{
            drawerLabel: "Produtos",
            title: "Produtos",
            headerBackground: () => <GradientHeader />,
          }}
        />
        <Drawer.Screen
          name="units"
          options={{
            drawerLabel: "Unidades",
            title: "Unidades",
            headerBackground: () => <GradientHeader />,
          }}
        />
        <Drawer.Screen
          name="groups"
          options={{
            drawerLabel: "Grupos",
            title: "Grupos",
            headerBackground: () => <GradientHeader />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  HeaderStyles: {
    color: 'white'
  }
})
