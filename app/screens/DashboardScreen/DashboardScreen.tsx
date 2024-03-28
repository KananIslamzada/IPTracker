import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Keyboard } from 'react-native';
import IP from '../../types/IP';
import { Carousel, IPContainer, Input } from '../../components';
import urls from '../../utils/urls';
import Animated, { CurvedTransition } from 'react-native-reanimated';
import Colors from '../../styles/Colors';
import Font from '../../styles/Font';
import RootNavigationProp from '../../types/RootNavigationProp';
import RootNavigationScreens from '../../types/RootNavigationScreens';
import { IData } from '../../components/Carousel/Carousel';

interface IDashboardScreen {
    navigation: RootNavigationProp
}

const DashboardScreen: React.FC<IDashboardScreen> = ({ navigation }) => {
    const [ipData, setIpData] = useState<IP>();
    const [search, setSearch] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);



    const getApi = async () => {
        if (Keyboard.isVisible()) Keyboard.dismiss()
        if (loading || ipData?.ip === search) return;
        try {
            setLoading(true)
            const ext = search.trim();
            const req = await fetch(urls.ip(ext));
            const ip: IP = await req.json();
            setIpData(ip);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    };



    useEffect(() => {
        getApi();
    }, []);



    const onItemPressed = useCallback((item: IData) => navigation.navigate(RootNavigationScreens.Profile, { id: item.ip, uri: item.uri }), []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.inputContainer} >
                    <Text style={styles.headerTitle} >IP Tracker</Text>
                    <Input
                        loading={loading}
                        onChangeText={setSearch}
                        onSearch={getApi}
                        placeholder='Search for any IP address'
                    />
                </View>
                <IPContainer
                    isLoading={loading}
                    ipAddress={ipData?.ip}
                    isp={ipData?.connection?.isp}
                    location={ipData?.country && `${ipData?.country}, ${ipData?.country_code}, ${ipData?.postal}`}
                    timezone={ipData?.timezone?.utc && `UTC ${ipData?.timezone?.utc}`}
                />
            </View>
            <Animated.View layout={CurvedTransition.duration(800)} >
                <Carousel onItemPressed={onItemPressed} />
            </Animated.View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        backgroundColor: Colors.bg,
        height: '100%'
    },
    header: {
        gap: 30,
        backgroundColor: Colors.bg
    },
    inputContainer: { alignItems: 'center', backgroundColor: Colors.bg, gap: 30 },
    headerTitle: { color: Colors.black, fontSize: 20, fontFamily: Font.MontserratSemiBold }

});

export default DashboardScreen;