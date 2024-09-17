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
      entering={FadeInDown.delay(index * 150)}
      exiting={FadeInDown}
      className={"pt-3"}
    >
      <View className="flex-row justify-between px-4 py-1">
        <View className="flex-row items-center gap-2">
          <View
            className="rounded-full w-2 h-2"
            style={{ backgroundColor: item.color }}
          />
          <ThemedText className="text-base">{item.seller}</ThemedText>
        </View>
        <ThemedText className="font-ilight">R${item.value}</ThemedText>
        <ThemedText className="font-imedium">{item.percentage}%</ThemedText>
      </View>
      {/* Percentage view */}
      <View className="bg-slate-200 rounded-md">
        <View style={{height: 10, backgroundColor: item.color, borderRadius: 6, width: `${item.percentage}%` }}/>
      </View>
    </Animated.View>
  );
};

export default RenderItem;
