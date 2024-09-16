import { View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from '@expo/vector-icons/AntDesign';
import ThemedText from "@/components/typography/ThemedText";
import Colors from "@/constants/Colors";

const DashboardSummary = () => {
  return (
    <View className="gap-y-4 px-3">
      {/* Receber */}
      <View className="flex-row w-full justify-between">
        <View className="flex-row gap-2">
          <Feather name="trending-up" size={40} color={Colors.green} />
          <View>
            <ThemedText className="text-lg font-imedium">A Receber</ThemedText>
            <ThemedText className="text-xs">Hoje</ThemedText>
          </View>
        </View>
        <ThemedText className="font-isemibold text-xl">R$1,230.00</ThemedText>
      </View>

      {/* Pagar */}
      <View className="flex-row w-full justify-between">
        <View className="flex-row gap-2">
          <Feather name="trending-down" size={40} color={Colors.yellow} />
          <View>
            <ThemedText className="text-lg font-imedium">A Pagar</ThemedText>
            <ThemedText className="text-xs">Hoje</ThemedText>
          </View>
        </View>
        <ThemedText className="font-isemibold text-xl">R$500.21</ThemedText>
      </View>

      {/* Inverntário */}
      <View className="flex-row w-full justify-between">
        <View className="flex-row gap-2">
          <AntDesign name="inbox" size={40} color={Colors.blue} />
          <View>
            <ThemedText className="text-lg font-imedium">Estoque Atual</ThemedText>
            <ThemedText className="text-xs">Inventário de estoque</ThemedText>
          </View>
        </View>
        <ThemedText className="font-isemibold text-xl">R$125,230.01</ThemedText>
      </View>
    </View>
  );
};

export default DashboardSummary;
