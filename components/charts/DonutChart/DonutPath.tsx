import { View, Text } from "react-native";
import React from "react";
import {
  SharedValue,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { Path, Skia } from "@shopify/react-native-skia";

type Props = {
  radius: number;
  strokeWidth: number;
  color: string;
  decimals: SharedValue<number[]>;
  index: number;
  gap: number;
  outerStrokeWidth: number;
};

const DonutPath = ({
  radius,
  strokeWidth,
  color,
  decimals,
  index,
  gap,
  outerStrokeWidth,
}: Props) => {
  const innerRadius = radius - outerStrokeWidth / 2;

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  const start = useDerivedValue(() => {
    if (index === 0) {
      return gap;
    }
    const decimal = decimals.value.slice(0, index);

    const sum = decimal.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    return withTiming(sum + gap, {
      duration: 1000,
    });
  });

  return (
    <Path
      path={path}
      color={color}
      style="stroke"
      strokeWidth={strokeWidth}
      strokeJoin="round"
      strokeCap="round"
      start={start}
    />
  );
};

export default DonutPath;
