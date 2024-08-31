import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import Button from "@/components/form/Button";
import { useSharedValue, withTiming } from "react-native-reanimated";
import ThemedText from "@/components/typography/ThemedText";
import RenderItem from "./RenderItem";
import DonutComponent from "./DonutComponent";

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
const RADIUS = 160;
const STROKE_WIDTH = 30;
const OUTER_STROKE_WIDTH = 46;
const GAP = 0.04;

const DonutChart = () => {
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
      seller: "Vendedor " + index,
    }));

    totalValue.value = withTiming(total, { duration: 1000 });
    decimals.value = [...generateDecimals];
    setData(data);
  };

  return (
    <View>
      <ThemedText>PieChart2</ThemedText>
      <Button title="generate" handlePress={generateData} />
      <View style={styles.chartContainer}>
        <DonutComponent
          radius={RADIUS}
          strokeWidth={STROKE_WIDTH}
          outerStrokeWidth={OUTER_STROKE_WIDTH}
          totalValue={totalValue}
        />
      </View>
      {data.map((item, index) => {
        return <RenderItem item={item} index={index} key={index} />;
      })}
    </View>
  );
};

export default DonutChart;

const styles = StyleSheet.create({
  chartContainer: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    marginTop: 20,
  },
});
