import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <>
        <Stack>
            <Stack.Screen
            name="product/[id]"
            options={{
                
            }}
            />
        </Stack>
    </>
  )
}

export default AuthLayout