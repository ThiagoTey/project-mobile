import Checkbox from "expo-checkbox";
import { router, useLocalSearchParams } from "expo-router";
import React, { Dispatch, useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const DRAWER_WIDTH = 320;

const Sidebar = ({
  filterOpen,
  setFilterOpen,
}: {
  filterOpen: boolean;
  setFilterOpen: Dispatch<boolean>;
}) => {
  const translateX = useSharedValue(width);
  const params = useLocalSearchParams<{ order?: string; ascDesc: string }>();

  useEffect(() => {
    router.setParams({ order: "description" });
    router.setParams({ ascDesc: "ASC" });
  }, []);

  const handleCheckBoxChange = ({
    type,
    value,
  }: {
    type: "order" | "ascDesc";
    value: "description" | "id" | "ASC" | "DESC";
  }) => {
    router.setParams({ [type]: value });
  };

  const [orderDescricao, setOrderDescricao] = useState(false);
  const [orderId, setOrder] = useState(false);
  const [isAsc, setisAsc] = useState(false);
  const [isDesc, setIsDesc] = useState(false);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const openDrawer = () => {
    translateX.value = withSpring(width - DRAWER_WIDTH);
    setFilterOpen(true);
  };
  const closeDrawer = () => {
    translateX.value = withSpring(width);
    setFilterOpen(false);
  };

  // Adicionar Gesture depois
  const handleGesture = Gesture.Pan();
  // .onBegin(() => {
  //   // Lógica de início do gesto
  // })
  // .onChange((event) => {
  //   // Lógica de atualização do gesto
  //   translateX.value = event.translationX;
  // })
  // .onEnd((event) => {
  //   // Lógica de finalização do gesto
  //   if (event.translationX < -50) {
  //     closeDrawer();
  //   } else {
  //     openDrawer();
  //   }
  // });

  useEffect(() => {
    if (filterOpen) {
      openDrawer();
    } else {
      closeDrawer();
    }
  }, [filterOpen]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <TouchableWithoutFeedback onPress={() => (filterOpen ? closeDrawer() : null)}>
        a
      </TouchableWithoutFeedback> */}
      <View style={{ flex: 1 }}>
        <GestureDetector gesture={handleGesture}>
          {/* Drawer aberto */}
          <Animated.View
            className="h-screen"
            style={[styles.drawer, animatedStyles]}
          >
            {/* Qual coluna vai ser agrupada */}
            <Text>Agrupar Por</Text>
            <View className="flex-row">
              <Checkbox
                onValueChange={() =>
                  handleCheckBoxChange({ type: "order", value: "description" })
                }
                value={params.order === "description"}
              />
              <Text>Descrição</Text>
            </View>
            <View className="flex-row">
              <Checkbox
                onValueChange={() =>
                  handleCheckBoxChange({ type: "order", value: "id" })
                }
                value={params.order === "id"}
              />
              <Text>Código</Text>
            </View>

            {/* Decrecente ou crescente */}
            <Text>Ordem</Text>
            <View className="flex-row">
              <Checkbox
                onValueChange={() =>
                  handleCheckBoxChange({ type: "ascDesc", value: "ASC" })
                }
                value={params.ascDesc === "ASC"}
              />
              <Text>Crescente</Text>
            </View>
            <View className="flex-row">
              <Checkbox
                onValueChange={() =>
                  handleCheckBoxChange({ type: "ascDesc", value: "DESC" })
                }
                value={params.ascDesc === "DESC"}
              />
              <Text>Decrecente</Text>
            </View>
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: "#fff",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default Sidebar;
