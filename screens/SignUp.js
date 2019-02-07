import React, { Component } from 'react';
import { View, AsyncStorage, StatusBar } from "react-native"; 
import { Container, Header, Body, Title, Content, Form, Item, Input, Label, Button, Text, Icon } from 'native-base';
import { NavigationActions } from "react-navigation";
import { Row } from "react-native-easy-grid";
import PasswordInputText from "react-native-hide-show-password-input";
import API from "../utils/API";
import Alerts from "../utils/Alerts";
import validator from '../utils/validation';

export default class SignUp extends Component {

    state = {
        username: '',
        password: '',
        displayName: '',
        email: ''
    }

    signUp = () => {
      // deconstruct state object
      const { username, password, displayName, email } = this.state;
      if(username === "" || password === "" || displayName === "" || email === ""){
        return Alerts.singleButtonError("Error", "Please fill in all fields");
      }

        //Validate each of the fields individually in the order they appear on the page
        const displayNameMessage = validator.displayName(displayName);
        if(displayNameMessage !== "Success"){
          return Alerts.singleButtonError(displayNameMessage.title, displayNameMessage.message);
        }

        const usernameMessage = validator.username(username);
        if(usernameMessage !== "Success"){
          return Alerts.singleButtonError(usernameMessage.title, usernameMessage.message);
        }

        const emailMessage = validator.email(email);
        if(emailMessage !== "Success"){
          return Alerts.singleButtonError(emailMessage.title, emailMessage.message);
        }

        const passwordMessage = validator.password(password)
        if (passwordMessage !== "Success") {
          return Alerts.singleButtonError(passwordMessage.title, passwordMessage.message)
        }

        // create newUser object to be sent to database
        const newUser = { username, password, displayName, email };

        API.signUp(newUser)
            .then(res => {
                this.handleLoginRedirect(res.data)
            })
            .catch(err => {
                if(err.response.status === 403){
                  return Alerts.singleButtonError("Sign up Failed", err.response.data.message);
                }
                return Alerts.singleButtonError("Something went wrong", "Please try again!");
            })
    }

    handleLoginRedirect = async (userObj) => {
      try {
        // Storing user data in react-native's AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(userObj) );
        const navigateHome = NavigationActions.navigate({
          routeName: "Home",
        });
        this.props.navigation.dispatch(navigateHome);
      } catch (error) {
        console.log(error);
      }
      };

  render() {
    return (
      <Container>
        <StatusBar hidden />
        <Header>
          <Body>
            <Title>Sign Up</Title>
          </Body>
        </Header>
        <Content padder contentContainerStyle={{ flex: 1 }}>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input name='username' onChangeText={(value) => this.setState({username: value.trim()})} />
            </Item>
            <Item floatingLabel>
              <Label>Display Name</Label>
              <Input name="displayName" onChangeText={(value) => this.setState({displayName: value.trim()})}/>
            </Item>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input name="email" onChangeText={(value) => this.setState({email: value.trim()})}/>
            </Item>
            <View style={{ marginLeft: 15 }}>
              <PasswordInputText value={this.state.password} onChangeText={ (value) => this.setState({ password: value.trim() })}/>
            </View>
            <View style={{ marginVertical: 20 }}>
               <Button block onPress={this.signUp}> 
                <Text>Sign Up</Text>
               </Button>
            </View>
          </Form> 
        </Content>
      </Container>
    );
  }
}