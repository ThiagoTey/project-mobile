import ThemedText from "@/components/typography/ThemedText";
import { View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

interface Data {
    value: number;
    percentage: number;
    color: string;
    seller: string;
  }

const RenderItem = ({ item, index }: { item: Data; index: number }) => {
    return (
      <Animated.View
        className="flex-row justify-between px-4 py-1"
        entering={FadeInDown.delay(index * 150)}
        exiting={FadeInDown}
      >
        <View className="flex-row items-center gap-2">
          <View
            className="rounded-full w-2 h-2"
            style={{ backgroundColor: item.color }}
          />
          <ThemedText>{item.seller}</ThemedText>
        </View>
        <ThemedText className="font-imedium">{item.percentage}%</ThemedText>
      </Animated.View>
    );
  };

  export default RenderItem