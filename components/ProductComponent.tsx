import { View, Text, TouchableOpacity } from "react-native";

interface ProductComponentProps {
  id: number;
  description: string;
  qtde: string;
  price: string;
}

const ProductComponent = ({
  id,
  description,
  qtde,
  price,
}: ProductComponentProps) => {

    const onPress = () => {
        
    }

  return (
    <TouchableOpacity  onPress={onPress} className="pb-2 mb-2 border-b-2 border-gray-200 flex-row gap-2 px-2">
      <View className="w-[45px] h-[45px] justify-center items-center bg-slate-200">
        <Text>Ab</Text>
      </View>
      <View className="w-[220px]">
        <Text>{id}</Text>
        <Text className="mt-1">{description}</Text>
      </View>
      <View>
        <Text>Qtde {qtde}</Text>
        <Text className="mt-1">{price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductComponent;
