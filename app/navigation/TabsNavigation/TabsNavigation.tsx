import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import { DashboardScreen, MarketScreen, ProfileScreen } from "../../screens";
import RootNavigationScreens from "../../types/RootNavigationScreens";
import React from "react";
import Colors from "../../styles/Colors";
import Font from "../../styles/Font";

const Tab = createBottomTabNavigator();

interface Elements {
    filled: JSX.Element;
    outlined: JSX.Element;
}


const colorDictionary = new Map<string, Elements>([
    [
        'Dashboard',
        {
            filled: <MaterialCommunityIcons color={Colors.black} name="view-dashboard" size={25} />,
            outlined: <MaterialCommunityIcons name="view-dashboard-outline" size={25} />
        }
    ],
    [
        'Market Data',
        {
            filled: <MaterialCommunityIcons color={Colors.black} name="graph" size={25} />,
            outlined: <MaterialCommunityIcons name="graph-outline" size={25} />
        }
    ],
    [
        'Profile',
        {
            filled: <FontAwsome color={Colors.black} name='user' size={25} />,
            outlined: <FontAwsome name="user-o" size={25} />
        }
    ]
])

const screenOptions = ({ route }: { route: RouteProp<ParamListBase, string> }): BottomTabNavigationOptions => ({
    tabBarIcon: ({ focused }: { focused: boolean }) => {
        const elements = colorDictionary.get(route.name);
        if (!elements) return null;
        return focused ? elements.filled : elements.outlined;
    },
    tabBarActiveTintColor: Colors.black,
    tabBarInactiveTintColor: Colors.btnBg,
    tabBarLabelStyle: {
        fontSize: 10,
        fontFamily: Font.MontserratRegular,
    },
    headerTitleAlign: 'center',
    headerStyle: { backgroundColor: Colors.bg, borderBottomColor: Colors.border, borderBottomWidth: 0.7 },
    headerTitleStyle: { color: Colors.black, fontFamily: Font.MontserratMedium },
    tabBarStyle: styles.tabStyle,
    tabBarItemStyle: styles.itemStyle,
    tabBarHideOnKeyboard: true
})



const TabsNavigation = () => {

    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen component={DashboardScreen} name={RootNavigationScreens.Dashboard} />
            <Tab.Screen component={MarketScreen} name={RootNavigationScreens.Market} />
            <Tab.Screen component={ProfileScreen as React.FC} name={RootNavigationScreens.Profile} />
        </Tab.Navigator>
    )
};


const styles = StyleSheet.create({
    tabStyle: {
        paddingBottom: 8,
        height: 50,
        // backgroundColor: Colors.black,
    },
    itemStyle: {
        // marginTop: 4
    }

})

export default TabsNavigation;