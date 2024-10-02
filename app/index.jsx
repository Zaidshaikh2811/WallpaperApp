import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { wp, hp } from '../helpers/common'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'
import { useRouter } from 'expo-router'

const WelcomeScreen = () => {

    const router = useRouter()

    return (
        <View style={styles.container}>
            <StatusBar style='light' />

            <Image
                source={require("../assets/welcome.png")}
                style={styles.bgImage}
                resizeMode="cover"
            />
            <View style={{ flex: 1 }}>
                {/* Liner Gradient */}
                <Animated.View
                    style={{ flex: 1 }}
                    entering={FadeIn.duration(300)}
                >

                    <LinearGradient colors={["rgba(255,255,255,0)",
                        "rgba(255,255,255,.50)",
                        "white",
                        "white",
                    ]}
                        style={styles.gradient}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 0.8 }}

                    />
                    <View style={styles.contentContainer}>


                        <Animated.Text entering={FadeInDown.delay(400).springify()} style={styles.title}>Welcome to</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(400).springify()} style={styles.title}>Wallpaper App</Animated.Text>

                        <Animated.View

                            entering={FadeInDown.delay(800).springify()}

                        >
                            <Pressable
                                onPress={() => router.push("home")}
                                style={
                                    ({ pressed }) => [
                                        {
                                            opacity: pressed ? 0.5 : 1
                                        },
                                        styles.startButton
                                    ]
                                }
                            >
                                <Text style={styles.startText}>
                                    Get Started
                                </Text>

                            </Pressable>
                        </Animated.View>

                    </View>
                </Animated.View>
            </View>
        </View>
    )
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgImage: {
        width: wp(100),
        height: hp(100),
        position: "absolute",
    },
    gradient: {
        width: wp(100),
        height: hp(80),
        bottom: 0,
        position: "absolute",
    },
    contentContainer: {
        flex: 1,

        justifyContent: "flex-end",
        alignItems: "center",
        gap: 14,
        marginBottom: 100
    },
    title: {

        fontWeight: "bold",
        color: "white",
        textTransform: "uppercase",
        marginBottom: 10,

        fontSize: wp(10),
        textAlign: "center",
        textShadowColor: "black",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10


    },
    startButton: {
        backgroundColor: "black",
        padding: wp(5),
        paddingHorizontal: 90,
        borderRadius: wp(5),


    },
    startText: {
        color: "white",
        fontWeight: "bold",
        fontSize: wp(5),
        textAlign: "center",
        letterSpacing: 1


    }
})
