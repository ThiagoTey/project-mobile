import { images } from "@/constants";
import colors from "@/constants/colors";
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
import { useState } from "react";
import { ActivityIndicator, Image, Modal, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomDrawerContent = (props: any) => {
  const { bottom } = useSafeAreaInsets();

  const [isSyncing, setIsSyncing] = useState(false);
  const productDb = useProductDatabase();
  const unitDb = useUnitDatabase();
  const groupDb = useGroupDatabase();
  const { triggerRefresh } = useRefresh();

  const synchronizeData = async () => {
    setIsSyncing(true);
    try {
      // await synchronizeAll();
      await productDb.synchronizeAllProducts();
      await unitDb.synchronizeAllUnits();
      await groupDb.synchronizeAllGroups();
    } catch (error) {
      console.log(error);
    } finally {
      triggerRefresh();
      setIsSyncing(false);
    }
  };

  return (
    <View style={{ flex: 1, height: "100%" }}>
      {/* Modal que só aparece se estiver sincronizando */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isSyncing}
        onRequestClose={() => {}}
        style={{ width: 500, height: 500 }}
      >
        <View className="flex-1 justify-center items-center bg-black/20">
          <View className="bg-white w-[200px] h-[100px] items-center justify-center rounded-lg">
            <ActivityIndicator size="large" color={colors.blue} />
            <Text>Sincronizando...</Text>
          </View>
        </View>
      </Modal>
      {/* Custom Drawer */}
      <DrawerContentScrollView {...props}>
        <View className="border-b-slate-100 pl-4 pt-6 border-b-2">
          <Image
            className="w-[60px]"
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
          label="Configurações"
          onPress={() => router.navigate({ pathname: "/config" })}
        />
        <DrawerItem label="Entre em contato" onPress={() => {}} />
        <DrawerItem label="Deslogar" onPress={() => {}} />
        <DrawerItem label="Sincronizar" onPress={synchronizeData} />
      </View>
    </View>
  );
};

export default CustomDrawerContent;
