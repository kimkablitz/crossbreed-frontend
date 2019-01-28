import React, { Component } from 'react';
import { Image, StyleSheet, View, FlatList, AsyncStorage } from 'react-native';
import { Container, Header, Body, Title, Content, Button, Text } from "native-base";
import API from "../../utils/API";
import style from './style';
import { navigationType } from '../../propTypes';
import { NavigationActions } from 'react-navigation';
import * as Expo from 'expo';


export default class AccountScreen extends React.Component {

  static navigationOptions = {
    title: 'Account',
  };

  // signOut = async () => {
  //   try {
  //     await GoogleSignin.revokeAccess();
  //     await GoogleSignin.signOut();
  //     this.setState({ user: null }); // Remember to remove the user from your app's state as well
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  logout = () => {
    API.logout()
    .then( () =>{
      this.clearAsyncStorage().then(() => {
        const navigateHome = NavigationActions.navigate({
          routeName: "Auth",
        });
        this.props.navigation.dispatch(navigateHome);
      })
    }
    )
    .catch(err => console.log(err));
  }

  clearAsyncStorage = () => {
    return AsyncStorage.removeItem("user");
  }

  render() {
    return (
      <View style={style.listContainer}>
        <Button block danger onPress={() => this.logout()} >
          <Text>Log Out</Text>
        </Button>
      </View>
    )
  }
}

