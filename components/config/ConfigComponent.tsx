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
    Onpress: () => void;
  };
 
const ConfigComponent = ({Icon, title, iconName, Onpress}: Props) => {

  return (
    <TouchableOpacity style={styles.container} onPress={Onpress}>
      <View className='flex-row items-center gap-x-2'>
        <View className='w-10 h-10 items-center justify-center bg-slate-200 rounded-lg'>
            <Icon name={iconName} size={24} color={Colors.gray}/>
        </View>
        <ThemedText className='font-imedium text-base'>{title}</ThemedText>
      </View>
    </TouchableOpacity>
  )
}

export default ConfigComponent

const styles = StyleSheet.create({
    container : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})