import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";

import HomeSvg from "@/components/HomeSvg";
import ThemedText from "@/components/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButtom from "@/components/Button";
import FormField from "@/components/FormField";
import { fetchCompanies } from "@/api/auth";

const SignInEmail = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);

  const singUp = () => {
    const getCompanys = async () => {
      try {
        const companiesResponse = await fetchCompanies(email.toLowerCase());

        if (!companiesResponse[0]) {
          setEmailError("Email não registrado");
        } else {
          router.push({
            pathname: "/(auth)/sign-in-password",
            params: { email: email },
          });
        }
      } catch (error) {
        Alert.alert("Erro", "Por Favor tente mais tarde");
        throw error;
      }
    };

    if (email.includes("@")) {
      getCompanys();
    } else {
      setEmailError("Por favor, insira um email válido.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <HomeSvg className="absolute" />
        <TouchableOpacity
          onPress={() => router.back()}
          style={style.gobackContainer}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
          <ThemedText className="text-white font-isemibold">Voltar</ThemedText>
        </TouchableOpacity>

        <View style={style.bodyContainer}>
          <ThemedText
            style={{ fontFamily: "Inter-Bold", fontSize: 24, marginTop: 70 }}
          >
            Bem-vindo
          </ThemedText>
          <ThemedText style={{ fontSize: 16 }}>Logue na sua conta</ThemedText>

          <FormField
            handleChangeText={(e) => setEmail(e)}
            title="Email"
            value={email}
            keyboardType="email-address"
            otherStyles="mt-6"
          />
          {emailError && (
            <ThemedText className="self-start text-red-600">
              {emailError}
            </ThemedText>
          )}
        </View>

        <View style={style.signInButtonContainer}>
          <View className="flex-row mb-4">
            <ThemedText>Não é Cadastrado?</ThemedText>
            <Link href="/" className="text-blue mb-2">
              Entrar em Contato
            </Link>
          </View>

          <CustomButtom handlePress={singUp} title="Continuar" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInEmail;

const style = StyleSheet.create({
  gobackContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },

  bodyContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 46,
  },

  signInButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    bottom: 80,
  },
});
