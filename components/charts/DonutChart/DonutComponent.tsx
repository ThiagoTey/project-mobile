import { View, Text } from 'react-native'
import React from 'react'
import { SharedValue } from 'react-native-reanimated';

type Props = {
    radius: number;
    strokeWidth: number;
    outerStrokeWidth: number;
    totalValue: SharedValue<number>;
}

const DonutComponent = (props: Props) => {
  return (
    <View>
      <Text>DonutComponent</Text>
    </View>
  )
}

export default DonutComponent