import { router } from "expo-router";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import ProductImage from "./ProductImage";
import ThemedText from "@/components/typography/ThemedText";
import React, { memo } from "react";

interface Props {
  id: number;
  codeInternal: number;
  description: string;
  qtde: string;
  price: string;
  index: number;
  reference: string | null;
  sortBy: string | undefined;
}

const ProductComponent = ({
  id,
  description,
  qtde,
  price,
  codeInternal,
  index,
  reference,
  sortBy
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
    <TouchableOpacity onPress={onPress}
      style={styles.container}
      className={`${index % 2 != 0 && `bg-neutral-100`} border-b-[1px] border-neutral-200`}>
      <ProductImage
        description={description}
        url=""
        customStyles="w-[45px] h-[45px] rounded"
      />
      <View className="flex-1">
        <View className="flex-row justify-between">
          <ThemedText>{codeInternal}</ThemedText>
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
        </View>

        {
          sortBy === 'reference' && (
            <ThemedText className="font-ilight">Ref: {reference}</ThemedText>
          )
        }
        <ThemedText className="font-isemibold">{description}</ThemedText>

        <ThemedText
          className="text-emerald-600"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {formattedPrice}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    rowGap: 24,
    paddingBottom: 8,
    paddingHorizontal: 22
  }
})

export default React.memo(ProductComponent, (prevProps, nextProps) => {
  return (
    prevProps.id === nextProps.id &&
    prevProps.price === nextProps.price &&
    prevProps.qtde === nextProps.qtde &&
    prevProps.sortBy === nextProps.qtde
  );
});
