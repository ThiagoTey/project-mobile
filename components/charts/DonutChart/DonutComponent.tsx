import { StyleSheet, View } from "react-native";
import React from "react";
import { SharedValue } from "react-native-reanimated";
import {Canvas, Path, SkFont, Skia} from '@shopify/react-native-skia';

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
  path.addCircle(radius, radius, innerRadius)

  return (
    <View>
      <Canvas style={styles.container}>
        <Path path={path} />
      </Canvas>
    </View>
  );
};

export default DonutComponent;

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})