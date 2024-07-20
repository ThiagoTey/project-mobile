import { ProductInterface } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// import productsJson from "../../../mocks/mock-mat.json";
import ProductImage from "@/components/ProductImage";
import { getProductFromStorage } from "@/lib/api";

const CustomText = ({
  customStyles,
  children,
}: {
  customStyles?: string;
  children: any;
}) => {
  return (
    <Text className={`text-base font-iregular ${customStyles}`}>
      {children}{" "}
    </Text>
  );
};

const Product = () => {
  const { id } = useLocalSearchParams();
  const [productData, setProductData] = useState<ProductInterface>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productId = Number(id);
        let data = await getProductFromStorage(productId)
        setProductData(data);
        console.log(data)
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      loadProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!productData) {
    return (
      <View>
        <Text className="text-4xl">Produto não encontrado</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View className="px-4" style={{padding: 8}}>
      <FlatList
        data={productData.product_sizes || []}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <>
            <ProductImage
              description={productData.description}
              url=""
              customStyles="w-[120px] self-center h-[90px] bg-slate-200 rounded-md"
              textStyles="text-3xl"
            />
            {/* Informações Gerais */}
            <View style={styles.infoContainer}>
              <CustomText customStyles="text-xl text-gray-400">
                Geral
              </CustomText>
              <CustomText>Código: {productData.code_internal}</CustomText>
              <CustomText>Código de barras: {productData.barcode}</CustomText>
              <CustomText>Descrição: {productData.description}</CustomText>
              <CustomText>Quantidade: {productData.quantity}</CustomText>
              <CustomText>Preço de custo: {productData.price_cost}</CustomText>
              <CustomText>Preço de compra: {productData.price_cash}</CustomText>
              <CustomText>Referência: {productData.price_cash}</CustomText>
            </View>
            {/* Informações fiscais */}
            <View style={styles.infoContainer}>
              <CustomText customStyles="text-xl text-gray-400">
                Informações Fiscais
              </CustomText>
              <CustomText>NCM: {productData.ncm}</CustomText>
              <CustomText>CFOP: {productData.cfop}</CustomText>
              <CustomText>Origem: {productData.origin}</CustomText>
              <CustomText>CST ICMS: {productData.cst}</CustomText>
              <CustomText>ICMS %: {productData.icms_percent}</CustomText>
              <CustomText>CST PIS: {productData.pis_cst}</CustomText>
              <CustomText>PIS %: {productData.pis_percent}</CustomText>
              <CustomText>CST COFINS: {productData.cofins_cst}</CustomText>
              <CustomText>COFINS %: {productData.cofins_percent}</CustomText>
            </View>

            {/* Grade */}
            {productData.product_sizes.length ? (
              <View>
                <CustomText customStyles="text-xl text-gray-400 pt-4 pb-2">
                  Grade
                </CustomText>
                <View className="flex-row">
                  <View className="justify-center w-1/2 h-12 border-gray-500 border-[1px] pl-2">
                    <Text className="text-lg">Tamanho</Text>
                  </View>
                  <View className=" justify-center w-1/2 h-12 border-gray-500 border-[1px] border-l-0 pl-2">
                    <Text className="text-lg">Quantidade</Text>
                  </View>
                </View>
              </View>
            ) : (
              <CustomText customStyles="text-xl text-gray-400 pt-4 pb-2">Produto sem Grade</CustomText>
            )}
          </>
        }
        renderItem={({ item }) => (
          <View className="flex-row">
            <View className="justify-center w-1/2 h-9 border-gray-500 border-[1px] pl-2">
              <Text className="text-base">{item.size}</Text>
            </View>
            <View className=" justify-center w-1/2 h-9 border-gray-500 border-[1px] border-l-0 pl-2">
              <Text className="text-base">{item.quantity}</Text>
            </View>
          </View>
        )}
        // ListEmptyComponent={!productData.product_sizes && <Text>Produto sem Grade</Text>}
      />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    gap: 4,
    paddingTop: 16
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8
  },
});

export default Product;
