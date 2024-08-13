import colors from "@/constants/colors";
import { View, Text } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { BarChart } from "react-native-gifted-charts";
import { CartesianChart, Line } from "victory-native";

const LineChartCustom = () => {
  const data = [
    { value: 15, label: "01", dataPointText: "15" },
    { value: 30, label: "02", dataPointText: "30" },
    { value: 2, label: "03", dataPointText: "2" },
    { value: 40, label: "04", dataPointText: "40" },
    { value: 13, label: "05", dataPointText: "13" },
    { value: 150, label: "06", dataPointText: "150" },
    { value: 15, label: "07", dataPointText: "15" },
    { value: 30, label: "08", dataPointText: "30" },
    { value: 0, label: "09", dataPointText: "0" },
    { value: 25, label: "10", dataPointText: "25" },
    { value: 35, label: "11", dataPointText: "35" },
    { value: 0, label: "12", dataPointText: "0" },
    { value: 45, label: "13", dataPointText: "45" },
    { value: 10, label: "14", dataPointText: "10" },
    { value: 20, label: "15", dataPointText: "20" },
    { value: 55, label: "16", dataPointText: "55" },
    { value: 60, label: "17", dataPointText: "60" },
    { value: 5, label: "18", dataPointText: "5" },
    { value: 50, label: "19", dataPointText: "50" },
    { value: 0, label: "20", dataPointText: "0" },
    { value: 30, label: "21", dataPointText: "30" },
    { value: 40, label: "22", dataPointText: "40" },
    { value: 10, label: "23", dataPointText: "10" },
    { value: 25, label: "24", dataPointText: "25" },
    { value: 35, label: "25", dataPointText: "35" },
    { value: 0, label: "26", dataPointText: "0" },
    { value: 45, label: "27", dataPointText: "45" },
    { value: 55, label: "28", dataPointText: "55" },
    { value: 60, label: "29", dataPointText: "60" },
    { value: 20, label: "30", dataPointText: "20" },
    { value: 10, label: "31", dataPointText: "10" },
  ];

  const victorydata = [
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 5 },
    { x: 4, y: 4 },
    { x: 5, y: 7 }
  ];

  return (
    <View className="mt-4">
      <LineChart
        color={colors.blue}
        dataPointsColor={"black"}
        data={data}
        // textShiftY={-2}
        // textShiftX={-5}  
        // textFontSize={13}
        yAxisTextStyle={{pointerEvents: 'none'}}
        focusEnabled
        onFocus={item => console.log('item onPress: ', item)}
        focusedDataPointShape={''}
        
        
        showTextOnFocus
        delayBeforeUnFocus={5000}
      />
      {/* <BarChart data={data} barWidth={22} spacing={12} frontColor={colors.blue} /> */}

{/* 
      <CartesianChart data={victorydata} xKey="x" yKeys={["y"]}>
      {({ points }) => (
        //👇 pass a PointsArray to the Line component, as well as options.
        <Line
          points={points.y}
          color="red"
          strokeWidth={3}
          animate={{ type: "timing", duration: 300 }}
        />
      )}
    </CartesianChart> */}
    </View>
  );
};

export default LineChartCustom;
