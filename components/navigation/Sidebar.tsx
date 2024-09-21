import Colors from "@/constants/Colors";
import Checkbox from "expo-checkbox";
import { router, useLocalSearchParams } from "expo-router";
import React, { Dispatch, RefObject, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import ThemedText from "../typography/ThemedText";

const { width, height } = Dimensions.get("window");
const DRAWER_WIDTH = width/1.2;

const Sidebar = ({
  filterOpen,
  setFilterOpen,
}: {
  filterOpen: boolean;
  setFilterOpen: Dispatch<boolean>;
}) => {
  const translateX = useSharedValue(width);
  const opacity = useSharedValue(0);
  const params = useLocalSearchParams<{
    query?: string;
    queryId?: string;
    reference:string;
    sortBy?: string;
    sortOrder: string;
  }>();
  const [localParams, setLocalParams] = useState(params);

  const handleCheckBoxChange = ({
    type,
    value,
  }: {
    type: "sortBy" | "sortOrder";
    value: "description" | "code_internal" | "reference" | "ASC" | "DESC";
  }) => {
    router.setParams({ [type]: value });
    setLocalParams((prev) => ({ ...prev, [type]: value }));
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const outsideAnimated = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const openDrawer = () => {
    translateX.value = withTiming(width - DRAWER_WIDTH);
    opacity.value = withTiming(1);
    setFilterOpen(true);
  };
  const closeDrawer = () => {
    translateX.value = withTiming(width);
    opacity.value = withTiming(0);
    setFilterOpen(false);
  };

  useEffect(() => {
    if (filterOpen) {
      openDrawer();
    } else {
      closeDrawer();
    }
  }, [filterOpen]);

  useEffect(() => {
    router.setParams({ sortBy: "description" });
    router.setParams({ sortOrder: "ASC" });
    setLocalParams((prev) => ({ ...prev, sortBy: "description" }));
    setLocalParams((prev) => ({ ...prev, sortOrder: "ASC" }));
  }, []);

  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
          
          <View style={{ flex: 1 }}  >
        {/* <GestureDetector gesture={handleGesture}> */}
        {/* Drawer aberto */}
        <TouchableWithoutFeedback
          onPress={() => (filterOpen ? closeDrawer() : null)}
        >
          <Animated.View
            style={[
              styles.outside,
              outsideAnimated,
              { display: `${filterOpen ? "flex" : "none"}` },
            ]}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          className="h-screen"
          style={[styles.drawer, animatedStyles]}
        >
          {/* Qual coluna vai ser agrupada */}
          <ThemedText className="text-lg font-semibold">
            Pesquisar Por
          </ThemedText>
          <View className="flex-row gap-4 flex-wrap">
            {/* Pesquisa Por Descrição */}
            <View className="flex-row">
              <Checkbox
                onValueChange={() =>
                  handleCheckBoxChange({
                    type: "sortBy",
                    value: "description",
                  })
                }
                className="rounded-full"
                color={Colors.blue}
                value={localParams.sortBy === "description"}
              />
              <ThemedText className="pl-1">Descrição</ThemedText>
            </View>
            {/* Pesquisa por código */}
            <View className="flex-row">
              <Checkbox
                onValueChange={() =>
                  handleCheckBoxChange({
                    type: "sortBy",
                    value: "code_internal",
                  })
                }
                className="rounded-full"
                color={Colors.blue}
                value={localParams.sortBy === "code_internal"}
              />
              <ThemedText className="pl-1">Código</ThemedText>
            </View>
            {/* Pesquisa por Referência */}
            <View className="flex-row">
              <Checkbox
                onValueChange={() =>
                  handleCheckBoxChange({
                    type: "sortBy",
                    value: "reference",
                  })
                }
                className="rounded-full"
                color={Colors.blue}
                value={localParams.sortBy === "reference"}
              />
              <ThemedText className="pl-1">Referência</ThemedText>
            </View>

          </View>
          {/* Decrecente ou crescente */}
          <ThemedText className="ThemedText-lg font-semibold">Ordem</ThemedText>
          <View className="flex-row gap-4">
            <View className="flex-row">
              <Checkbox
                onValueChange={() =>
                  handleCheckBoxChange({ type: "sortOrder", value: "ASC" })
                }
                className="rounded-full"
                color={Colors.blue}
                value={localParams.sortOrder === "ASC"}
              />
              <ThemedText className="pl-1">Crescente</ThemedText>
            </View>

            <View className="flex-row">
              <Checkbox
                onValueChange={() =>
                  handleCheckBoxChange({ type: "sortOrder", value: "DESC" })
                }
                className="rounded-full"
                color={Colors.blue}
                value={localParams.sortOrder === "DESC"}
              />
              <ThemedText className="pl-1">Decrecente</ThemedText>
            </View>
          </View>
        </Animated.View>
        {/* </GestureDetector> */}
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
    gap: 4,
  },
  outside: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: width,
    height: height,
    backgroundColor: "#00000033",
  },
});

export default Sidebar;
