import 'react-native-gesture-handler';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {RootViews} from './app/views/root/RootViews';

// declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <RootViews />
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
