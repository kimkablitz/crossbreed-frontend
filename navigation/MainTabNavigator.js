import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import BreedScreen from '../screens/BreedScreen';
import PetScreen from '../screens/PetView';
import EggScreen from '../screens/EggView';
import Match3Screen from '../screens/Match3Screen';
import GameLobbyScreen from "../screens/GameLobbyScreen";
import AccountScreen from '../screens/Settings/AccountScreen';
import HangmanScreen from "../screens/HangmanScreen";
import AboutGameScreen from '../screens/Settings/subcomponents/aboutGame'
import AboutUsScreen from '../screens/Settings/subcomponents/aboutUs'


const HomeStack = createStackNavigator(
{ 
  Home: HomeScreen, 
  PetScreen: PetScreen,
  EggScreen: EggScreen,
  AboutGame: {screen: AboutGameScreen},
  AboutUs: {screen: AboutUsScreen},
 },
{ initialRouteName: 'Home' }
);

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
  Breed: BreedScreen,
});

BreedStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='md-git-network'
    />
  ),
};


const GameStack = createStackNavigator({
  GameLobby: GameLobbyScreen,
  Match3Game: {
    screen: Match3Screen,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  HangmanGame: {
    screen: HangmanScreen,
    navigationOptions: {
      gesturesEnabled: false
    }
  }
},{
  headerMode: "none",
  initialRouteName: "GameLobby",
});

GameStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name='logo-game-controller-b'
      />
    ),
  };
};

const AccountStack = createStackNavigator({
  Account: AccountScreen,
  Settings:{
    screen: AboutGameScreen,
    navigationOptions:{
      gesturesEnabled: false
    }
  }
},{
  headerMode: "none",
  initialRouteName: "Account",
});

AccountStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-contact`
          : 'md-contact'
      }
    />
  ),
};


export default createBottomTabNavigator({
  HomeStack,
  BreedStack,
  GameStack,
  AccountStack
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
)