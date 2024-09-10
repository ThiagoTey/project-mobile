import {
  StyleSheet,
  SafeAreaView,
  Alert,
  ToastAndroid,
  Modal,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import ConfigComponent from "@/components/config/ConfigComponent";
import { useDbOperations } from "@/database/dbOperations";
import { useRefresh } from "@/context/RefreshContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import Colors from "@/constants/Colors";
import ThemedText from "@/components/typography/ThemedText";

type Props = {};

const DataManagement = (props: Props) => {
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
            <ActivityIndicator size="large" color={Colors.blue} />
            <ThemedText>Deletando</ThemedText>
          </View>
        </View>
      </Modal>
      <View className="px-6 mt-4" style={{ rowGap: 12 }}>
        <ConfigComponent
          Onpress={handleDeleteDb}
          Icon={AntDesign}
          iconName="delete"
          title="Exclusão banco de dados local"
        />
      </View>
    </SafeAreaView>
  );
};

export default DataManagement;
