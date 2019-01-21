import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Match3Screen from '../screens/Match3Screen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home`
          : 'md-home'
      }
    />
  ),
};

const BreedStack = createStackNavigator({
  Breed: LinksScreen,
});

BreedStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='md-git-network'
    />
  ),
};

const Match3Stack = createStackNavigator({
  Match3Game: Match3Screen,
});

Match3Stack.navigationOptions = {
  swipeEnabled: false,
  tabBarVisible: false,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='logo-game-controller-b'
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  BreedStack,
  Match3Stack
},
{
  swipeEnabled: true,
  tabBarOptions: {
    showLabel: false,
    style: { height: "10%" },
    activeBackgroundColor: "black",
    inactiveBackgroundColor: "black",
    activeTintColor: "white"
  }
}
);
