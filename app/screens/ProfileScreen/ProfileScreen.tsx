import { Route } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { IPContainer } from '../../components';
import IP from '../../types/IP';
import urls from '../../utils/urls';
import RootNavigationScreens from '../../types/RootNavigationScreens';
import constants from '../../utils/constants';
import Colors from '../../styles/Colors';
import Animated, { FadeInUp } from 'react-native-reanimated';
import Font from '../../styles/Font';

interface IProfileScreen {
    route: Route<RootNavigationScreens.Dashboard, { id?: string, uri?: string }>;
};



const ProfileScreen: React.FC<IProfileScreen> = ({ route }: IProfileScreen) => {
    const id = route.params?.id;
    const uri = route.params?.uri;
    const [data, setData] = useState<IP>();
    const [loading, setLoading] = useState(false);


    const getApi = async (id: string) => {
        if (loading) return;
        try {
            setLoading(true)
            const req = await fetch(urls.ip(id));
            const ip: IP = await req.json();
            setData(ip);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        };
    };

    useEffect(() => {
        getApi(id || '');
    }, [id])


    return (
        <View style={styles.container}>
            <Animated.View key={id} entering={FadeInUp.duration(400).springify()} style={styles.imgContainer} >
                {uri ?
                    <FastImage style={styles.img} source={{ uri }} />
                    :
                    <Text style={styles.info} >Your IP address</Text>
                }
            </Animated.View>
            <IPContainer
                isLoading={loading}
                ipAddress={data?.ip}
                isp={data?.connection?.isp}
                location={data?.country && `${data?.country}, ${data?.country_code}, ${data?.postal}`}
                timezone={data?.timezone?.utc && `UTC ${data?.timezone?.utc}`}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        gap: 40,
        alignItems: 'center',
        width: "100%",
        paddingTop: 20,
        backgroundColor: Colors.bg,
        height: "100%"

    },
    imgContainer: {
        width: "80%",
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        height: constants.screenHeight / 3,
        overflow: 'hidden'
    },
    img: { width: "100%", height: "100%" },
    info: { fontSize: 15, color: Colors.black, fontFamily: Font.MontserratMedium }
});

export default ProfileScreen;