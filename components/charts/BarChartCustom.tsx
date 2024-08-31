import { View, Text } from "react-native";
import React from "react";
import { BarChart } from "react-native-gifted-charts";
import Colors from "@/constants/Colors";

const renderTitle = () => {
  return (
    <View style={{ marginVertical: 30 }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: Colors.blue,
              marginRight: 8,
            }}
          />
          <Text>Contas a receber</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: Colors.yellow,
              marginRight: 8,
            }}
          />
          <Text>Contas a pagar</Text>
        </View>
      </View>
    </View>
  );
};

const BarChartCustom = () => {
    const barData = [
        {
          value: 40,
          label: "01/07",
          spacing: 2,
          labelWidth: 40,
          labelTextStyle: { color: "gray", left: -10 },
          frontColor: Colors.blue,
        },
        { value: 20, frontColor: Colors.yellow },
        {
          value: 51,
          label: "02/07",
          spacing: 2,
          labelWidth: 40,
          labelTextStyle: { color: "gray", left: -10 },
          frontColor: Colors.blue,
        },
        { value: 30, frontColor: Colors.yellow },
        {
          value: 45,
          label: "03/07",
          spacing: 2,
          labelWidth: 40,
          labelTextStyle: { color: "gray", left: -10 },
          frontColor: Colors.blue,
        },
        { value: 60, frontColor: Colors.yellow },
        {
          value: 33,
          label: "04/07",
          spacing: 2,
          labelWidth: 40,
          labelTextStyle: { color: "gray", left: -10 },
          frontColor: Colors.blue,
        },
        { value: 55, frontColor: Colors.yellow },
        {
          value: 70,
          label: "05/07",
          spacing: 2,
          labelWidth: 40,
          labelTextStyle: { color: "gray", left: -10 },
          frontColor: Colors.blue,
        },
        { value: 40, frontColor: Colors.yellow },
        {
          value: 85,
          label: "06/07",
          spacing: 2,
          labelWidth: 40,
          labelTextStyle: { color: "gray", left: -10 },
          frontColor: Colors.blue,
        },
        { value: 25, frontColor: Colors.yellow },
        {
          value: 50,
          label: "07/07",
          spacing: 2,
          labelWidth: 40,
          labelTextStyle: { color: "gray", left: -10 },
          frontColor: Colors.blue,
        },
        { value: 65, frontColor: Colors.yellow },
        {
          value: 40,
          label: "08/07",
          spacing: 2,
          labelWidth: 40,
          labelTextStyle: { color: "gray", left: -10 },
          frontColor: Colors.blue,
        },
        { value: 30, frontColor: Colors.yellow },
        {
          value: 55,
          label: "09/07",
          spacing: 2,
          labelWidth: 40,
          labelTextStyle: { color: "gray", left: -10 },
          frontColor: Colors.blue,
        },
        { value: 50, frontColor: Colors.yellow },
        {
          value: 60,
          label: "10/07",
          spacing: 2,
          labelWidth: 40,
          labelTextStyle: { color: "gray", left: -10 },
          frontColor: Colors.blue,
        },
        { value: 45, frontColor: Colors.yellow },
        {
          value: 70,
          label: "11/07",
          spacing: 2,
          labelWidth: 40,
          labelTextStyle: { color: "gray", left: -10 },
          frontColor: Colors.blue,
        },
        { value: 60, frontColor: Colors.yellow },
        {
          value: 80,
          label: "12/07",
          spacing: 2,
          labelWidth: 40,
          labelTextStyle: { color: "gray", left: -10 },
          frontColor: Colors.blue,
        },
        { value: 35, frontColor: Colors.yellow },
        {
          value: 45,
          label: "13/07",
          spacing: 2,
          labelWidth: 40,
          labelTextStyle: { color: "gray", left: -10 },
          frontColor: Colors.blue,
        },
        { value: 50, frontColor: Colors.yellow },
        {
          value: 55,
          label: "14/07",
          spacing: 2,
          labelWidth: 40,
          labelTextStyle: { color: "gray", left: -10 },
          frontColor: Colors.blue,
        },
        { value: 65, frontColor: Colors.yellow },
        {
          value: 75,
          label: "15/07",
          spacing: 2,
          labelWidth: 40,
          labelTextStyle: { color: "gray", left: -10 },
          frontColor: Colors.blue,
        },
        { value: 40, frontColor: Colors.yellow },
        {
          value: 85,
          label: "16/07",
          spacing: 2,
          labelWidth: 40,
          labelTextStyle: { color: "gray", left: -10 },
          frontColor: Colors.blue,
        },
        { value: 50, frontColor: Colors.yellow },
        {
          value: 60,
          label: "17/07",
          spacing: 2,
          labelWidth: 40,
          labelTextStyle: { color: "gray", left: -10 },
          frontColor: Colors.blue,
        },
        { value: 55, frontColor: Colors.yellow },
        {
          value: 45,
          label: "18/07",
          spacing: 2,
          labelWidth: 40,
          labelTextStyle: { color: "gray", left: -10 },
          frontColor: Colors.blue,
        },
        { value: 60, frontColor: Colors.yellow },
        {
          value: 70,
          label: "19/07",
          spacing: 2,
          labelWidth: 40,
          labelTextStyle: { color: "gray", left: -10 },
          frontColor: Colors.blue,
        },
        { value: 65, frontColor: Colors.yellow },
        {
          value: 80,
          label: "20/07",
          spacing: 2,
          labelWidth: 40,
          labelTextStyle: { color: "gray", left: -10 },
          frontColor: Colors.blue,
        },
        { value: 50, frontColor: Colors.yellow },
        {
          value: 90,
          label: "21/07",
          spacing: 2,
          labelWidth: 40,
          labelTextStyle: { color: "gray", left: -10 },
          frontColor: Colors.blue,
        },
        { value: 55, frontColor: Colors.yellow },
        {
          value: 60,
          label: "22/07",
          spacing: 2,
          labelWidth: 40,
          labelTextStyle: { color: "gray", left: -10 },
          frontColor: Colors.blue,
        },
        { value: 65, frontColor: Colors.yellow },
        {
          value: 75,
          label: "23/07",
          spacing: 2,
          labelWidth: 40,
          labelTextStyle: { color: "gray", left: -10 },
          frontColor: Colors.blue,
        },
        { value: 40, frontColor: Colors.yellow },
        {
          value: 85,
          label: "24/07",
          spacing: 2,
          labelWidth: 40,
          labelTextStyle: { color: "gray", left: -10 },
          frontColor: Colors.blue,
        },
        { value: 55, frontColor: Colors.yellow },
        {
          value: 60,
          label: "25/07",
          spacing: 2,
          labelWidth: 40,
          labelTextStyle: { color: "gray", left: -10 },
          frontColor: Colors.blue,
        },
        { value: 50, frontColor: Colors.yellow },
        {
          value: 70,
          label: "26/07",
          spacing: 2,
          labelWidth: 40,
          labelTextStyle: { color: "gray", left: -10 },
          frontColor: Colors.blue,
        },
        { value: 80, frontColor: Colors.yellow },
        {
          value: 90,
          label: "27/07",
          spacing: 2,
          labelWidth: 40,
          labelTextStyle: { color: "gray", left: -10 },
          frontColor: Colors.blue,
        },
        { value: 65, frontColor: Colors.yellow },
        {
          value: 55,
          label: "28/07",
          spacing: 2,
          labelWidth: 40,
          labelTextStyle: { color: "gray", left: -10 },
          frontColor: Colors.blue,
        },
        { value: 75, frontColor: Colors.yellow },
        {
          value: 85,
          label: "29/07",
          spacing: 2,
          labelWidth: 40,
          labelTextStyle: { color: "gray", left: -10 },
          frontColor: Colors.blue,
        },
        { value: 40, frontColor: Colors.yellow },
        {
          value: 50,
          label: "30/07",
          spacing: 2,
          labelWidth: 40,
          labelTextStyle: { color: "gray", left: -10 },
          frontColor: Colors.blue,
        }]

  return (
    <View style={{ left: -5 }}>
        <Text>Fluxo de caixa</Text>
      {renderTitle()}
      <BarChart
        negativeStepHeight={20}
        data={barData}
        barWidth={12}
        spacing={28}
        initialSpacing={22}
        roundedTop
        hideRules
        xAxisThickness={0}
        yAxisThickness={0}
        yAxisTextStyle={{ color: "gray" }}
        noOfSections={3}
        renderTooltip={(item: any, index: number) => {
          return (
            <View
              style={{
                marginBottom: 2,
                marginLeft: -8,
                backgroundColor: "white",
                borderColor: "#d3d3d3",
                borderWidth: 1,
                paddingHorizontal: 6,
                paddingVertical: 4,
                borderRadius: 4,
              }}
            >
              <Text>{item.value}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default BarChartCustom;
