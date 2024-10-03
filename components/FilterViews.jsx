import { Pressable, StyleSheet, Text, View } from "react-native"
import { capitalize, hp } from "../helpers/common";
import { theme } from "../constants/theme";

const SectionView = ({ title, content }) => {
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View>{content}</View>
        </View>
    )
}



export const CommonFilterRow = ({ data, filterName, filters, setFilters }) => {

    const onselect = (item) => {
        setFilters({ ...filters, [filterName]: item })
    }


    return (
        <View style={styles.flexRowWrap}>
            {
                data && data.map((item, index) => {
                    let isActive = filters && filters[filterName] == item
                    let backgroundColor = isActive ? theme.colors.neutral(0.7) : "white"
                    let color = isActive ? "white" : theme.colors.neutral(0.7)
                    return (
                        <Pressable onPress={() => onselect(item)} style={[styles.outlineButton, { backgroundColor }]} key={item}>
                            <Text style={[styles.outlinedButtonText, { color }]}>{capitalize(item)}</Text>
                        </Pressable>
                    )
                })
            }
        </View>
    )
}
export const ColorFilterRow = ({ data, filterName, filters, setFilters }) => {

    const onselect = (item) => {
        setFilters({ ...filters, [filterName]: item })
    }


    return (
        <View style={styles.flexRowWrap}>
            {
                data && data.map((item, index) => {
                    let isActive = filters && filters[filterName] == item
                    let borderColor = isActive ? theme.colors.neutral(0.7) : "white"

                    return (
                        <Pressable onPress={() => onselect(item)}
                            key={item}>
                            <View style={[styles.colorWrapper, { borderColor }]}>
                                <View style={[styles.color, { backgroundColor: item }]}></View>
                            </View>
                        </Pressable>
                    )
                })
            }
        </View>
    )
}

export default SectionView;


const styles = StyleSheet.create({
    sectionContainer: {
        gap: 8,
        marginBottom: 20

    },
    sectionTitle: {
        fontSize: hp(2.4),
        fontWeight: theme.fontWeights.medium,
        color: theme.colors.neutral(0.8)
    },
    flexRowWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8
    },
    outlineButton: {
        padding: 8,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.colors.grayBG,
        borderCurve: "continuous",

    },
    colorWrapper: {
        padding: 3,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "white",
    },
    color: {
        width: 40,
        height: 40,
        borderRadius: 10,
    }

})