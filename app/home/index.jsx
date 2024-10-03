import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons';
import React, { useState, useCallback, useEffect } from 'react'
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { theme } from "../../constants/theme"
import { hp, wp } from '../../helpers/common';
import Categories from '../../components/Categories';
import { apiCall } from '../../api';
import ImageGrid from '../../components/ImageGrid';

import { debounce } from "lodash"

const Home = () => {

    const [search, setSearch] = useState("")
    const [activeCategory, setActiveCategory] = useState(null)
    const [images, setImages] = useState([])

    const handleChangeCategory = (item) => {
        setActiveCategory(item);
        setSearch("");

        setImages([]);
        let params = {
            page: 1,
        }
        if (item) params.category = item
        fetchImages(params, false);


    }

    useEffect(() => {
        fetchImages();

    }, [])

    const fetchImages = async (params = { page: 1 }, append = false) => {


        let res = await apiCall(params);
        if (res.success && res?.data?.hits) {
            if (append)
                setImages([...images, ...res.data.hits]);
            else {
                setImages([...res.data.hits]);
            }

        }

    }

    const handleSearch = (text) => {


        setActiveCategory(null);

        if (text.length > 2) {
            page = 1
            setImages([])

            fetchImages({ page, q: text }, false)
        }
        if (text == "") {

            page = 1
            setImages([])
            fetchImages({ page }, false)
        }
        setActiveCategory(null)
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), [handleSearch, fetchImages])

    const handleClearSearch = () => {
        handleSearch('');
        setSearch('');
    };

    return (
        <SafeAreaView style={styles.container}>

            <View >
                <View style={styles.header}>

                    <Pressable >
                        <Text style={styles.title}>Header</Text>
                    </Pressable>
                    <Pressable>
                        <FontAwesome6 name="bars-staggered" size={22} color={
                            theme.colors.neutral(0.7)} />
                    </Pressable>
                </View>

            </View>

            <ScrollView contentContainerStyle={{ gap: 15 }}>
                <View style={styles.searchBar}>
                    <View style={styles.searchIcon}>
                        <Feather name='search' size={24} color={theme.colors.neutral(0.4)} />
                    </View>
                    <TextInput value={search} onChangeText={(text) => {
                        setSearch(text);
                        handleTextDebounce(text);
                    }} placeholder="Search for photos..." style={styles.searchInput}></TextInput>
                    {search && (<Pressable onPress={() => handleClearSearch()} style={styles.closeIcon}>
                        <Ionicons name='close' size={24} color={theme.colors.neutral(0.4)}></Ionicons>
                    </Pressable>)}
                </View>
                <View style={styles.categories}>
                    <Categories activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />
                </View>


                <View style={styles.images}>

                    {images?.length > 0 && <ImageGrid images={images} />}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 15
    },
    header: {

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: wp(4),
    },
    title: {

        fontWeight: theme.fontWeights.semibold,
        fontSize: hp(4),
        color: theme.colors.neutral(0.9)
    },
    searchBar: {
        marginHorizontal: wp(4),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        padding: 6,
        backgroundColor: theme.colors.white,
        borderColor: theme.colors.grayBG,
        borderRadius: wp(2),
        paddingHorizontal: wp(3),
    },
    searchIcon: {
        padding: 8,

    },
    searchInput: {
        flex: 1,
        fontSize: hp(1.8),
        borderRadius: theme.radius.sm,
        paddingVertical: 10
    },


})
