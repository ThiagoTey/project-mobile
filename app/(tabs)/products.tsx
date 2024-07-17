import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";

import { ProductInterface } from "@/types";
import ProductComponent from "@/components/ProductComponent";

import productsJson from "../../mocks/mock-mat2.json";
import { Text, View } from "react-native";

const Products = () => {
  const [productData, setProductData] = useState<ProductInterface[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      setProductData(productsJson)
    }
    loadProducts();
  }, [])

  return (
    <SafeAreaView>
      <FlatList
        data={productData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductComponent
            description={item.description}
            id={item.code_internal}
            price={item.price_cash}
            qtde={item.quantity}
          />
        )}
        ListEmptyComponent={() => (
          <View>
            <Text>Sem produtos disponiveis</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Products;
