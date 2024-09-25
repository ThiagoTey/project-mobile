import { TouchableOpacity, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import ChartTitle from "./ChartTitle";
import Colors from "@/constants/Colors";
import ThemedText from "../typography/ThemedText";
import { useState } from "react";

const customDataPoint = (props: any) => {
  const { index, value } = props;
  return (
    <TouchableOpacity
      onPress={() => {
        console.log(`DataPoint Pressed at index ${index} with value ${value}`);
      }}
      style={{
        width: 16,
        height: 16,
        backgroundColor: "white",
        borderWidth: 4,
        borderRadius: 10,
        borderColor: "#07BAD1",
      }}
    />
  );
};

const DataPointLabelComponent = ({
  id,
  value,
  selectedDataPoint,
}: {
  id: number;
  value: number;
  selectedDataPoint: number | null;
}) => {
  return (
    <View
      style={{
        paddingHorizontal: 8,
        paddingVertical: 5,
        backgroundColor: 'white',
        borderRadius: 4,
        display: selectedDataPoint === id ? "flex" : "none",
      }}
    >
      <ThemedText >{value}</ThemedText>
    </View>
  );
};

const LineChartCustom = () => {
  const [selectedDataPoint, setSelectedDataPoint] = useState<number | null>(
    null
  );

  const dataValues = [
    { value: 50 },
    { value: 30 },
    { value: 2 },
    { value: 40 },
    { value: 13 },
    { value: 150 },
    { value: 15 },
    { value: 30 },
    { value: 0 },
    { value: 25 },
    { value: 35 },
    { value: 0 },
    { value: 45 },
    { value: 10 },
    { value: 20 },
    { value: 55 },
    { value: 60 },
    { value: 5 },
    { value: 50 },
    { value: 0 },
    { value: 30 },
    { value: 40 },
    { value: 10 },
    { value: 25 },
    { value: 35 },
    { value: 0 },
    { value: 45 },
    { value: 55 },
    { value: 60 },
    { value: 20 },
    { value: 10 },
  ];

  const calculateLabelShiftX = (value:number) => {
    const numberOfDigits = value.toString().length;
    return 9 - (numberOfDigits - 1) * 2;
  };

  const data = dataValues.map((item, index) => ({
    id: index,
    value: item.value,
    dataPointLabelShiftX: calculateLabelShiftX(item.value),
    dataPointLabelComponent: () => {
      return (
        <DataPointLabelComponent
          id={index}
          selectedDataPoint={selectedDataPoint}
          value={item.value}
        />
      );
    },
  }));

  const handlePress = (props: any) => {
    if (selectedDataPoint === props.id) {
      setSelectedDataPoint(null);
    } else {
      setSelectedDataPoint(props.id);
    }

    // const timeout = setTimeout(() => {
    //   setSelectedDataPoint(null);
    // }, 8000);

    // return () => {
    //   clearTimeout(timeout);
    // }
  };

  return (
    <View>
      <View style={{ paddingTop: 12 }}>
        <ChartTitle iconName="linechart" title="Vendas no mês" />
      </View>

      <View style={{ marginTop: 16 }}>
        <LineChart
          color={Colors.blue}
          dataPointsColor={"black"}
          dataPointsRadius={6}
          dataPointsRadius1={7}
          focusedDataPointColor={Colors.blue}
          dataPointsColor1={Colors.blue}
          data={data}
          initialSpacing={25}
          overflowTop={20}
          // customDataPoint={(props, index) => {
          //   return customDataPoint({ ...props, index });
          // }}
          overflowBottom={0}
          onPress={(props: any) => {
            handlePress(props);
          }}
        />
      </View>
    </View>
  );
};

export default LineChartCustom;
