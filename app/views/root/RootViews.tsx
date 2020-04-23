import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {VideoTab} from '../video/VideoTab';
import {FriendTab} from '../friend/FriendTab';
import {NewPostTab} from '../newPost/NewPostTab';
import {MeTab} from '../me/MeTab';
import {MessageTab} from '../message/MessageTab';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors, IconButton} from 'react-native-paper';

const Tab = createBottomTabNavigator();

export const RootViews = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {backgroundColor: Colors.black},
        labelStyle: {fontSize: 16},
        activeTintColor: Colors.white,
      }}>
      <Tab.Screen name="Video" component={VideoTab} />
      <Tab.Screen name="Friend" component={FriendTab} />
      <Tab.Screen
        name="+"
        component={NewPostTab}
        options={{
          tabBarButton: () => (
            <IconButton
              icon={(props) => (
                <Icon
                  name="plus-square"
                  solid
                  size={props.size}
                  color={Colors.white}
                />
              )}
              size={32}
              onPress={() => console.log('Pressed')}
            />
          ),
        }}
      />
      <Tab.Screen name="Message" component={MessageTab} />
      <Tab.Screen name="Me" component={MeTab} />
    </Tab.Navigator>
  );
};
