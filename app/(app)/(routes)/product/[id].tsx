import { ProductInterface, ProductSizeInterface } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TextInputProps,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ProductImage from "@/components/products/ProductImage";
import { useProductDatabase } from "@/database/useProductDatabase";
import ThemedText from "@/components/typography/ThemedText";

const CustomText = ({
  customStyles,
  children,
}: {
  customStyles?: string;
  children: any;
}) => {
  return (
    <ThemedText className={`text-base font-imedium ${customStyles}`}>
      {children}
    </ThemedText>
  );
};

const CustomForm = (props: TextInputProps) => {
  return (
    <TextInput
      className="font-iregular text-base p-2 w-full border-b-[1px] border-gray-200 text-gray-500"
      {...props}
    />
  );
};

const Product = () => {
  const { id } = useLocalSearchParams();
  const [productData, setProductData] = useState<ProductInterface | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const useProductDb = useProductDatabase();
  const [gridData, setGridData] = useState<ProductSizeInterface[] | null>();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productId = Number(id);
        let { productResponse, gridResponse } = await useProductDb.getById(
          productId
        );
        setProductData(productResponse);

        if (gridResponse) {
          setGridData(gridResponse);
        }
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
      <View className="px-4 h-full" style={{ padding: 8 }}>
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
                <CustomText customStyles="text-xl font-ibold text-gray-700">
                  Geral
                </CustomText>

                <View style={styles.formContainer}>
                  <CustomText>Código</CustomText>
                  <CustomForm
                    editable={false}
                    value={`${productData?.code_internal ? productData?.code_internal.toString() :  'Não informado'}`}
                  />
                </View>

                <View style={styles.formContainer}>
                  <CustomText>Código de barras</CustomText>
                  <CustomForm
                    editable={false}
                    value={productData?.barcode ? productData?.barcode : "Não informado"}
                  />
                </View>

                <View style={styles.formContainer}>
                  <CustomText>Descrição</CustomText>
                  <CustomForm
                    editable={false}
                    value={productData.description ? productData.description : "Não informado"}
                  />
                </View>

                <View style={styles.formContainer}>
                  <CustomText>Quantidade</CustomText>
                  <CustomForm
                    editable={false}
                    value={productData.quantity ? productData.quantity : "Não informado"}
                  />
                </View>

                {/* <View style={styles.formContainer}>
                  <CustomText>Preço de custo</CustomText>
                  <CustomForm
                    editable={false}
                    value={`R$ ${productData.price_cost ? productData.price_cost : "Não informado"}`}
                  />
                </View> */}

                <View style={styles.formContainer}>
                  <CustomText>Preço de venda</CustomText>
                  <CustomForm
                    editable={false}
                    value={`R$ ${productData.price_cash ? productData.price_cash : "Não informado"}`}
                  />
                </View>
                
                <View style={styles.formContainer}>
                  <CustomText>Referência</CustomText>
                  <CustomForm
                    editable={false}
                    value={productData.reference ? productData.reference : "Não informado"}
                  />
                </View>

              </View>
              {/* Informações fiscais */}
              <View style={styles.infoContainer}>
                <CustomText customStyles="text-xl font-ibold text-gray-700">
                  Informações Fiscais
                </CustomText>
                <View style={styles.formContainer}>
                  <CustomText>NCM</CustomText>
                  <CustomForm
                    editable={false}
                    value={productData.ncm ? productData.ncm : "Não informado"}
                  />
                </View>

                <View style={styles.formContainer}>
                  <CustomText>CFOP</CustomText>
                  <CustomForm
                    editable={false}
                    value={productData.cfop ? productData.cfop : "Não informado"}
                  />
                </View>
                <View style={styles.formContainer}>
                  <CustomText>Origem</CustomText>
                  <CustomForm
                    editable={false}
                    value={productData.origin ? productData.origin : "Não informado"}
                  />
                </View>
                <View style={styles.formContainer}>
                  <CustomText>CST ICMS</CustomText>
                  <CustomForm
                    editable={false}
                    value={productData.cst ? productData.cst : "Não informado"}
                  />
                </View>
                <View style={styles.formContainer}>
                  <CustomText>ICMS %</CustomText>
                  <CustomForm
                    editable={false}
                    value={productData.icms_percent ? productData.icms_percent : "Não informado"}
                  />
                </View>
                <View style={styles.formContainer}>
                  <CustomText>CST PIS</CustomText>
                  <CustomForm
                    editable={false}
                    value={productData.pis_cst ? productData.pis_cst : "Não informado"}
                  />
                </View>

                <View style={styles.formContainer}>
                  <CustomText>PIS %</CustomText>
                  <CustomForm
                    editable={false}
                    value={productData.pis_percent ? productData.pis_percent : "Não informado"}
                  />
                </View>

                <View style={styles.formContainer}>
                  <CustomText>CST COFINS</CustomText>
                  <CustomForm
                    editable={false}
                    value={productData.cofins_cst ? productData.cofins_cst : "Não informado"}
                  />
                </View>

                <View style={styles.formContainer}>
                  <CustomText>COFINS %</CustomText>
                  <CustomForm
                    editable={false}
                    value={productData.cofins_percent ? productData.cofins_percent : "Não informado"}
                  />
                </View>
              </View>

              {/* Grade */}
              {gridData ? (
                <View>
                  <CustomText customStyles="text-xl font-ibold text-gray-700 pt-4 pb-2">
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
                <CustomText customStyles="text-xl font-ibold text-gray-700 pt-4 pb-2">
                  Produto sem Grade
                </CustomText>
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
    gap: 12,
    paddingTop: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
  },
  formContainer: {
    gap: 4
  }
});

export default Product;
