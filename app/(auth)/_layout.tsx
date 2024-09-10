import React from "react";
import { Stack } from "expo-router";
import Colors from "@/constants/Colors";

const AuthLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          statusBarColor: Colors.blue,
          headerShown: false,
          headerStyle: { backgroundColor: Colors.blue },
        }}
      />
    </>
  );
};

export default AuthLayout;
