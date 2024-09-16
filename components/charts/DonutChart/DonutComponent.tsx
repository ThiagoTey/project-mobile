import { GestureResponderEvent, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { SharedValue, useDerivedValue } from "react-native-reanimated";
import {
  Canvas,
  Path,
  SkFont,
  Skia,
  Text as SkiaText,
} from "@shopify/react-native-skia";
import Colors from "@/constants/Colors";
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
  const [selectedPath, setSelectedPath] = useState<number | null>(null)
  path.addCircle(radius, radius, innerRadius);

  const targetText = useDerivedValue(
    () => `R$${Math.round(totalValue.value)}`,
    []
  );

  const fontSize = font.measureText("R$00");
  const smallfontSize = smallFont.measureText("Total");

  const textX = useDerivedValue(() => {
    const _fontSize = font.measureText(targetText.value);
    return radius - _fontSize.width / 2;
  });

  const touchHandler = (e: GestureResponderEvent) => {
    const touchX = e.nativeEvent.locationX;
    const touchY = e.nativeEvent.locationY;

    const centerX = radius;
    const centerY = radius;

    // Cálculo da distância entre o toque e o centro do círculo
    const distanceFromCenter = Math.sqrt(
      Math.pow(touchX - centerX, 2) + Math.pow(touchY - centerY, 2)
    );

    // Verifica se o toque está dentro do círculo (entre o raio interno e externo)
    const innerRadius = radius - outerStrokeWidth / 2;
    const outerRadius = radius;

    if (
      distanceFromCenter >= innerRadius - 20 &&
      distanceFromCenter <= outerRadius + 20
    ) {
      // Cálculo do ângulo do toque em relação ao centro do círculo
      const angle =
        Math.atan2(touchY - centerY, touchX - centerX) * (180 / Math.PI);
      const normalizedAngle = angle < 0 ? angle + 360 : angle; // Normaliza para valores positivos

      // Aqui você pode verificar qual setor do gráfico foi clicado
      let currentAngle = 0;
      for (let i = 0; i < n; i++) {
        const startAngle = currentAngle;
        const endAngle = startAngle + decimals.value[i] * 360;

        if (normalizedAngle >= startAngle && normalizedAngle <= endAngle) {
          console.log("Você clicou no DonutPath", i);
          if(selectedPath === i) {
            setSelectedPath(null)
          } else {
            setSelectedPath(i)
          }
          break;
        }

        currentAngle = endAngle + gap;
      }
    } else {
      console.log("Fora do donut");
    }

    console.log("TouchX: " + touchX + " TouchY: " + touchY);
  };

  return (
    <View style={{ flex: 1 }}>
      <Canvas onTouchEnd={touchHandler} style={styles.container}>
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
              selectedPath={selectedPath}
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
