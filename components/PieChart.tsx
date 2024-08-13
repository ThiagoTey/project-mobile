import { View, Text } from "react-native";
import { useState } from "react";
import { PieChart } from "react-native-gifted-charts";
import { FlatList } from "react-native-gesture-handler";

type PieDataProps = {
  value: number;
  color: string;
  gradientCenterColor: string;
  focused?: boolean;
  desc: string;
};

const PieChartCustom = () => {
  const [pieData, setPieData] = useState<PieDataProps[]>([
    {
      value: 47,
      color: "#009FFF",
      gradientCenterColor: "#006DFF",
      focused: true,
      desc: "Vendedor 1",
    },
    {
      value: 40,
      color: "#93FCF8",
      gradientCenterColor: "#3BE9DE",
      desc: "Vendedor 2",
    },
    {
      value: 16,
      color: "#BDB2FA",
      gradientCenterColor: "#8F80F3",
      desc: "Vendedor 3",
    },
    {
      value: 3,
      color: "#FFA5BA",
      gradientCenterColor: "#FF7F97",
      desc: "Vendedor 4",
    },
  ]);

  const [pieDataFocused, setPieDataFocused] = useState(pieData[0]);

  const renderDot = (color: string) => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const RenderDesription = ({ item }: { item: PieDataProps }) => {
    return (
      <View style={{ flexDirection: "row", paddingTop: 8 }}>
        {renderDot(item.color)}
        <Text>{`${item.desc} : ${item.value}%`}</Text>
      </View>
    );
  };

  return (
    <View className="flex-row pt-4 gap-2">
      <PieChart
        onPress={(extraRadiusForFocused: PieDataProps) => {
            if(extraRadiusForFocused.desc){
                setPieDataFocused(extraRadiusForFocused);
            }
        }}
        data={pieData}
        donut
        showGradient
        sectionAutoFocus
        focusOnPress
        radius={85}
        innerRadius={60}
        innerCircleColor={"#232B5D"}
        centerLabelComponent={() => {
          return (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{ fontSize: 22, color: "white", fontWeight: "bold" }}
              >
                {pieDataFocused.value}%
              </Text>
              <Text style={{ fontSize: 14, color: "white" }}>
                {pieDataFocused.desc}
              </Text>
            </View>
          );
        }}
      />
      <View>
      {pieData.map((item, index) => (
        <RenderDesription key={index} item={item} />
      ))}
      </View>
        {/* <FlatList
          data={pieData}
          keyExtractor={(item) => item.desc}
          renderItem={({ item }) => <RenderDesription item={item} />}
        /> */}
    </View>
  );
};

export default PieChartCustom;
