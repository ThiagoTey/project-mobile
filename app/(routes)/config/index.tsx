import {
  View,
  Text,
  Modal,
  ActivityIndicator,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/form/Button";
import { useDbOperations } from "@/database/dbOperations";
import { useRefresh } from "@/context/RefreshContext";
import colors from "@/constants/Colors";
import ConfigRoute from "@/components/config/ConfigRoute";
import AntDesign from "@expo/vector-icons/AntDesign";

const Config = () => {
  const dbOperations = useDbOperations();
  const { triggerRefresh } = useRefresh();
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteDb = async () => {
    try {
      setIsDeleting(true);
      await dbOperations.dropDatabase();
      ToastAndroid.show("Banco deletado com sucesso!", ToastAndroid.SHORT);
    } catch (error) {
      console.error("Erro ao dropar banco de dados", error);
      Alert.alert(
        "Erro ao deletar banco de dados",
        "Tente novamente mais tarde"
      );
    } finally {
      setIsDeleting(false);
      triggerRefresh();
    }
  };

  const handleDeleteDb = () => {
    Alert.alert(
      "Aviso",
      "Tem certeza que deseja deletar o banco de dados?",
      [
        {
          text: "Não",
          onPress: () => {
            return;
          },
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => deleteDb(),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView>
      {/* Modal que só aparece se estiver deletando */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isDeleting}
        onRequestClose={() => {}}
        style={{ width: 500, height: 500 }}
      >
        <View className="flex-1 justify-center items-center bg-black/20">
          <View className="bg-white w-[200px] h-[100px] items-center justify-center rounded-lg">
            <ActivityIndicator size="large" color={colors.blue} />
            <Text>Deletando</Text>
          </View>
        </View>
      </Modal>
      <View className="px-6 mt-4">
        <ConfigRoute href={"/config"} iconName="user" Icon={AntDesign} title="Usuário" />
        <View className="items-center">
          <Button
            handlePress={handleDeleteDb}
            title="Deletar banco de dados"
            containerStyles="bg-red-500"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Config;
