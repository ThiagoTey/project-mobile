import { GestureResponderEvent, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  SharedValue,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  Canvas,
  Path,
  SkFont,
  Skia,
  Text as SkiaText,
} from "@shopify/react-native-skia";
import Colors from "@/constants/Colors";
import DonutPath from "./DonutPath";

type DonutData = {
  originalIndex: number; // Armazena o índice original
};

interface Data {
  value: number;
  percentage: number;
  color: string;
  seller: string;
}

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
  data: Data[];
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
  data,
}: Props) => {
  // Crie uma estrutura que armazene o índice original
  const array: DonutData[] = Array.from({ length: n }, (_, i) => ({
    originalIndex: i,
  }));

  const [selectedPath, setSelectedPath] = useState<number | null>(null);

  const innerRadius = radius - outerStrokeWidth / 2;
  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  const targetTextValue = useSharedValue(
    selectedPath !== null ? data[selectedPath].value : totalValue.value
  );

  const seller = useSharedValue(
    selectedPath !== null ? data[selectedPath].seller : "Total"
  )

  useEffect(() => {
    targetTextValue.value = withTiming(
      selectedPath !== null ? data[selectedPath].value : totalValue.value,
      { duration: 300 }
    );

    seller.value =  selectedPath !== null ? data[selectedPath].seller : "Total"
    console.log("seller lenght : " , seller.value.length / 2.5)

  }, [selectedPath, totalValue.value]);

  const targetText = useDerivedValue(
    () => `R$${Math.round(targetTextValue.value)}`,
    [targetTextValue.value, totalValue.value]
  );

  const sellerText = useDerivedValue(
    () => seller.value,
    [seller.value]
  );

  const fontSize = font.measureText("R$00");
  const smallfontSize = smallFont.measureText("Total");

  const textX = useDerivedValue(() => {
    const _fontSize = font.measureText(targetText.value);
    return radius - _fontSize.width / 2;
  });

  const textXSeller = useDerivedValue(() => {
    const _fontSize = smallFont.measureText(sellerText.value);
    console.log("_fontSize width : ", _fontSize.width / 2)
    return radius - _fontSize.width / 2;;
  });


  // Caluculo de qual path foi clicado
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
      distanceFromCenter >= innerRadius - 10 &&
      distanceFromCenter <= outerRadius + 10
    ) {
      // Cálculo do ângulo do toque em relação ao centro do círculo
      const angle =
        Math.atan2(touchY - centerY, touchX - centerX) * (180 / Math.PI);
      const normalizedAngle = angle < 0 ? angle + 360 : angle; // Normaliza para valores positivos

      // Verificar qual setor foi clicado
      let currentAngle = 0;
      for (let i = 0; i < n; i++) {
        const startAngle = currentAngle;
        const endAngle = startAngle + decimals.value[i] * 360;

        if (normalizedAngle >= startAngle && normalizedAngle <= endAngle) {
          console.log("Você clicou no DonutPath", i);
          if (selectedPath === i) {
            setSelectedPath(null);
          } else {
            setSelectedPath(i);
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

        {/* Renderiza todos os paths, exceto o selecionado */}
        {array.map((item, index) => {
          if (index !== selectedPath) {
            return (
              <DonutPath
                key={index}
                radius={radius}
                strokeWidth={strokeWidth}
                outerStrokeWidth={outerStrokeWidth}
                color={colors[index]} // Use a cor correspondente ao índice original
                decimals={decimals}
                index={index} // Use o índice original para cálculos
                gap={gap}
                selectedPath={selectedPath}
              />
            );
          }
          return null; // Ignora o path selecionado aqui
        })}
        {/* Renderiza o path selecionado por último */}
        {selectedPath !== null && (
          <DonutPath
            key={selectedPath}
            radius={radius}
            strokeWidth={strokeWidth}
            outerStrokeWidth={outerStrokeWidth}
            color={colors[selectedPath]} // Use a cor correspondente ao índice original
            decimals={decimals}
            index={selectedPath} // Use o índice original para cálculos
            gap={gap}
            selectedPath={selectedPath}
          />
        )}

        <SkiaText
          y={radius + smallfontSize.height / 2 - fontSize.height / 1.1}
          x={textXSeller}
          font={smallFont}
          text={sellerText}
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
