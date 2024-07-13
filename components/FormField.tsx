import {
  View,
  Text,
  TextInput,
} from "react-native";
import React, { Dispatch, useState } from "react";

interface FormFieldProps {
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
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text>{title}</Text>
      <View className="border-2 border-gray-200 w-full h-[50px] px-4 rounded-2xl focus:border-gray-400 items-center flex-row">
        <TextInput
          className="flex-1 font-imedium text-base"
          value={value}
          placeholder={placeHolder}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Senha" && !showPassword}
        />
      </View>
    </View>
  );
};

export default FormField;
