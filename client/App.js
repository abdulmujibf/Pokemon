import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Home from './screens/Home'
import Detail from './screens/Detail'
import { Provider as PaperProvider } from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator } from '@react-navigation/stack'
import Favorites from './screens/Favorites';
import {Provider} from 'react-redux'
import store from './store/index'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PaperProvider>
            <StatusBar style="dark" />
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Detail" component={Detail}/>
              <Stack.Screen name="Favorites" component={Favorites}/>
            </Stack.Navigator>
        </PaperProvider>
      </NavigationContainer>
    </Provider>
  );
}
