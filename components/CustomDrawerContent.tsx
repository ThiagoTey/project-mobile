import { images } from "@/constants";
import colors from "@/constants/Colors";
import { useRefresh } from "@/context/RefreshContext";
import { useGroupDatabase } from "@/database/useGroupDatabse";
import { useProductDatabase } from "@/database/useProductDatabase";
import { useUnitDatabase } from "@/database/useUnitDatabase";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Modal,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { synchronizeAll, useDbOperations } from "@/database/dbOperations";
import { useAuth } from "@/context/AuthContext";
import LoadingModal from "./LoadingModal";

const CustomDrawerContent = (props: any) => {
  const { logout } = useAuth();
  const { bottom } = useSafeAreaInsets();

  const [isSyncing, setIsSyncing] = useState(false);
  const [lastAsyncDate, setlastAsyncDate] = useState("");
  const [lastAsyncTime, setlastAsyncTime] = useState("");
  const productDb = useProductDatabase();
  const unitDb = useUnitDatabase();
  const groupDb = useGroupDatabase();
  const dbOperation = useDbOperations();
  const { triggerRefresh, refresh } = useRefresh();

  useEffect(() => {
    const getLastAsyncDate = async () => {
      try {
        const response = await dbOperation.getLastSycndate();
        if (response) {
          const date = new Date(response.last_sync);
          const formattedDate = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
          const formattedTime = date.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // Formato 24h
          });
          setlastAsyncDate(formattedDate);
          setlastAsyncTime(formattedTime);
        }
      } catch (error) {
        throw error;
      }
    };
    getLastAsyncDate();
  }, [refresh]);

  const wppUrl = `whatsapp://send?phone=+553732321127`;

  const openWhatsApp = () => {
    Linking.canOpenURL(wppUrl)
      .then((supported) => {
        if (!supported) {
          Alert.alert("WhatsApp não está instalado no seu dispositivo");
        } else {
          return Linking.openURL(wppUrl);
        }
      })
      .catch((err) => console.error("Erro ao tentar abrir o WhatsApp:", err));
  };

  // Função sincronizar
  const synchronizeData = async () => {
    setIsSyncing(true);
    try {
      // await synchronizeAll();
      await productDb.synchronizeAllProducts();
      await unitDb.synchronizeAllUnits();
      await groupDb.synchronizeAllGroups();
      await dbOperation.updateLastSyncDate();
      ToastAndroid.show("Sincronizado com sucesso!", ToastAndroid.SHORT);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro ao sincronizar", "Tente novamente mais tarde");
    } finally {
      triggerRefresh();
      setIsSyncing(false);
    }
  };

  return (
    <View style={{ flex: 1, height: "100%" }}>
      {/* Modal que só aparece se estiver sincronizando */}
      <LoadingModal description="Sincronizando..." isLoading={isSyncing} />
      {/* Custom Drawer */}
      <DrawerContentScrollView {...props}>
        <View className="border-b-slate-100 pl-4 pt-6 border-b-2 w-fit">
          <Image
            className="w-[60px] self-center"
            source={images.logo}
            resizeMode="contain"
          />
          <Text className="py-4 text-base">Nome da empresa</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View
        style={{
          paddingBottom: 20 + bottom,
        }}
        className="border-t-slate-100 border-t-2"
      >
        <DrawerItem
          labelStyle={{ marginLeft: -20 }}
          icon={({ size, color }) => (
            <AntDesign name="setting" size={size} color={color} />
          )}
          label="Configurações"
          onPress={() => router.navigate({ pathname: "/config" })}
        />
        <DrawerItem
          labelStyle={{ marginLeft: -20 }}
          icon={({ size, color }) => (
            <Feather name="message-circle" size={size} color={color} />
          )}
          label="Entre em contato"
          onPress={openWhatsApp}
        />
        <DrawerItem
          labelStyle={{ marginLeft: -20 }}
          icon={({ size, color }) => (
            <SimpleLineIcons name="logout" size={size} color={color} />
          )}
          label="Deslogar"
          onPress={logout}
        />
        <DrawerItem
          icon={({ size, color }) => (
            <Ionicons name="sync" size={size} color={color} />
          )}
          label={() => (
            <View className="-ml-5 flex-row justify-between items-center">
              <View>
                <Text>Sincronizar</Text>
                <Text className="text-xs">Última Sincronização : </Text>
              </View>
              <View>
                <View className="justify-center">
                  <Text className="text-xs text-gray-500">
                    {lastAsyncDate ? lastAsyncDate : "Não sincr."}
                  </Text>
                  <Text className="text-xs self-center text-gray-500">
                    {lastAsyncTime ? lastAsyncTime : ""}
                  </Text>
                </View>
              </View>
            </View>
          )}
          onPress={synchronizeData}
        />
      </View>
    </View>
  );
};

export default CustomDrawerContent;
