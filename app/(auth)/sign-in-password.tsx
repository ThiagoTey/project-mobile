import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { Link, router } from "expo-router";
import { Picker } from "@react-native-picker/picker";

import HomeSvg from "@/components/homeSvg";
import ThemedText from "@/components/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButtom from "@/components/Button";
import FormField from "@/components/FormField";
import Checkbox from "expo-checkbox";
import Colors from "@/constants/Colors";

const SignInPassword = () => {
  const [companies, setCompanies] = useState([
    { id: 1, name: "teste 1" },
    { id: 2, name: "teste 2" },
  ]);
  const [selectCompany, setSelectCompany] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }
  function close() {
    pickerRef.current.blur();
  }

  const singUp = () => {
    router.navigate("sign-in-password");
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
                ref={pickerRef}
                selectedValue={selectCompany}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectCompany(itemValue)
                }
              >
                {companies.map((item) => (
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

          <View className="w-full flex-row gap-1 mt-4">
            <Checkbox
              value={rememberMe}
              onValueChange={setRememberMe}
              color={rememberMe ? Colors.blue : undefined}
            />
            <ThemedText>Lembre-se de mim</ThemedText>
          </View>
        </View>

        <View style={style.signInButtonContainer}>
          <View className="flex-row mb-4">
            <ThemedText>Não é Cadastrado? </ThemedText>
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
