import React from "react";
import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

// const GradientHeader = () => (
//   <LinearGradient
//     colors={[colors.blue, colors.green, colors.yellow]}
//     start={{ x: 0, y: 0 }}
//     end={{ x: 1, y: 1 }}
//     style={StyleSheet.absoluteFill}
//   />
// );

const AuthLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.blue },
          headerTitleStyle: {
            color: "white",
          },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="product/[id]"
          options={{
            title: "Produto",
          }}
        />
        <Stack.Screen
          name="config/index"
          options={{
            title: "Configurações",
          }}
        />
        <Stack.Screen
          name="config/dataManagement/index"
          options={{
            title: "Gestão de dados",
          }}
        />
      </Stack>
    </>
  );
};

export default AuthLayout;
