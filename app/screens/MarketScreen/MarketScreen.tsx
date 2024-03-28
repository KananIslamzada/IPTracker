import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from '../../styles/Colors';
import { LineChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { FlashList } from '@shopify/flash-list';
import Font from '../../styles/Font';
import { useIsFocused } from '@react-navigation/native';

interface IMarketScreen {

}

let canUpdate = true;
const temp: number[] = [];
let canScroll = true;
let scrollTimeout: NodeJS.Timeout;
let isFocused = true;
const svg = { stroke: Colors.svgStroke };
const MarketScreen: React.FC<IMarketScreen> = () => {
    const [data, setData] = useState<number[]>([]);
    const listRef = useRef<FlashList<any> | null>(null);
    const flashData = useRef<any[]>([]);

    const pageIsFocused = useIsFocused();

    useEffect(() => {
        isFocused = pageIsFocused;
    }, [pageIsFocused])


    useEffect(() => {
        const socket = new WebSocket('wss://stream.binance.com:443/ws/bnbusdt');
        socket.onopen = () => {
            const subs = {
                "method": "SUBSCRIBE",
                "params": [
                    "btcusdt@aggTrade"
                ],
                "id": 1
            }
            socket.send(JSON.stringify(subs));
        }


        socket.onmessage = (event: WebSocketMessageEvent) => {
            const eventData = JSON.parse(event.data);
            if (eventData?.result === null) return;
            flashData.current = [...flashData.current, eventData]
            if (canUpdate && isFocused) {
                canUpdate = false;
                setData(p => [...p, ...temp, eventData.E]);
                temp.length = 0;
                setTimeout(() => canUpdate = true, 3000);
            }
            else temp.push(eventData.E);
        }

        return socket.close;

    }, []);


    const _renderItem = useCallback(({ item, index }: { item: any, index: number }) => {
        return <Text key={Math.random() + item.E + index} style={styles.text} >{`${item.s} | ${item.E} | ${item.a}`}</Text>
    }, [])


    const onMomentumScrollBegin = useCallback(() => {
        clearTimeout(scrollTimeout);
        canScroll = false;
    }, []);

    const onMomentumScrollEnd = useCallback(() => scrollTimeout = setTimeout(() => { canScroll = true }, 2000), [])

    const onContentSizeChange = useCallback((_: number, h: number) => canScroll && listRef.current?.scrollToOffset({ animated: true, offset: h }), [])

    return (
        <View style={styles.container}>
            <LineChart
                style={styles.chart}
                data={data}
                animate
                curve={shape.curveNatural}
                svg={svg}
                contentInset={styles.content}
            >
            </LineChart>
            <View style={styles.list} >
                <FlashList
                    data={flashData.current}
                    renderItem={_renderItem}
                    ref={listRef}
                    onContentSizeChange={onContentSizeChange}
                    onMomentumScrollBegin={onMomentumScrollBegin}
                    onMomentumScrollEnd={onMomentumScrollEnd}
                    estimatedItemSize={22}
                />
            </View>
        </View >
    )
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        backgroundColor: Colors.bg,
        height: "100%",
        width: "100%"
    },
    chart: { height: 200 },
    content: { top: 20, bottom: 20 },
    list: { margin: 10, padding: 10, backgroundColor: Colors.white, flex: 1 },
    text: { color: Colors.black, fontFamily: Font.MontserratMedium, fontSize: 12, marginVertical: 5 }
});

export default MarketScreen;