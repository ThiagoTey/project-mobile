import colors from "@/constants/Colors";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  MaterialCommunityIcons,
  FontAwesome6,
  AntDesign,
} from "@expo/vector-icons";
import CustomDrawerContent from "@/components/charts/CustomDrawerContent";
import Header from "@/components/navigation/Header";

export default function TabLayout() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawerContent}
        initialRouteName="home/index"
        screenOptions={{
          headerStyle: {backgroundColor: colors.blue},
          headerTitleStyle: {
            color: "white",
          },
          headerTintColor: "white",
          drawerLabelStyle: { marginLeft: -20 },
        }}
      >
        <Drawer.Screen
          name="home/index"
          options={{
            drawerItemStyle: { display: "none"},
            drawerLabel: "Home",
            title: "Home",
            // header: () => <Header/>,
            drawerIcon: ({ size, color }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="products/index"
          options={{
            drawerLabel: "Produtos",
            title: "Produtos",
            header: (props) => <Header {...props} title="Produtos" />,
            drawerIcon: ({ size, color }) => (
              <AntDesign name="inbox" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="units/index"
          options={{
            drawerItemStyle: { display: "none"},
            drawerLabel: "Unidades",
            title: "Unidades",
            drawerIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="inbox" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="groups/index"
          options={{
            drawerItemStyle: { display: "none"},
            drawerLabel: "Grupos",
            title: "Grupos",
            drawerIcon: ({ size, color }) => (
              <FontAwesome6 name="layer-group" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
