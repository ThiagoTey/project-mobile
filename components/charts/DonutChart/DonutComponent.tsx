import { StyleSheet, View } from "react-native";
import React from "react";
import { SharedValue, useDerivedValue } from "react-native-reanimated";
import { Canvas, Path, SkFont, Skia , Text as SkiaText} from "@shopify/react-native-skia";
import Colors from "@/constants/Colors";
import ThemedText from "@/components/typography/ThemedText";

type Props = {
  radius: number;
  strokeWidth: number;
  outerStrokeWidth: number;
  totalValue: SharedValue<number>;
};

const DonutComponent = ({
  radius,
  strokeWidth,
  outerStrokeWidth,
  totalValue,
}: Props) => {
  const innerRadius = radius - outerStrokeWidth / 2;
  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  const targetText = useDerivedValue(
    () => `${Math.round(totalValue.value)}`,
    [],
  )

  const fontSize = 20;

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
        {/* <SkiaText text={targetText} color="black" /> */}
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
