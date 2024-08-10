import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import PieChartCustom from "@/components/PieChart";

const Container = ({ children }: { children: any }) => {
  return (
    <View className=" border-gray-300 border p-2 rounded-lg">{children}</View>
  );
};

const Home = () => {
  const now = new Date();
  const [initialDate, setInitialDate] = useState(
    new Date(now.getFullYear(), now.getMonth(), 1)
  );
  const [finalDate, setFinalDate] = useState(
    new Date(now.getFullYear(), now.getMonth() + 1, 0)
  );
  const [showInitialDate, setShowInitialDate] = useState(false);
  const [showFinalDate, setShowFinalDate] = useState(false);

  const formattedInitDate = initialDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedFinalDate = finalDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const onInitialDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShowInitialDate(false);
    setInitialDate(currentDate);
  };

  const onFinalDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShowFinalDate(false);
    setFinalDate(currentDate);
  };



  return (
    <SafeAreaView style={{ gap: 12 }} className="p-4 pt-0 mt-0">
      {showInitialDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={initialDate}
          is24Hour={true}
          onChange={onInitialDateChange}
        />
      )}
      {showFinalDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={finalDate}
          is24Hour={true}
          onChange={onFinalDateChange}
        />
      )}
      {/* Filtros */}
      <Container>
        <View className="flex-row gap-2 justify-end items-center">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => setShowInitialDate(true)}>
              <MaterialIcons name="date-range" size={24} color="gray" />
            </TouchableOpacity>
            <Text>{formattedInitDate}</Text>
          </View>
          <Text>Até</Text>
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => setShowFinalDate(true)}>
              <MaterialIcons name="date-range" size={24} color="gray" />
            </TouchableOpacity>
            <Text>{formattedFinalDate}</Text>
          </View>
        </View>
      </Container>
      {/* Vendas Por Mês */}
      <Container>
        <Text>Vendas Por vendedor</Text>
        <PieChartCustom />
      </Container>
      {/* Vendas Por Mês */}
      <Container>
        <Text>Vendas Por Mês</Text>
      </Container>
    </SafeAreaView>
  );
};

export default Home;
