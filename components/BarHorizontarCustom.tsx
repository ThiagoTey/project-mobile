import { View, Text } from "react-native";
import React from "react";
import { YAxis,BarChart, Grid } from "react-native-svg-charts";
import * as scale from 'd3-scale'
import Colors from "@/constants/Colors";

const BarHorizontarCustom = () => {
  const barData = [
    { value: 250, label: "001" },
    { value: 500, label: "623452", frontColor: "#177AD5" },
    { value: 745, label: "004", frontColor: "#177AD5" },
    { value: 320, label: "009" },
    { value: 600, label: "142", frontColor: "#177AD5" },
    { value: 256, label: "634" },
    { value: 300, label: "111" },
  ];
  return (
    <View>
      <Text>Saldo nas contas</Text>
      <View style={{ flexDirection: 'row', height: 200, paddingVertical: 16 }}>
                <YAxis
                    data={barData}
                    yAccessor={({ index }) => index}
                    scale={scale.scaleBand}
                    contentInset={{ top: 10, bottom: 10 }}
                    // spacing={0.2}
                    formatLabel={(_, index) => barData[ index ].label}
                />
                <BarChart
                    style={{ flex: 1, marginLeft: 8 }}
                    data={barData}
                    horizontal={true}
                    yAccessor={({ item }) => item.value}
                    svg={{ fill: Colors.blue }}
                    contentInset={{ top: 10, bottom: 10 }}
                    // spacing={0.2}
                    gridMin={0}
                >
                    <Grid direction={Grid.Direction.VERTICAL}/>
                </BarChart>
            </View>
    </View>
  );
};

export default BarHorizontarCustom;
