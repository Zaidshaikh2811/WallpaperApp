import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import React, { useMemo } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { BlurView } from "expo-blur"
import Animated, { Extrapolate, Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { capitalize, hp } from '../helpers/common'
import { theme } from '../constants/theme'
import SectionView, { ColorFilterRow, CommonFilterRow } from './FilterViews'
import { data } from '../constants/data'

const FiltersModal = ({ modalRef,
    onClose,
    onApply,
    onReset,
    filters,
    setFilters

}) => {
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
                    {

                        Object.keys(sections).map((sectionName, index) => {
                            let sectionView = sections[sectionName];
                            let sectionData = data.filters[sectionName]
                            let title = capitalize(sectionName)
                            return (
                                <View key={index}>
                                    <SectionView title={title}
                                        content={sectionView({
                                            data: sectionData,
                                            filters,
                                            setFilters,
                                            filterName: sectionName
                                        })}
                                    ></SectionView>
                                </View>
                            )
                        })

                    }

                    <View style={styles.buttons}>
                        <Pressable
                            style={styles.resetButton}
                            onPress={onReset}
                            accessibilityLabel="Reset filters"
                        >
                            <Text style={[styles.buttonText, { color: theme.colors.neutral(0.9) }]}>
                                Reset
                            </Text>
                        </Pressable>
                        <Pressable
                            style={styles.applyButton}
                            onPress={onApply}
                            accessibilityLabel="Apply filters"
                        >
                            <Text style={[styles.buttonText, { color: theme.colors.white }]}>
                                Apply
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </BottomSheetView>
        </BottomSheetModal>

    )
}




export default FiltersModal;

const sections = {
    "order": (props) => <CommonFilterRow {...props} />,
    "orientation": (props) => <CommonFilterRow {...props} />,
    "type": (props) => <CommonFilterRow {...props} />,
    "colors": (props) => <ColorFilterRow {...props} />,

}

// const OrderView = () => {
//     return (
//         <View>
//             <Text>Order View</Text>
//         </View>
//     )
// }



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

    contentContainer: {
        flex: 1,
        width: "100%",
        gap: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,

    },
    overlay: {
        backgroundColor:
            "rgba(0,0,0,0.5)"
    },
    filterText: {
        fontWeight: theme.fontWeights.semibold,
        fontSize: hp(4),
        color: theme.colors.neutral(0.8),
        marginBottom: 5
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    resetButton: {
        flex: 1,
        backgroundColor: theme.colors.neutral(0.03),
        borderWidth: 2,
        borderColor: theme.colors.grayBG,
        padding: 12,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: theme.radius.md,
    },
    applyButton: {
        flex: 1,
        backgroundColor: theme.colors.neutral(0.8),
        padding: 12,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: theme.radius.md,
    },
    buttonText: {
        fontWeight: theme.fontWeights.semibold,
    }
})
