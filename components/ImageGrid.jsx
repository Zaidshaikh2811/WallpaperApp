import { MasonryFlashList } from '@shopify/flash-list';
import { StyleSheet, View } from 'react-native'
import ImageCard from './ImageCard';
import { getColoumsCount, wp } from '../helpers/common';

const ImageGrid = ({ images }) => {
    const columns = getColoumsCount();
    return (
        <View styles={styles.container}>
            <MasonryFlashList data={images}
                numColumns={columns}
                initialNumber={1000}
                contentContainerStyle={styles.listContainerStyle}
                renderItem={({ item, index }) => <ImageCard columns={columns} item={item} index={index} />}
                estimatedItemSize={200}
            ></MasonryFlashList>
        </View>
    )
}

export default ImageGrid;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 3,
        width: wp(100)
    },
    listContainerStyle: {
        paddingHorizontal: wp(4)
    }
})
