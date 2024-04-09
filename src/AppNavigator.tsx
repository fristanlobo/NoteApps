import { View, Text, LogBox } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import Splash from './screens/Splash';
import Home from './screens/Home';
import Singup from './screens/Singup';
import Login from './screens/Login';
import AddNote from './screens/AddNote';

export type RootNavigationProps = {
    Splash: undefined;
    Login: undefined;
    Signup: undefined;
    Home: undefined;
    AddNote: undefined;
}

const Stack = createStackNavigator<RootNavigationProps>();
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen
                    name='Splash'
                    component={Splash}
                />
                <Stack.Screen
                    name='Home'
                    component={Home}
                />
                <Stack.Screen
                    name='Signup'
                    component={Singup}
                />
                <Stack.Screen
                    name='Login'
                    component={Login}
                />
                <Stack.Screen
                    name='AddNote'
                    component={AddNote}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator