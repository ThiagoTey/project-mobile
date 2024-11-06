// import { ScrollView, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

// import LineChartCustom from "@/components/charts/LineChartCustom";
// import BarHorizontarCustom from "@/components/charts/BarHorizontarCustom";
// import BarChartCustom from "@/components/charts/BarChartCustom";
// import DRE from "@/components/dashboard/DRE";
// import DashboardStart from "@/components/dashboard/DashboardStart";
// import DashboardSummary from "@/components/dashboard/DashboardSummary";
// import DonutChart from "@/components/charts/DonutChart/DonutChart";
// import { useState } from "react";

// const Container = (props: ViewProps) => {
//   return (
//     <View
//       style={{ overflow: "hidden", paddingVertical: 20, paddingHorizontal: 16 }}
//       className="border-gray/25 border rounded-lg"
//       {...props}
//     >
//       {props.children}
//     </View>
//   );
// };

// const Home = () => {
//   const [selectedCompany, setSelectedCompany] = useState("Teste Nome");

//   return (
//     <SafeAreaView>
//       <ScrollView>
//         <View style={{ rowGap: 40 }} className="p-4 pt-0 mt-0">
//           {/* Filtro e Inicio */}
//           <Container className="items-center py-0 border-0 mt-2">
//             <DashboardStart />
//           </Container>
//           {/* Resumo financeiro */}
//           <Container className="items-center py-0 border-0">
//             <DashboardSummary />
//           </Container>
//           {/* Vendas Por Vendedor */}
//           {/* <Container>
//             <PieChartCustom />
//           </Container> */}
//           <Container>
//             <DonutChart />
//           </Container>
//           {/* Vendas Por Mês */}
//           <Container>
//             <LineChartCustom />
//           </Container>
//           {/* Fluxo de caixa */}
//           <Container>
//             <BarChartCustom />
//           </Container>
//           {/* Saldo das contas */}
//           <Container>
//             <BarHorizontarCustom />
//           </Container>
//           {/* DRE */}
//           <Container>
//             <DRE />
//           </Container>

//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Home;
