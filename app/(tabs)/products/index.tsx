import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";

import { ProductInterface } from "@/types";
import ProductComponent from "@/components/ProductComponent";

import { Text, View } from "react-native";
import { useProductDatabase } from "@/database/useProductDatabase";
import { useLocalSearchParams } from "expo-router";

const Products = () => {
  const useProductDb = useProductDatabase();
  const [productData, setProductData] = useState<ProductInterface[]>([]);
  const params = useLocalSearchParams<{ query?: string }>();

  useEffect(() => {
    const loadProducts = async () => {
      const data = await useProductDb.searchByDescription(params.query)
      setProductData(data)
    }
    loadProducts();
  }, [params])

  return (
    <SafeAreaView>
      <FlatList
        data={productData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductComponent
            description={item.description}
            codeInternal={item.code_internal}
            id={item.id}
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
