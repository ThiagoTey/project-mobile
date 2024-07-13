import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import React, { useState } from "react";

import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButtom from "@/components/CustomButtom";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  return (
    <SafeAreaView className="flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 w-screen h-screen">
          <View className="w-full h-full px-12 mt-12 items-center">
            <Image
              source={images.logo_title_bellow}
              className="w-[100px] h-[100px]"
              resizeMode="contain"
            />
            <Text className="text-3xl font-isemibold mt-6">Bem-Vindo</Text>
            <Text className="text-lg font-ilight mt-2">
              Informe seu usuário e senha
            </Text>

            <FormField
              handleChangeText={(e) => setForm({ ...form, email: e })}
              title="Email"
              value={form.email}
              keyboardType="email-address"
              otherStyles="mt-8"
            />

            <FormField
              handleChangeText={(e) => setForm({ ...form, password: e })}
              title="Senha"
              value={form.password}
              otherStyles="mt-6"
            />

            <CustomButtom
              title="Acessar"
              handlePress={() => {}}
              containerStyles="w-full mt-16"
            />
          </View>

          <Image
            source={images.login_image}
            className="absolute bottom-0 self-center w-[300px]"
            resizeMode="contain"
          />

          <Image
            source={images.login_image_below}
            className="absolute -bottom-2"
            resizeMode="contain"
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
