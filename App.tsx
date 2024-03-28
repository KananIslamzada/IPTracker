import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Colors from './app/styles/Colors';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './app/navigation/RootNavigation/RootNavigation';



function App(): React.JSX.Element {

  return (
    <>
      <StatusBar translucent={false} backgroundColor={Colors.bg} barStyle={'dark-content'} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <SafeAreaView style={{ flex: 1 }} >
            <RootNavigation />
          </SafeAreaView>
        </NavigationContainer>
      </GestureHandlerRootView>
    </>
  );
}


export default App;
