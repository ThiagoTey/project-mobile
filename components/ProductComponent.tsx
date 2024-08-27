import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import ProductImage from "./ProductImage";

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
      className={` items-center flex-row gap-x-2 px-6 pb-2 py-2 ${
        index % 2 != 0 && `bg-gray-200/60`
      }`}
    >
      <ProductImage
        description={description}
        url=""
        customStyles="w-[45px] h-[45px] bg-slate-200 rounded-sm"
      />

      <View className="w-[210px]">
        <Text>{codeInternal}</Text>
        <Text className="mt-1 font-ibold">{description}</Text>
      </View>
      <View>
        <View className="flex-row">
          <Text className="text-gray-500">Qtde: </Text>
          <Text>{qtde ? qtde : 0}</Text>
        </View>

        <Text className="mt-1 text-emerald-600">{formattedPrice}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductComponent;
