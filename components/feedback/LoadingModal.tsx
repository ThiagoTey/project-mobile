import { View, Text, Modal, ActivityIndicator, ModalProps } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

const LoadingModal = ({
  isLoading,
  description,
  ...props
}: {
  isLoading: boolean;
  description: string;
  props?: ModalProps;
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isLoading}
      onRequestClose={() => {}}
      style={{ width: 500, height: 500 }}
      {...props}
    >
      <View className="flex-1 justify-center items-center bg-black/20">
        <View className="bg-white w-[200px] h-[100px] items-center justify-center rounded-lg">
          <ActivityIndicator size="large" color={Colors.blue} />
          <Text>{description}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;
