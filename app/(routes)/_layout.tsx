import React from 'react'
import { Stack } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient';
import colors from '@/constants/colors';
import { StyleSheet } from 'react-native';

const GradientHeader = () => (
  <LinearGradient
    colors={[colors.blue, colors.green, colors.yellow]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={StyleSheet.absoluteFill}
  />
);

const AuthLayout = () => {
  return (
    <>
        <Stack
          screenOptions={{
            headerBackground: () => <GradientHeader />,
            headerTitleStyle: {
              color: 'white'
            },
            headerTintColor: 'white',
          }}
        >
            <Stack.Screen
            name="product/[id]"
            options={{
                title:"Produto"
            }}
            />
        </Stack>
    </>
  )
}

export default AuthLayout