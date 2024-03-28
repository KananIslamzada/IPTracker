import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import Colors from '../../styles/Colors';
import Font from '../../styles/Font';
import Animated, { CurvedTransition, FadeIn, FadeInLeft, FadeOutRight } from 'react-native-reanimated';

interface IIPContainer {
    ipAddress?: string;
    location?: string;
    timezone?: string;
    isp?: string;
    isLoading: boolean;
};

interface IContainer {
    title: string;
    info?: string;
    index: number;
};

const IPContainer: React.FC<IIPContainer> = ({
    ipAddress,
    isp,
    location,
    timezone,
    isLoading
}) => {

    const Container = ({ title, info, index }: IContainer) => {
        return (
            <Animated.View
                entering={FadeInLeft.delay(index * 200).springify()}
                exiting={FadeOutRight.delay(index * 100)}
                style={styles.textContainer}
            >
                <Text style={styles.title} >{title}</Text>
                <Text selectable numberOfLines={5} style={styles.info}>{info || 'unknown'}</Text>
            </Animated.View>
        )
    };

    return (
        <Animated.View entering={FadeIn} layout={CurvedTransition.duration(350)} style={styles.container}>
            {isLoading ||
                <>
                    <Container index={1} title='IP Address' info={ipAddress} />
                    <Container index={2} title='Location' info={location} />
                    <Container index={3} title='Timezone' info={timezone} />
                    <Container index={4} title='ISP' info={isp} />
                </>
            }
        </Animated.View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: "100%",
        paddingVertical: 15,
        justifyContent: "space-around",
        backgroundColor: Colors.bg,
        minHeight: 90

    },
    textContainer: { gap: 10, flex: 1, alignItems: 'center' },
    title: { color: Colors.black, fontSize: 13, fontFamily: Font.MontserratSemiBold },
    info: { color: Colors.black, fontSize: 11, fontFamily: Font.MontserratRegular }

});

export default memo(IPContainer);