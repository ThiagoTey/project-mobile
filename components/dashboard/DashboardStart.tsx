import { View } from 'react-native'
import React from 'react'
import ThemedText from "@/components/typography/ThemedText";
import AntDesign from '@expo/vector-icons/AntDesign';

const DashboardStart = () => {
  return (
    <View className='pt-4'>
        <View className='flex-row justify-center items-center gap-1'>
            <ThemedText className='text-gray-500'>Agosto 2024</ThemedText>
            <AntDesign name="caretdown" size={12} color="#6b7280" />
        </View>
      <ThemedText className='font-ibold text-[40px]'>R$1,812.15</ThemedText>
    </View>
  )
}

export default DashboardStart