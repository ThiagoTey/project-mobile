import { View, Text } from 'react-native'
import React from 'react'
import ThemedText from '../typography/ThemedText'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const DRE = () => {
  return (
    <View>
      <ThemedText>Demonstrativo do Mês</ThemedText>
      <FontAwesome6 name="equals" size={24} color="black" />
      <FontAwesome6 name="plus" size={24} color="black" />
      <FontAwesome6 name="minus" size={24} color="black" />
    </View>
  )
}

export default DRE