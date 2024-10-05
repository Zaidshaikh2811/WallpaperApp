import { Image } from 'expo-image';
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { getImageSize } from '../helpers/common';
import { theme } from '../constants/theme';

const ImageCard = ({ item, index, router, columns }) => {
    const isLastRow = () => {
        return (index + 1) % columns === 0;
    }

    const getImageHeight = () => {
        let { imageHeight: height, imageWidth: width } = item;
        return {
            height: getImageSize(height, width)
        }
    }

    return (
        <Pressable onPress={() => {
            router.push({
                pathname: "home/image",
                params: { ...item }
            })
        }} style={[styles.imageWrapper]}>
            <Image
                transition={100}

                style={[styles.image, getImageHeight()]} source={{ uri: item?.webformatURL }} />
        </Pressable>
    )
}

export default ImageCard;

const styles = StyleSheet.create({
    image: {
        height: 300,
        width: '100%',
        borderRadius: 10,

        resizeMode: "cover",

        shadowColor: theme.colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

    },
    imageWrapper: {
        flex: 1,
        backgroundColor: theme.colors.grayBG,
        margin: 4,
        borderRadius: 10,

        shadowColor: theme.colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderCurve: "continuous"

    }
})
