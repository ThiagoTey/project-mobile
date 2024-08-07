import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import ProductImage from "./ProductImage";

interface Props {
  id: number;
  codeInternal: number;
  description: string;
  qtde: string;
  price: string;
}

const ProductComponent = ({
  id,
  description,
  qtde,
  price,
  codeInternal,
}: Props) => {
  const onPress = () => {
    router.navigate({ pathname: "/product/[id]", params: { id: id } });
  };

  const formatter  = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  const formattedPrice = formatter.format(Number(price));

  return (
    <TouchableOpacity
      onPress={onPress}
      className="border-b-2 border-gray-200 items-center flex-row gap-x-2 px-6 pb-2 my-2"
    >
        <ProductImage
          description={description}
          url=""
          customStyles="w-[45px] h-[45px] bg-slate-200"
        />

      <View className="w-[210px]">
        <Text>{codeInternal}</Text>
        <Text className="mt-1 font-ibold">{description}</Text>
      </View>
      <View>
        <Text><Text className="text-gray-500">Qtde:</Text> {qtde ? qtde : 0}</Text>
        <Text className="mt-1 text-emerald-600">{formattedPrice}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductComponent;
