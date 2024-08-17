import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { Dispatch, useState } from "react";
import { icons } from "@/constants";
import ThemedText from "./ThemedText";

interface Props {
  title: string;
  value: string;
  placeHolder?: string;
  handleChangeText: Dispatch<string>;
  otherStyles?: string;
  keyboardType?: string;
}

const FormField = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  keyboardType,
  placeHolder = "",
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <ThemedText>{title}</ThemedText>
      <View className="border-2 border-gray-200 w-full h-[50px] px-4 rounded-2xl focus:border-gray-400 items-center flex-row">
        <TextInput
          className="flex-1 font-imedium text-base"
          value={value}
          placeholder={placeHolder}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Senha" && !showPassword}
        />
                {title === 'Senha' && (
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <Image 
                          source={!showPassword ? icons.eye : icons.eye_hide}
                          className="w-4 h-4"
                          resizeMode="contain"
                      />
                  </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
