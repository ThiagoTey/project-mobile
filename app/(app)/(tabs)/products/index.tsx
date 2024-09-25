import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";

import { ProductInterface } from "@/types";
import ProductComponent from "@/components/products/ProductComponent";

import { ActivityIndicator, View } from "react-native";
import { useProductDatabase } from "@/database/useProductDatabase";
import { router, useLocalSearchParams, useRootNavigationState } from "expo-router";
import { useRefresh } from "@/context/RefreshContext";
import ThemedText from "@/components/typography/ThemedText";
import Button from "@/components/form/Button";
import Colors from "@/constants/Colors";

const Products = () => {
  const useProductDb = useProductDatabase();
  const [productData, setProductData] = useState<ProductInterface[]>([]);
  const params = useLocalSearchParams<{
    query?: string;
    queryId?: string;
    reference?: string;
    sortBy?: string;
    sortOrder: string;
  }>();
  const { refresh } = useRefresh();
  const [limit, setLimit] = useState(50);
  const [isLoading, setIsloading] = useState(true);

  const navigationState = useRootNavigationState();

  if (!navigationState?.key) return;
  
  useEffect(() => {
    router.setParams({
      sortBy: "description",
      sortOrder: "ASC",
    });
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      console.log(params.query)
      setIsloading(true);
      setLimit(50);
      const data = await useProductDb.searchByQuery(
        params.query,
        Number(params.queryId),
        params.reference,
        params.sortOrder,
        params.sortBy,
        limit
      );
      setProductData(data);
      setIsloading(false);
    };
    loadProducts();
  }, [params.query, params.queryId, params.sortOrder, params.sortBy, refresh]);

  const handleShowMore = async () => {
    setIsloading(true)
    const newLimit = limit + 50;
    setLimit(newLimit);
    const data = await useProductDb.searchByQuery(
      params.query,
      Number(params.queryId),
      params.reference,
      params.sortOrder,
      params.sortBy,
      newLimit
    );
    setProductData(data);
    setIsloading(false)
  };
  

  return (
    <SafeAreaView>
      {isLoading && !productData.length ? (
        <ActivityIndicator size="large" color={Colors.blue} />
      ) : (
        <FlatList
          data={productData}
          
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={() => (
            <View className="mt-6 pb-6 justify-center items-center">
              {
                isLoading && (
                  <ActivityIndicator size="large" color={Colors.blue} />
                )
              }
              {productData.length >= limit && (
                <Button title="Mostrar mais" handlePress={handleShowMore} />
              )}
            </View>
          )}
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
              <ThemedText>Sem produtos disponiveis</ThemedText>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Products;
