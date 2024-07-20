import { images } from "@/constants";
import { fetchAndStoreAllData } from "@/lib/api";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomDrawerContent = (props: any) => {
  const { top, bottom } = useSafeAreaInsets();

  const synchronizeData = () => {
    fetchAndStoreAllData();
  }

  return (
    <View style={{ flex: 1, height: "100%" }}>
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
        <DrawerItem label="Configurações" onPress={() => {}} />
        <DrawerItem label="Entre em contato" onPress={() => {}} />
        <DrawerItem label="Deslogar" onPress={() => {}} />
        <DrawerItem label="Sincronizar" onPress={synchronizeData} />
      </View>
    </View>
  );
};

export default CustomDrawerContent;
