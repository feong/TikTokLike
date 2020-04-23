import 'react-native-gesture-handler';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RootViews} from 'app/views/root/RootViews';
import {CommentStream} from 'app/views/modal/comment/CommentStream';

// declare const global: {HermesInternal: null | {}};

const AppStack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <AppStack.Navigator mode="modal">
          <AppStack.Screen
            name="Main"
            component={RootViews}
            options={{headerShown: false}}
          />
          <AppStack.Screen
            name="Comment"
            component={CommentStream}
            options={{
              headerShown: false,
              cardStyle: {backgroundColor: 'transparent'},
            }}
          />
        </AppStack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
