import { View, Text, GestureResponderEvent, TouchableOpacity } from 'react-native'
import React from 'react'

interface CustomButtomProps {
    title: string;
    handlePress: () => void;
    // handlePress: (event: GestureResponderEvent) => void;
    containerStyles?: string;
    textStyles?: string;
    isLoading?: boolean;
  }

const CustomButtom = ({
    title,
    handlePress,
    containerStyles,
    isLoading,
    textStyles
}:CustomButtomProps) => {
  return (
    <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={isLoading}
        className={` bg-blue rounded-full w-[280px] h-[50px] justify-center items-center ${containerStyles}`}
    >
      <Text className='text-white font-isemibold text-base'>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButtom