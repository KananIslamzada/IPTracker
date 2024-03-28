import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { DashboardScreen, ProfileScreen } from "../../screens";
import RootNavigationScreens from "../../types/RootNavigationScreens";
import Colors from "../../styles/Colors";
import Font from "../../styles/Font";
import TabsNavigation from "../TabsNavigation/TabsNavigation";


const Stack = createNativeStackNavigator();

export const rootScreenOptions: NativeStackNavigationOptions = {
    animation: "ios",
    fullScreenGestureEnabled: true,
    headerShown: false,
    headerBackVisible: false,
};

const RootNavigation = () => {

    return (
        <Stack.Navigator screenOptions={rootScreenOptions} >
            <Stack.Screen component={TabsNavigation} name={RootNavigationScreens.Tabs} />
        </Stack.Navigator>
    );
};


export default RootNavigation;