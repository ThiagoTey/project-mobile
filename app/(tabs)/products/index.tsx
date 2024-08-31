import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";

import { ProductInterface } from "@/types";
import ProductComponent from "@/components/products/ProductComponent";

import { Text, View } from "react-native";
import { useProductDatabase } from "@/database/useProductDatabase";
import { router, useLocalSearchParams } from "expo-router";
import { useRefresh } from "@/context/RefreshContext";

const Products = () => {
  const useProductDb = useProductDatabase();
  const [productData, setProductData] = useState<ProductInterface[]>([]);
  const params = useLocalSearchParams<{
    query?: string;
    queryId?: string;
    sortBy?: string;
    sortOrder: string;
  }>();
  const { refresh } = useRefresh();

  useEffect(() => {
    router.setParams({
      sortBy: "description",
      sortOrder: "ASC"
    });
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await useProductDb.searchByQuery(
        params.query,
        Number(params.queryId),
        params.sortOrder,
        params.sortBy,
      );
      setProductData(data);
    };
    loadProducts();
  }, [JSON.stringify(params), refresh]);

  return (
    <SafeAreaView>
      <FlatList
        data={productData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <ProductComponent
            description={item.description}
            codeInternal={item.code_internal}
            id={item.id}
            price={item.price_cash}
            qtde={item.quantity}
            index={index}
          />
        )}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center">
            <Text>Sem produtos disponiveis</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Products;
