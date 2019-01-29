import React, { Component } from 'react';
import { View, AsyncStorage } from "react-native"; 
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import { NavigationActions } from "react-navigation";
import API from "../utils/API";
import Alerts from "../utils/Alerts";

export default class SignUp extends Component {

    state = {
        username: '',
        password: '',
        displayName: ''
    }

    signUp = () => {
      if(this.state.username === "" || this.state.password === "" || this.state.displayName === ""){
        return Alerts.singleButtonError("Error", "Please fill in all fields");
      }
        // deconstruct state object
        const { username, password, displayName } = this.state;

        // create newUser object to be sent to database
        const newUser = { username, password, displayName };

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
        <Content padder contentContainerStyle={{ flex: 1 }}>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input name='username' onChangeText={(value) => this.setState({username: value})} />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input secureTextEntry={true} onChangeText={(value) => this.setState({password: value})}/>
            </Item>
            <Item floatingLabel>
              <Label>Display Name</Label>
              <Input name="displayName" onChangeText={(value) => this.setState({displayName: value})}/>
            </Item>
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