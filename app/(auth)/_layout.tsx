import React from 'react'
import { Stack } from 'expo-router'
import Colors from '@/constants/Colors'

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in-email"
          options={{
            statusBarColor: Colors.blue,
            headerShown:false,
            headerStyle: { backgroundColor: Colors.blue },
          }}
        />
        <Stack.Screen
          name="sign-in-password"
          options={{
            statusBarColor: Colors.blue,
            headerShown:false,
            headerStyle: { backgroundColor: Colors.blue },
          }}
        />
      </Stack>
    </>
  )
}

export default AuthLayout