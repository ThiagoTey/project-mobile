import { router } from "expo-router";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import ProductImage from "./ProductImage";
import ThemedText from "@/components/typography/ThemedText";
import React from "react";

interface Props {
  id: number;
  codeInternal: number;
  description: string;
  qtde: string;
  price: string;
  index: number;
}

const ProductComponent = ({
  id,
  description,
  qtde,
  price,
  codeInternal,
  index,
}: Props) => {
  const onPress = () => {
    router.navigate({ pathname: "/product/[id]", params: { id: id } });
  };

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const formattedPrice = formatter.format(Number(price));

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`items-center justify-between flex-row gap-x-2 px-6 pb-2 py-2 ${
        index % 2 != 0 && `bg-gray-200/60`
      }`}
    >
      <View className="flex-row gap-x-2 items-center w-[70%]">
        <ProductImage
          description={description}
          url=""
          customStyles="w-[45px] h-[45px] bg-slate-200 rounded"
        />

        <View className="min-w-[215px] max-w-[64%]">
          <ThemedText>{codeInternal}</ThemedText>
          <ThemedText className="mt-1 font-isemibold">{description}</ThemedText>
        </View>
      </View>
      <View className="w-[20%]">
        <View className="flex-row">
          <ThemedText className="text-gray-500 font-ilight">Qtd: </ThemedText>
          <ThemedText
            className="max-w-[50px]"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {qtde ? qtde : 0}
          </ThemedText>
        </View>

        <ThemedText
          className="mt-1 text-emerald-600 max-w-[100px]"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {formattedPrice}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ProductComponent, (prevProps, nextProps) => {
  return (
    prevProps.id === nextProps.id &&
    prevProps.price === nextProps.price &&
    prevProps.qtde === nextProps.qtde
  );
});
