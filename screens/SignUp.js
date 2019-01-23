import React, { Component } from 'react';
import { Button, Image, View } from "react-native"; 
import { Container, Header, Content, Form, Item, Input, Label, Text, Thumbnail } from 'native-base';
import { NavigationActions } from "react-navigation";
import API from "../utils/API";

export default class SignUp extends Component {

    state = {
        username: '',
        password: '',
        displayName: ''
    }

    signUp = () => {
        // deconstruct state object
        const { username, password, displayName } = this.state;

        // create newUser object to be sent to database
        const newUser = { username, password, displayName };

        API.signUp(newUser)
            .then(res => {
                console.log("SUCCESSFUL SIGNUP")
                this.handleLoginRedirect(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleLoginRedirect = (userObj) => {
        const navigateAction = NavigationActions.navigate({
          routeName: "Home",
          params: { user: userObj }
        });
        this.props.navigation.dispatch(navigateAction);
      };

  render() {
    return (
      <Container>
        <Content padder contentContainerStyle={{ flex: 1 , justifyContent: "center" }}>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input name='username' onChangeText={(value) => this.setState({username: value})} />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input secureTextEntry={true} onChangeText={(value) => this.setState({password: value})}/>
            </Item>
            <Item floatingLabel last>
              <Label>Display Name</Label>
              <Input name="displayName" onChangeText={(value) => this.setState({displayName: value})}/>
            </Item>
            <View style={{ marginVertical: 20 }}>
               <Button onPress={this.signUp} title="Sign Up" /> 
            </View>
          </Form> 
        </Content>
      </Container>
    );
  }
}