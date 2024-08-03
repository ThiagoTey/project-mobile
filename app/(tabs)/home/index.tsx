import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const Container = ({ children }: { children: any }) => {
  return (
    <View className=" border-gray-300 border p-2 rounded-lg">{children}</View>
  );
};

const Home = () => {

  return (
    <SafeAreaView style={{gap: 12}} className="p-4 pt-0 mt-0">
      {/* Filtros */}
      <Container>
        <View>
          <View>
            <Text>01/08/2024</Text>
          </View>
          <View>
            <Text>31/08/2024</Text>
          </View>
        </View>
      </Container>
      {/* Vendas Por Mês */}
      <Container>
        <Text>Vendas Por vendedor</Text>
      </Container>
      {/* Vendas Por Mês */}
      <Container>
        <Text>Vendas Por Mês</Text>
      </Container>
    </SafeAreaView>
  );
};

export default Home;
