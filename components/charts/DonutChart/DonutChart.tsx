import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "@/components/form/Button";
import { useSharedValue, withTiming } from "react-native-reanimated";
import RenderItem from "./RenderItem";
import DonutComponent from "./DonutComponent";
import { useFont } from "@shopify/react-native-skia";
import ChartTitle from "../ChartTitle";

import { useIsFocused } from '@react-navigation/native';

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
const RADIUS = 140;
const STROKE_WIDTH = 24;
const OUTER_STROKE_WIDTH = 32;
const GAP = 0.00;

const DonutChart = () => {
  const isFocused = useIsFocused();
  const n = 7;
  const [data, setData] = useState<Data[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const decimals = useSharedValue<number[]>([]);
  const colors = [
    "#1FBCFF",
    "#00DAB7",
    "#FFC412",
    "#0561F5",
    "#BD2A2E",
    "#C82EF2",
    "#262626",
    "#BF834E",
  ];
  const arrayColors = Array.from(
    { length: n },
    (_, index) => colors[index % colors.length]
  );

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
      color: arrayColors[index],
      seller: "Vendedor " + index,
    }));

    setTotalValue(total)
    decimals.value = [...generateDecimals];
    setData(data);
  };

  useEffect(() => {
    if(isFocused) {
      setTimeout(() => {
        generateData()
      }, 1000)
    }
  }, [isFocused]);

  const font = useFont(require("@/assets/fonts/Inter-Bold.ttf"), 36);
  const smallFont = useFont(require("@/assets/fonts/Inter-Light.ttf"), 24);

  if (!font || !smallFont) {
    return <View />;
  }

  return (
    <View style={{}}>
      <ChartTitle title="Vendas Por Vendedor" iconName="user" />
      <View className="items-center pb-3">
        <View style={styles.chartContainer}>
          <DonutComponent
            radius={RADIUS}
            strokeWidth={STROKE_WIDTH}
            outerStrokeWidth={OUTER_STROKE_WIDTH}
            font={font}
            smallFont={smallFont}
            totalValue={totalValue}
            n={n}
            gap={GAP}
            decimals={decimals}
            colors={arrayColors}
            data={data}
          />
        </View>
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
