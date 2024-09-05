import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ThemedText from '../typography/ThemedText';
import AntDesign from '@expo/vector-icons/AntDesign';
import Colors from '@/constants/Colors';
import { Href, router } from 'expo-router';

type Props = {
    Icon: React.ComponentType<React.ComponentProps<typeof AntDesign>>;
    title: string;
    iconName: keyof typeof AntDesign.glyphMap;
    href: Href;
  };
 
const ConfigRoute = ({Icon, title, iconName, href}: Props) => {

    const handlePress = () => {
        router.push(href)
    }

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View className='flex-row items-center gap-x-2'>
        <View className='w-10 h-10 items-center justify-center bg-slate-200 rounded-lg'>
            <Icon name={iconName} size={24} color={Colors.grey}/>
        </View>
        <ThemedText className='font-imedium text-base'>{title}</ThemedText>
      </View>
      <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
    </TouchableOpacity>
  )
}

export default ConfigRoute

const styles = StyleSheet.create({
    container : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})