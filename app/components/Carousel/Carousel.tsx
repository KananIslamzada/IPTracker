import React, { memo, useCallback } from 'react';
import { StyleSheet, Pressable, View, FlatList } from 'react-native';
import constants from '../../utils/constants';
import Animated, { CurvedTransition } from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';

interface ICarousel {
    onItemPressed: (item: IData) => void;
}

export interface IData {
    uri: string;
    ip: string;
};

const randomImageUri = (index: number) => `https://picsum.photos/600/600?random=${index}`;
const data: IData[] = new Array(4).fill(null).map((_, index) => ({
    uri: randomImageUri(index),
    ip: `${index + 1}.23.24.2`
}))
const Carousel: React.FC<ICarousel> = ({ onItemPressed }) => {

    const _renderItem = useCallback(({ item }: { item: IData, index: number }) => {
        return (
            <Pressable onPress={() => onItemPressed(item)} style={styles.imgContainer} >
                <FastImage style={styles.img} source={{ uri: item.uri }} />
            </Pressable>
        )
    }, [])

    const keyExtractor = useCallback((item: IData) => Math.random() + item.ip, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                horizontal
                renderItem={_renderItem}
                keyExtractor={keyExtractor}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.content}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        width: "100%",
        height: constants.screenHeight / 3,
    },
    imgContainer: {
        height: 200,
        width: constants.screenWidth - 40,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: "hidden"
    },
    img: { width: "100%", height: "100%" },
    content: { gap: 10, paddingHorizontal: 10 }
});

export default memo(Carousel);