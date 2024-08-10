import { View, Text } from 'react-native'
import { LineChart } from "react-native-gifted-charts";

const LineChartCustom = () => {
  const data = [
    {value: 15, label: '01'},
    {value: 30, label: '02'},
    {value: 0, label: '03'},
    {value: 40, label: '04'},
    {value: 0, label: '05'},
    {value: 150, label: '06'},
    {value: 15, label: '07'},
    {value: 30, label: '08'},
    {value: 0, label: '09'},
    {value: 25, label: '10'},
    {value: 35, label: '11'},
    {value: 0, label: '12'},
    {value: 45, label: '13'},
    {value: 10, label: '14'},
    {value: 20, label: '15'},
    {value: 55, label: '16'},
    {value: 60, label: '17'},
    {value: 5, label: '18'},
    {value: 50, label: '19'},
    {value: 0, label: '20'},
    {value: 30, label: '21'},
    {value: 40, label: '22'},
    {value: 10, label: '23'},
    {value: 25, label: '24'},
    {value: 35, label: '25'},
    {value: 0, label: '26'},
    {value: 45, label: '27'},
    {value: 55, label: '28'},
    {value: 60, label: '29'},
    {value: 20, label: '30'},
    {value: 10, label: '31'}
];

  return (
    <View className='mt-4'>
      <LineChart dataPointsColor={'black'} data={data} />
    </View>
  )
}

export default LineChartCustom