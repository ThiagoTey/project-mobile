import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Picker } from "@react-native-picker/picker";

import HomeSvg from "@/components/HomeSvg";
import ThemedText from "@/components/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButtom from "@/components/Button";
import FormField from "@/components/FormField";
import Checkbox from "expo-checkbox";
import Colors from "@/constants/Colors";
import { useAuth } from "@/context/AuthContext";
import LoadingModal from "@/components/LoadingModal";

const SignInPassword = () => {

  const [selectCompany, setSelectCompany] = useState<number| null>(null);
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const { login, error, isLoading, allCompanies } = useAuth();

  const { email } = useLocalSearchParams<{
    email?: string;
  }>();

  useEffect(() => {
    if(allCompanies && allCompanies.length > 0){
      setSelectCompany(allCompanies[0].id);
    }
  }, []);

  const singUp = () => {
    setPasswordError(null);
    if (!password) {
      setPasswordError("Informe Sua Senha");
    }

    if (email && password && selectCompany) {
      login(email, password, selectCompany, rememberMe);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
      <LoadingModal description="Processando dados..." isLoading={isLoading} />
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

          <View
            style={{
              marginTop: 16,
              width: "100%",
            }}
          >
            <ThemedText>Empresa</ThemedText>

            <View
              style={{
                borderColor: "#e5e7eb",
                borderWidth: 1,
                borderRadius: 16,
                marginTop: 16,
              }}
            >
              <Picker
                selectedValue={selectCompany}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectCompany(itemValue)
                }
              >
                {allCompanies && allCompanies.map((item) => (
                  <Picker.Item
                    key={item.id}
                    label={item.name}
                    value={item.id}
                  ></Picker.Item>
                ))}
              </Picker>
            </View>
          </View>

          <FormField
            handleChangeText={(e) => setPassword(e)}
            title="Senha"
            value={password}
            otherStyles="mt-6"
          />
          {passwordError && (
            <ThemedText className="self-start text-red-600">
              {passwordError}
            </ThemedText>
          )}

          <View className="w-full flex-row gap-1 mt-4">
            <Checkbox
              value={rememberMe}
              onValueChange={setRememberMe}
              color={rememberMe ? Colors.blue : undefined}
            />
            <ThemedText>Lembre-se de mim</ThemedText>
          </View>
          {error && (
            <ThemedText className="self-start text-red-600 mt-6">
              {error}
            </ThemedText>
          )}
        </View>

        <View style={style.signInButtonContainer}>
          <View className="flex-row mb-4">
            <ThemedText>Não é Cadastrado? </ThemedText>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("whatsapp://send?phone=+553732321127")
              }
            >
              <ThemedText className="text-blue mb-2">
                Entrar em Contato
              </ThemedText>
            </TouchableOpacity>
          </View>

          <CustomButtom handlePress={singUp} title="Continuar" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInPassword;

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
