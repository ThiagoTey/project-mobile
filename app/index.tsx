import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import React from "react";
import { router } from "expo-router";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

import { images } from "@/constants";
import CustomButtom from "@/components/Button";
import ThemedText from "@/components/ThemedText";

const SvgVector = (props: any) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={389}
      height={273}
      fill="none"
      {...props}
    >
      <Path
        fill="url(#a)"
        d="M389 273c-37.693-69.104-50.994-164.622-113-209C216.902 21.703-1 126.5-1 80.5V0h390v273Z"
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={194}
          x2={194}
          y1={0}
          y2={273}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#1FBCFF" />
          <Stop offset={1} stopColor="#00DAB7" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

const Index = () => {
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
            <SvgVector />
          </View>
          <Image
            style={{ height: 100, width: 100 }}
            resizeMode="contain"
            source={images.logo_title_bellow}
          />
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ThemedText style={{fontFamily: "Inter-Bold", fontSize: 22}}>Aumentando a produtividade</ThemedText>
          <ThemedText>Reduzindo riscos</ThemedText>
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
            handlePress={() => router.push("/sign-in")}
            title="Começar"
            containerStyles="mt-16"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
