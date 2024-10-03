import React from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { data } from "../constants/data"
import { hp, wp } from '../helpers/common'
import { theme } from '../constants/theme'
import Animated, { FadeInRight } from 'react-native-reanimated'


const CategoryItem = ({ title, index, isActive, handleChangeCategory }) => {

    let color = isActive ? theme.colors.white : theme.colors.neutral(0.7)
    let backgroundColor = isActive ? theme.colors.neutral(0.7) : theme.colors.white


    return (
        <Animated.View style={styles.categoryItem} entering={FadeInRight.delay(index * 200).duration(1000).springify().damping(14)}
        >
            <Pressable onPress={() => handleChangeCategory(isActive ? null : title)} style={[styles.category, { backgroundColor }]}>

                <Text style={[styles.title, { color }]}>{title}</Text>
            </Pressable>
        </Animated.View>
    )
}


const Categories = ({ activeCategory, handleChangeCategory }) => {



    return (
        <FlatList
            horizontal
            contentContainerStyle={styles.flatlistContainer}
            showsHorizontalScrollIndicator={false}
            data={data.categories}
            renderItem={({ item, index }) => (
                <CategoryItem
                    isActive={activeCategory == item}
                    handleChangeCategory={handleChangeCategory}
                    title={item}
                    index={index}
                />
            )}
            keyExtractor={item => item}
        />
    )
}

export default Categories;

const styles = StyleSheet.create({

    flatlistContainer: {

        paddingHorizontal: wp(4),
        gap: 8
    },
    category: {
        padding: 12,
        paddingHorizontal: 15,
        borderWidth: 0.4,
        borderRadius: theme.radius.lg,
        alignItems: "center",
        justifyContent: "center",
        borderCurve: "continuous"
    },
    title: {
        fontWeight: theme.fontWeights.semibold,
        color: theme.colors.neutral(0.9),
        fontSize: hp(1.8)
    }

})
