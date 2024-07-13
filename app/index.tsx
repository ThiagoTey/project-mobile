import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

import { images } from '@/constants'
import CustomButtom from '@/components/CustomButtom'

const Index = () => {
  return (
    <SafeAreaView className='h-full'>
      <ScrollView contentContainerStyle={{height : "100%"}}>
        <View className='w-full justify-center items-center px-4 h-full'>
          <Image
            source={images.logo_title_bellow}
            className='w-[100px] h-[100px]'
            resizeMode='contain'
          />
          <Text className='max-w-[270px] text-center font-ilight text-base mt-52'>
            Aumentando a sua produtividade e
            reduzimos custos e riscos
          </Text>
          <CustomButtom
            handlePress={() => router.push('/sign-in')}
            title='Começar'
            containerStyles='mt-16'
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Index