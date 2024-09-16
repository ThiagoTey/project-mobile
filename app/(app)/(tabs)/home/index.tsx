import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import PieChartCustom from "@/components/charts/PieChart";
import LineChartCustom from "@/components/charts/LineChartCustom";
import BarHorizontarCustom from "@/components/charts/BarHorizontarCustom";
import BarChartCustom from "@/components/charts/BarChartCustom";
import DRE from "@/components/dashboard/DRE";
import DashboardStart from "@/components/dashboard/DashboardStart";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import DonutChart from "@/components/charts/DonutChart/DonutChart";

const Container = (props: ViewProps) => {
  return (
    <View
      style={{ overflow: "hidden", paddingTop: 12, paddingHorizontal: 12, paddingBottom: 12 }}
      className="border-gray-300 border rounded-lg"
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
        <View style={{ rowGap: 36 }} className="p-4 pt-0 mt-0">
          {/* Filtro e Inicio */}
          <Container className="items-center py-0 border-0">
            <DashboardStart />
          </Container>
          {/* Resumo financeiro */}
          <Container className="items-center py-0 border-0">
            <DashboardSummary />
          </Container>
          {/* Vendas Por Vendedor */}
          {/* <Container>
            <PieChartCustom />
          </Container> */}
          <Container>
            <DonutChart />
          </Container>
          {/* Vendas Por Mês */}
          <Container>
            <LineChartCustom />
          </Container>
          {/* Saldo das contas */}
          {/* <Container>
            <BarHorizontarCustom />
          </Container> */}
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
