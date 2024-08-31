import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import Button from "./Button";
import { useSharedValue, withTiming } from "react-native-reanimated";

interface Data {
  value: number;
  percentage: number;
  color: string;
  seller: string;
}

export function generateRandomNumbers(n: number): number[] {
  const min = 100;
  const max = 500;
  const result: number[] = [];

  for (let i = 0; i < n; i++) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    result.push(randomNumber);
  }

  return result;
}

export function calculatePercentage(
  numbers: number[],
  total: number
): number[] {
  const percentageArray: number[] = [];

  numbers.forEach((number) => {
    const percentage = Math.round((number / total) * 100);

    percentageArray.push(percentage);
  });

  return percentageArray;
}

const RenderItem = ({item , index} : {item:Data, index:number}) => {
  return(
    <View>
      <View>
        <View className="rounded-full w-2 h-2" style={{backgroundColor: item.color}}/>
        <Text>{item.seller}</Text>
      </View>

    </View>
  )
}

const PieChart2 = () => {
  const n = 5;
  const [data, setData] = useState<Data[]>([]);
  const totalValue = useSharedValue(0);
  const decimals = useSharedValue<number[]>([]);
  const colors = ["#1FBCFF", "#00DAB7", "#FFC412"];

  const generateData = () => {
    const generateNumbers = generateRandomNumbers(n);
    const total = generateNumbers.reduce(
      (acc, currentValue) => acc + currentValue
    );
    const generatePercentages = calculatePercentage(generateNumbers, total);
    const generateDecimals = generatePercentages.map(
      (number) => Number(number.toFixed(0)) / 100
    );

    const data = generateNumbers.map((value, index) => ({
      value,
      percentage: generatePercentages[index],
      color: colors[index % colors.length],
      seller: "Vendedor " + index 
    }))

    totalValue.value = withTiming(total, {duration: 1000});
    decimals.value = [...generateDecimals];
    setData(data)
  };

  return (
    <View>
      <Text>PieChart2</Text>
      <Button title="generate" handlePress={generateData} />
      {data.map((item,index) =>{
        return <RenderItem item={item} index={index} key={index}/>
      })}
    </View>
  );
};

export default PieChart2;

const styles = StyleSheet.create({
  
})