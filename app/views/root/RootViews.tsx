import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {VideoTab} from '../video/VideoTab';
import {FriendTab} from '../friend/FriendTab';
import {NewPostTab} from '../newPost/NewPostTab';
import {MeTab} from '../me/MeTab';
import {MessageTab} from '../message/MessageTab';

const Tab = createBottomTabNavigator();

export const RootViews = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Video" component={VideoTab} />
      <Tab.Screen name="Friend" component={FriendTab} />
      <Tab.Screen name="+" component={NewPostTab} />
      <Tab.Screen name="Me" component={MeTab} />
      <Tab.Screen name="Message" component={MessageTab} />
    </Tab.Navigator>
  );
};
