/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Currencies} from 'components/Curriences/Curriencies';
import Screen from 'components/Screen';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <Screen>{Currencies()}</Screen>
    </SafeAreaProvider>
  );
}

export default App;
