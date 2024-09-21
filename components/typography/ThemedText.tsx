import { Text, StyleSheet } from "react-native";
import { TextProps } from "react-native";
import React from "react";

const ThemedText = ({ ...props }: TextProps) => {
  return (
    <Text {...props} style={[styles.themedText, props.style]}>
      {props.children}
    </Text>
  );
};

export default ThemedText;

const styles = StyleSheet.create({
  themedText: {
    fontFamily: "Inter-Regular",
  },
});
