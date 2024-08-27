import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import PieChartCustom from "@/components/PieChart";
import LineChartCustom from "@/components/LineChartCustom";
import BarHorizontarCustom from "@/components/BarHorizontarCustom";
import BarChartCustom from "@/components/BarChartCustom";
import DRE from "@/components/DRE";
import DashboardStart from "@/components/DashboardStart";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

const Container = (props:ViewProps) => {
  return (
    <View
      style={{ overflow: "hidden" }}
      className="border-gray-300 border p-2 rounded-lg "
      {...props}
    >
      {props.children}
    </View>
  );
};

const Home = () => {

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ gap: 12 }} className="p-4 pt-0 mt-0">
          {/* Filtro e Inicio */}
          <Container className="items-center border-0">
            <DashboardStart />
          </Container>
          {/* Vendas Por Vendedor */}
          <Container>
            <Text>Vendas Por Vendedor</Text>
            <PieChartCustom />
          </Container>
          {/* Vendas Por Mês */}
          <Container>
            <LineChartCustom />
          </Container>
          {/* Saldo das contas */}
          <Container>
            <BarHorizontarCustom />
          </Container>
          {/* Fluxo de caixa */}
          <Container>
            <BarChartCustom />
          </Container>
          {/* DRE */}
          <Container>
            <DRE />
          </Container>

          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
