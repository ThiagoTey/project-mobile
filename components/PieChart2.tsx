import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Button from './Button'
import { useSharedValue } from 'react-native-reanimated';

interface Data {
    value:number;
    porcentage:number;
    color:string;
}

const PieChart2 = () => {
    const n = 5;
    const [data, setData] = useState<Data[]>([]);
    const totalValue = useSharedValue(0);
    const decimals = useSharedValue<number[]>([]);
    const colors = ['#1FBCFF','#00DAB7','#FFC412']

  return (
    <View>
      <Text>PieChart2</Text>
      <Button title='generate' handlePress={() => {}}/>
    </View>
  )
}

export default PieChart2