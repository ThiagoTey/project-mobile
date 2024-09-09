import Colors from "@/constants/Colors";
import Checkbox from "expo-checkbox";
import { router, useLocalSearchParams } from "expo-router";
import React, { Dispatch, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import {
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const DRAWER_WIDTH = 320;

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
    sortBy?: string;
    sortOrder: string;
  }>();
  const [localParams, setLocalParams] = useState(params);

  const handleCheckBoxChange = ({
    type,
    value,
  }: {
    type: "sortBy" | "sortOrder";
    value: "description" | "code_internal" | "ASC" | "DESC";
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
      <View style={{ flex: 1 }}>
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
          <Text className="text-lg font-semibold">Pesquisar Por</Text>
          <View className="flex-row gap-4">
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
              <Text className="pl-1">Descrição</Text>
            </View>
            <View className="flex-row">
              <Checkbox
                onValueChange={() =>
                  handleCheckBoxChange({ type: "sortBy", value: "code_internal" })
                }
                className="rounded-full"
                color={Colors.blue}
                value={localParams.sortBy === "code_internal"}
              />
              <Text className="pl-1">Código</Text>
            </View>
          </View>
          {/* Decrecente ou crescente */}
          <Text className="text-lg font-semibold">Ordem</Text>
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
              <Text className="pl-1">Crescente</Text>
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
              <Text className="pl-1">Decrecente</Text>
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
