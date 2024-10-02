import { Stack } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'
import Home from './home'

const Layout = () => {
    return (

        <Stack >
            <Stack.Screen name="index"
                options={{
                    headerShown: false
                }}

            ></Stack.Screen>
            <Stack.Screen
                name="home/index"
                options={{
                    headerShown: false
                }}

            />
        </Stack>
    )
}

export default Layout
