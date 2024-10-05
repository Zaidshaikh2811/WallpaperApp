import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons';
import React, { useState, useCallback, useRef, useEffect } from 'react'
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { theme } from "../../constants/theme"
import { hp, wp } from '../../helpers/common';
import Categories from '../../components/Categories';
import { apiCall } from '../../api';
import ImageGrid from '../../components/ImageGrid';

import { debounce } from "lodash"
import FiltersModal from '../../components/FiltersModal';

const Home = () => {

    const [search, setSearch] = useState("")
    const [activeCategory, setActiveCategory] = useState(null)
    const [page, setPage] = useState(1)
    const [images, setImages] = useState([])
    const [filters, setFilters] = useState([])
    const modalRef = useRef(null)
    const scrollRef = useRef(null)

    const [isEndReached, setIsEndReached] = useState(false)


    const applyFilters = () => {

        if (filters) {
            setPage(1);
            setImages([])
            let params = {
                page,
                ...filters,

            }
            if (activeCategory) params.categories = activeCategory
            if (search) params.q = search

            fetchImages(params, false)
        }
        closeFilterModal()

    }
    const resetFilters = () => {
        if (filters) {
            setPage(1);
            setImages([])
            setFilters(null)
            let params = {
                page,
            }
            if (activeCategory) params.categories = activeCategory
            if (search) params.q = search

            fetchImages(params, false)
        }

        closeFilterModal()

    }
    const handleChangeCategory = (item) => {
        setActiveCategory(item);
        setSearch("");
        setPage(1);
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

            fetchImages({ page, q: text, ...filters }, false)
        }
        if (text == "") {

            page = 1
            setImages([])
            fetchImages({ page, ...filters }, false)
        }
        setActiveCategory(null)
    }

    const openFilterModal = () => {
        modalRef?.current?.present();
    }
    const closeFilterModal = () => {
        modalRef?.current?.close();
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), [handleSearch, fetchImages])

    const handleClearSearch = () => {
        handleSearch('');
        setSearch('');
    };

    const clearThisFilter = (key) => {
        let filterz = { ...filters }
        delete filterz[key]

        setFilters(filterz)
        page = 1;

        let params = {
            page,
            ...filterz
        }
        setImages([])
        if (activeCategory) params.categories = activeCategory
        if (search) params.q = search

        fetchImages(params, false)
    }

    const handleScroll = (e) => {
        const contentHeight = e.nativeEvent.contentSize.height;
        const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;
        const scrollOffset = e.nativeEvent.contentOffset.y;
        const bottomPosition = contentHeight - scrollViewHeight;
        if (scrollOffset >= bottomPosition) {
            if (!isEndReached) {
                setIsEndReached(true)

                setPage(page + 1);
                let params = {
                    page,
                    ...filters

                }
                if (activeCategory) params.category = activeCategory
                if (search) params.q = search
                fetchImages(params, true)
            }

        }
        else if (isEndReached) {
            setIsEndReached(false)

        }
    }
    const handleScrollUP = (e) => {
        scrollRef?.current?.scrollTo({
            y: 0,
            animated: true
        })

    }

    return (
        <SafeAreaView style={styles.container}>

            <View >
                <View style={styles.header}>

                    <Pressable onPress={handleScrollUP} >
                        <Text style={styles.title}>Header</Text>
                    </Pressable>
                    <Pressable onPress={openFilterModal}>
                        <FontAwesome6 name="bars-staggered" size={22} color={
                            theme.colors.neutral(0.7)} />
                    </Pressable>
                </View>

            </View>

            <ScrollView onScroll={handleScroll} scrollEventThrottle={5}
                ref={scrollRef}
                contentContainerStyle={{ gap: 15 }}>
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

                {
                    filters && (
                        <View>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.filters}>
                                {
                                    Object.keys(filters).map((key, index) => {
                                        return (
                                            <View key={key}
                                                style={styles.filterItems}
                                            >
                                                {key == 'colors' ? (
                                                    <View style={{
                                                        height: 20,
                                                        width: 30,
                                                        backgroundColor: filters[key],
                                                        borderRadius: 7,


                                                    }}>

                                                    </View>
                                                ) : (
                                                    <Text style={styles.filterItemText}>
                                                        {filters[key]}
                                                    </Text>
                                                )
                                                }
                                                <Pressable style={styles.filteredCloseIcon}
                                                    onPress={() => clearThisFilter(key)}>
                                                    <Ionicons name='close' size={14} color={theme.colors.neutral(0.9)}></Ionicons>

                                                </Pressable>
                                            </View>
                                        )
                                    })
                                }

                            </ScrollView>
                        </View>
                    )
                }


                <View style={styles.images}>

                    {images?.length > 0 && <ImageGrid images={images} />}
                </View>
                <View style={{ marginBottom: 70, marginTop: images.length > 0 ? 10 : 70 }}>
                    <ActivityIndicator size="large" />

                </View>

            </ScrollView>
            <View>
                <FiltersModal modalRef={modalRef} filters={filters}
                    setFilters={setFilters}
                    onClose={closeFilterModal}
                    onApply={applyFilters}
                    onReset={resetFilters}
                />
            </View>
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
    filters: {
        paddingHorizontal: wp(4),
        gap: 10

    },
    filterItems: {
        backgroundColor: theme.colors.grayBG,
        padding: 3,
        flexDirection: "row",
        borderRadius: 10,
        padding: 8,
        gap: 10,
        paddingHorizontal: 10,
    },
    filterItemText: {
        fontSize: hp(1.8),
    },
    filteredCloseIcon: {
        backgroundColor: theme.colors.neutral(0.2),
        padding: 4,
        borderRadius: 10
    }


})
