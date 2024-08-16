import { Text, StyleSheet } from "react-native";
import { TextInputProps } from "react-native";
import React from "react";

const ThemedText = ({ ...props }: TextInputProps) => {
  return <Text style={[props.style, styles.themedText]}>{props.children}</Text>;
};
export default ThemedText;

const styles = StyleSheet.create({
  themedText: {
    fontFamily: "Inter-Regular",
  },
});
