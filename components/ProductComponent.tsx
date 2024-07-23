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

  return (
    <TouchableOpacity
      onPress={onPress}
      className="border-b-2 border-gray-200 items-center flex-row gap-2 px-4 pb-2 my-2"
    >
        <ProductImage
          description={description}
          url=""
          customStyles="w-[45px] h-[45px] bg-slate-200"
        />

      <View className="w-[220px]">
        <Text>{codeInternal}</Text>
        <Text className="mt-1 font-ibold">{description}</Text>
      </View>
      <View>
        <Text>Qtde {qtde}</Text>
        <Text className="mt-1 text-emerald-600">R$ {price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductComponent;
