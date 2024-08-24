import { View, SafeAreaView, ScrollView, Image, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { router, useRootNavigationState } from "expo-router";

import { images } from "@/constants";
import CustomButtom from "@/components/Button";
import ThemedText from "@/components/ThemedText";
import HomeSvg from "@/components/HomeSvg";
import { useAuth } from "@/context/AuthContext";

const Index = () => {

  const navigationState = useRootNavigationState()
  const {isLoggedIn, isLoading = true} = useAuth()

  useEffect(() => {
  if(isLoading || !navigationState?.key) return;
    if(isLoggedIn && !isLoading && navigationState?.key) {
      console.log("entro")
      router.replace('/(tabs)/home')
    }
  },[isLoading, navigationState?.key])


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View
          style={{
            height: 273,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ position: "absolute" }}>
            <HomeSvg />
          </View>
          <Image
            style={{ height: 100, width: 100 }}
            resizeMode="contain"
            source={images.logo_title_bellow}
          />
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ThemedText style={{ fontFamily: "Inter-Bold", fontSize: 22 }}>
            Aumentando a produtividade
          </ThemedText>
          <ThemedText style={{ fontSize: 20 }}>Reduzindo riscos</ThemedText>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            position: "absolute",
            bottom: 80,
          }}
        >
          <CustomButtom
            handlePress={() => router.navigate("/sign-in-email")}
            title="Começar"
            containerStyles="mt-16"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
