import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import React, { useState } from "react";

import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButtom from "@/components/Button";
import Checkbox from "expo-checkbox";
import colors from "@/constants/Colors";
import { Link, router } from "expo-router";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  const singUp = () => {
    router.replace("home");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, width: "100%" }}>
          <View className="w-full h-full px-12 mt-16 items-center">
            <Image
              source={images.logo_title_bellow}
              className="w-[100px] h-[100px]"
              resizeMode="contain"
            />
            <Text className="text-3xl font-isemibold mt-4">Bem-Vindo</Text>
            <Text className="text-lg font-ilight mt-2">
              Informe seu usuário e senha
            </Text>

            <FormField
              handleChangeText={(e) => setForm({ ...form, email: e })}
              title="Email"
              value={form.email}
              keyboardType="email-address"
              otherStyles="mt-6"
            />

            <FormField
              handleChangeText={(e) => setForm({ ...form, password: e })}
              title="Senha"
              value={form.password}
              otherStyles="mt-4"
            />

            <View className="w-full flex-row gap-1 mt-4">
              <Checkbox
                value={rememberMe}
                onValueChange={setRememberMe}
                color={rememberMe ? colors.blue : undefined}
              />
              <Text>Lembre-se de mim</Text>
            </View>

            <View className="w-full flex-row mt-5">
              <Text>Não é Cadastrado? </Text>
              <Link href="/" className="text-blue">
                Entrar em Contato
              </Link>
            </View>

            <CustomButtom
              title="Acessar"
              handlePress={singUp}
              containerStyles="w-full mt-10"
            />
          </View>

          <Image
            source={images.login_image}
            className="absolute -bottom-9 self-center w-[300px]"
            resizeMode="contain"
          />
          <Image
            source={images.login_image_below}
            className="absolute -bottom-5"
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
