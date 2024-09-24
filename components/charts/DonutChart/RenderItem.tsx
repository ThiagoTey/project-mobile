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
      className={"pt-3 "}
    >
      <View className="flex-row justify-between px-4 py-1">
        <View className="flex-row items-center gap-2">
          {/* <View
            className="rounded-full w-2 h-2"
            style={{ backgroundColor: item.color }}
          /> */}
          <ThemedText className="text-sm">{item.seller}</ThemedText>
        </View>
        <View className="flex-row gap-x-4">
          <ThemedText className="font-ilight">R${item.value}</ThemedText>
          <View className="rounded-md px-2"
            style={{ backgroundColor: item.color }}>
            <ThemedText className="font-imedium text-white">{item.percentage}%</ThemedText>  
          </View>

        </View>
      </View>
      {/* Percentage view */}
      {/* <View className="bg-slate-200 rounded-md">
        <View style={{height: 8, backgroundColor: item.color, borderRadius: 6, width: `${item.percentage}%` }}/>
      </View> */}
    </Animated.View>
  );
};

export default RenderItem;
