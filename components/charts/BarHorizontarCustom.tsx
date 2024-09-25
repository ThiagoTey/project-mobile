import { View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { BarChart } from "react-native-gifted-charts";
import { ItemValue } from "@react-native-picker/picker/typings/Picker";
import ChartTitle from "./ChartTitle";
import ThemedText from "../typography/ThemedText";
import { max } from "date-fns";

const BarHorizontarCustom = () => {
  const data = [
    { value: 250, label: "001" },
    { value: 500, label: "623452" },
    { value: 1000, label: "004" },
    { value: -320, label: "009" },
    { value: 600, label: "142" },
    { value: -50, label: "634" },
    { value: 300, label: "111" },
  ];

  const maxValue = Math.max(
    ...data.map((item) => (item.value > 0 ? item.value : -item.value))
  );
  console.log("maxValue : ", maxValue);

  const barData = data.map((item) => ({
    value: item.value,
    label: item.label,
    frontColor: item.value > 0 ? Colors.blue : Colors.yellow,
  }));
  return (
    <View>
      <View>
        <ChartTitle iconName="barchart" title="Fluxo De Caixa" />
      </View>
      <View style={{ marginTop: 16 }}>
        <BarChart
          data={barData}
          yAxisTextStyle={{ color: "gray" }}
          xAxisLabelTextStyle={{ color: "gray" }}
          xAxisColor={Colors.lightgray}
          yAxisColor={Colors.lightgray}
          autoShiftLabels
          barWidth={24}
          roundedTop
          noOfSections={5}
          noOfSectionsBelowXAxis={5}
          maxValue={maxValue}
          height={225}
          overflowTop={50}
          autoCenterTooltip
          renderTooltip={(item: any, index: number) => {
            const marginbt =
              item.value > 0
                ? 225
                : 225 - (225 * (-item.value / maxValue) - 25);
            return (
              <View
                style={{
                  bottom: marginbt,
                  backgroundColor: "white",
                  borderColor: "#d3d3d3",
                  borderWidth: 1,
                  paddingHorizontal: 6,
                  paddingVertical: 4,
                  borderRadius: 4,
                }}
              >
                <ThemedText>{item.value}</ThemedText>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default BarHorizontarCustom;
