import { Link, Redirect, router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

interface ProductComponentProps {
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
}: ProductComponentProps) => {

  const onPress = () => {
    router.navigate({pathname: '/product/[id]', params: {id: id}})
    // <Redirect href={{
    //   pathname: "/product/[id]",
    //   params: { id: id },
    // }}/>
  }

  return (
    // <Link
    //   href={{
    //     pathname: "/product/[id]",
    //     params: { id: id },
    //   }}
    //   className="pb-2 mb-2 border-b-2 border-gray-200 flex-row gap-2 px-2"
    // >
      <TouchableOpacity onPress={onPress} className="pb-2 mb-2 border-b-2 border-gray-200 flex-row gap-2 px-2">
        <View className="w-[45px] h-[45px] justify-center items-center bg-slate-200">
          <Text>Ab</Text>
        </View>
        <View className="w-[220px]">
          <Text>{codeInternal}</Text>
          <Text className="mt-1">{description}</Text>
        </View>
        <View>
          <Text>Qtde {qtde}</Text>
          <Text className="mt-1">{price}</Text>
        </View>
      </TouchableOpacity>
      // </Link>
  );
};

export default ProductComponent;
