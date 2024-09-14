import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SharedValue, useDerivedValue } from "react-native-reanimated";
import {
  Canvas,
  Path,
  SkFont,
  Skia,
  Text as SkiaText,
} from "@shopify/react-native-skia";
import Colors from "@/constants/Colors";
import ThemedText from "@/components/typography/ThemedText";
import DonutPath from "./DonutPath";

type Props = {
  radius: number;
  strokeWidth: number;
  outerStrokeWidth: number;
  font: SkFont;
  smallFont: SkFont;
  totalValue: SharedValue<number>;
  n: number;
  gap: number;
  decimals: SharedValue<number[]>;
  colors: string[];
};

const DonutComponent = ({
  radius,
  strokeWidth,
  outerStrokeWidth,
  font,
  smallFont,
  totalValue,
  n,
  gap,
  decimals,
  colors,
}: Props) => {
  const array = Array.from({ length: n });
  const innerRadius = radius - outerStrokeWidth / 2;
  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  const targetText = useDerivedValue(
    () => `R$${Math.round(totalValue.value)}`,
    []
  );

  console.log("tagert text :" + targetText.value);

  const fontSize = font.measureText("R$00");
  const smallfontSize = smallFont.measureText("Total");

  const textX = useDerivedValue(() => {
    const _fontSize = font.measureText(targetText.value);
    return radius - _fontSize.width / 2;
  });

  return (
    <View style={{ flex: 1 }}>
      <Canvas style={styles.container}>
        <Path
          path={path}
          color={Colors.lightgray}
          style={"stroke"}
          strokeWidth={outerStrokeWidth}
          strokeJoin="round"
          strokeCap="round"
          start={0}
          end={1}
        />
        {array.map((_, index) => {
          return (
            <DonutPath
              key={index}
              radius={radius}
              strokeWidth={strokeWidth}
              outerStrokeWidth={outerStrokeWidth}
              color={colors[index]}
              decimals={decimals}
              index={index}
              gap={gap}
            />
          );
        })}
        <SkiaText
          y={radius + smallfontSize.height / 2 - fontSize.height / 1.1}
          x={radius - smallfontSize.width / 2}
          font={smallFont}
          text={"Total"}
          color="black"
        />
        <SkiaText
          y={radius + fontSize.height / 2}
          x={textX}
          font={font}
          text={targetText}
          color="black"
        />
      </Canvas>
    </View>
  );
};

export default DonutComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
