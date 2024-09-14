import { View, Text } from "react-native";
import React from "react";
import ProductImage from "@/components/products/ProductImage";

type Props = {
  description: string;
  id: number;
  weigh?: boolean | null;
  abbreviation: string;
};

const UnitComponent = ({
  description,
  abbreviation,
  id,
  weigh,
}: Props) => {
  return (
    <View className="border-b-2 border-b-zinc-200 items-center flex-row gap-2 px-4 pb-2 my-2 justify-between">
      <View className="flex-row items-center">
        <ProductImage
          description={abbreviation}
          customStyles="w-[50px] h-[50px]  bg-slate-200"
        />
        <Text className="font-ibold ml-2">{description}</Text>
      </View>
      
      <View className="flex-row self">
        <Text>Pesável: </Text>
        <Text className="font-ibold">{weigh ? `Sim` : `Não`}</Text>
      </View>
    </View>
  );
};

export default UnitComponent;
