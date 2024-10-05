import { BlurView } from 'expo-blur'
import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Alert, Button, Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import { hp, wp } from '../../helpers/common'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { theme } from '../../constants/theme'
import { Entypo, Octicons } from '@expo/vector-icons'
import Animated, { FadeInDown } from 'react-native-reanimated'
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import Toast from 'react-native-toast-message';




const ImageScreen = () => {
    const router = useRouter()
    const item = useLocalSearchParams()
    const [hasPermission, setHasPermission] = useState(null);
    const [status, useStatus] = useState('loading')
    let uri = item?.webformatURL
    const fileName = item?.previewURL?.split("/").pop();
    const imageUrl = uri;
    const filePath = `${FileSystem.documentDirectory}${fileName}`


    useEffect(() => {
        const getPermission = async () => {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status === 'granted') {
                setHasPermission(true);
            } else {
                setHasPermission(false);
                Alert.alert('Permission Required', 'Media library permission is required to save images.');
            }
        };
        getPermission();
    }, []);


    const showToast = (message) => {
        Toast.show({
            type: 'success',
            text1: message,
            position: "bottom"
        });
    }

    const toastConfig = {
        success: ({ text1, props, ...rest }) => (<View style={styles.toast}>
            <Text style={styles.toastText}>{text1} </Text>
        </View>)

    }


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

    const handleDownloadImage = async () => {
        // if (hasPermission === false) {
        //     Alert.alert('Permission Denied', 'Media library permission is needed to download the image.');
        //     return;
        // }
        if (Platform.OS == 'web') {
            const anchor = document.createElement("a")
            anchor.href = imageUrl;
            anchor.target = "_blank"
            anchor.download = fileName || "download"
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
        }
        else {

            useStatus("downloading")
            let uri = await downloadFile()


            if (uri) showToast("Image Downloaded");
        }

    }
    const handleShareImage = async () => {
        if (hasPermission === false) {
            Alert.alert('Permission Denied', 'Media library permission is needed to share the image.');
            return;
        }
        useStatus("sharing")
        let uri = await downloadFile();
        if (uri) {
            await Sharing.shareAsync(uri)
        }
    }

    const downloadFile = async () => {
        try {
            const { uri } = await FileSystem.downloadAsync(imageUrl, filePath);

            return uri;

        } catch (err) {
            console.log(err);
            Alert.alert("Image", err.message);
            return null;

        } finally {
            useStatus("");  // Reset the status to idle
        }
    };


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
            <View style={styles.buttons}>
                <Animated.View entering={FadeInDown.springify()}>
                    <Pressable style={styles.button} onPress={() => router.back()}>
                        <Octicons name="x" size={24} color="white" />
                    </Pressable>

                </Animated.View>
                <Animated.View entering={FadeInDown.springify().delay(100)} >
                    {

                        status == "downloading" ? (<ActivityIndicator size="small" color="white" />

                        ) : (

                            <Pressable onPress={handleDownloadImage} style={styles.button}>
                                <Octicons name="download" size={24} color="white" />
                            </Pressable>
                        )
                    }
                </Animated.View>
                <Animated.View entering={FadeInDown.springify().delay(200)}>
                    {status == "sharing" ? <ActivityIndicator size="small" color="white" />
                        :
                        <Pressable onPress={handleShareImage} style={styles.button}>
                            <Entypo name="share" size={24} color="white" />
                        </Pressable>
                    }

                </Animated.View>
            </View>
            <Toast config={toastConfig} visibilityTime={2500} />
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

    },
    buttons: {
        marginTop: 40,
        flexDirection: "row",
        alignItems: "center",
        gap: 50,
    },
    button: {
        height: hp(6),
        width: hp(6),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: theme.radius.lg,
        borderCurve: "continuous"
    },
    toast: {
        padding: 15,
        paddingHorizontal: 30,
        borderRadius: theme.radius.xl,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.15)"
    },
    toastText: {
        fontSize: hp(1.8),
        fontWeight: theme.fontWeights.semibold,
        color: theme.colors.white
    }
})

