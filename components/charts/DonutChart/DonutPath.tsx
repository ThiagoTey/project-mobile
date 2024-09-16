import React, { useEffect, useState } from "react";
import {
  SharedValue,
  useDerivedValue,
  useSharedValue,
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
  selectedPath: number | null;
};

const DonutPath = ({
  radius,
  strokeWidth,
  color,
  decimals,
  index,
  gap,
  outerStrokeWidth,
  selectedPath
}: Props) => {
  const innerRadius = radius - outerStrokeWidth / 2;
  const [isPathSelect, setIsPathSelected] = useState(false);
  // const [pathStrokeWidth, setPathStrokeWidth] = useState(strokeWidth);
  const pathStrokeWidth = useSharedValue(strokeWidth);

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

  const end = useDerivedValue(() => {
    const decimal = decimals.value.slice(0, index + 1);

    const sum = decimal.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    return withTiming(sum + gap, {
      duration: 1000,
    });
  });

  useEffect(() => {
    if (selectedPath === index) {
      pathStrokeWidth.value = withTiming(pathStrokeWidth.value + 10, {
        duration: 200, 
      });
    } else {
      pathStrokeWidth.value = withTiming(strokeWidth, {
        duration: 200, 
      });
    }
  }, [selectedPath]);

  return (
      <Path
        path={path}
        color={color}
        style="stroke"
        strokeWidth={pathStrokeWidth}
        strokeJoin="round"
        strokeCap="round"
        start={start}
        end={end}
      />
  );
};

export default DonutPath;
