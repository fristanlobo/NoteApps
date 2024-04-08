/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import AppNavigator from './src/AppNavigator';
import { Provider } from 'react-redux';
import appStore from './src/redux/appStore/appStore';
const App = () => {

  return (
    <Provider store={appStore}>
      < AppNavigator />
    </Provider >

  );
}



export default App;
