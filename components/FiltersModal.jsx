import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { BlurView } from "expo-blur"
import Animated, { Extrapolate, Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated'

const FiltersModal = ({ modalRef }) => {
    const snapPoints = useMemo(() => ['75%'], [])


    return (

        <BottomSheetModal ref={modalRef}
            snapPoints={snapPoints}
            index={0}
            enablePanDownToClose={true}
            backdropComponent={CustomBackDrop}

        >
            <BottomSheetView style={styles.contentContainer}>
                <View style={styles.content}>
                    <Text style={styles.filterText}>Filters</Text>
                    <Text style={styles.filterText}>Filters Content</Text>

                </View>
            </BottomSheetView>
        </BottomSheetModal>

    )
}




export default FiltersModal;



const CustomBackDrop = ({ animatedIndex, style }) => {
    const containerAnimatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(animatedIndex.value, [-1, 0], [0, 1], Extrapolate.CLAMP);
        return { opacity };
    });
    const containerStyles = [
        StyleSheet.absoluteFill,
        style,
        styles.overlay,
        containerAnimatedStyle
    ]
    return (
        <Animated.View style={containerStyles}>
            <BlurView style={
                StyleSheet.absoluteFill
            }
                tint="dark"
                intensity={25}
            ></BlurView>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        backgroundColor: "grey"
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
    },
    overlay: {
        backgroundColor:
            "rgba(0,0,0,0.5)"
    }
})
