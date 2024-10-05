import { BlurView } from 'expo-blur'
import React, { useState } from 'react'
import { ActivityIndicator, Button, Image, Platform, StyleSheet, Text, View } from 'react-native'
import { wp } from '../../helpers/common'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { theme } from '../../constants/theme'

const ImageScreen = () => {
    const router = useRouter()
    const item = useLocalSearchParams()
    const [status, useStatus] = useState('loading')
    let uri = item?.webformatURL


    const getSize = () => {

        const aspectRatio = item?.imageWidth / item?.imageHeight;
        const maxWidth = Platform.OS == "web" ? wp(50) : wp(92)
        let calculatedHeight = maxWidth / aspectRatio;
        let calculatedWidth = maxWidth

        if (aspectRatio < 1) {
            calculatedWidth = calculatedHeight * aspectRatio
        }


        return {
            width: calculatedWidth,
            height: calculatedHeight
        }
    }

    const onLoad = () => {
        useStatus("")
    }

    return (
        <BlurView
            tint="dark"
            intensity={60}
            style={styles.container}
        >
            <View style={[getSize()]}>
                <View style={styles.loading} >
                    {
                        status == "loading" && <ActivityIndicator style={styles.loading} size="large" color="white" />
                    }
                </View>
                <Image
                    transition={100}
                    style={[styles.image, getSize()]}
                    source={{ uri }}
                    onLoad={onLoad}
                />
            </View>
            <Button title="Back" onPress={() => router.back()}></Button>
            <Text>IMAGESCREEN</Text>
        </BlurView>
    )
}

export default ImageScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp(4),
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    image: {

        borderRadius: theme.radius.lg,
        borderWidth: 2,
        backgroundColor: "rgba(255,255,255,0.1)",
        borderColor: "rgba(255,255,255,0.1)",
    },
    loading: {
        position: 'absolute',
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: "center"

    }
})

