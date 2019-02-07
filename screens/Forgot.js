import React, { Component } from "react";
import { View, AsyncStorage,TextInput, KeyboardAvoidingView, StatusBar } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Form,
  Item,
  Input,
  Label,
  Text,
  Icon,
  Button, 
  H3,
  Body
} from "native-base";
import { NavigationActions, StackActions } from "react-navigation";
import Alerts from "../utils/Alerts";
import API from "../utils/API";
import Layout from "../constants/Layout";

export default class Forgot extends Component {
  state = {
    email: ""
  };

  // reset = () => {
  //   console.log("love you");
  // };

  sendEmailBack = () => {
    if (this.state.email === "") {
      return Alerts.singleButtonError("Message", "Send us your email to reset password");
    }
    const thisUserEmail = this.state.email.trim();
    
    API.resetPassword(thisUserEmail)
      .then(res => {
        console.log("finished reset password");
        console.log((res.data));
        Alerts.resetPassword(() => {
          const reset = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Authentication' })],
          })
          this.props.navigation.dispatch(reset);
        })
      })
      .catch(err => {
        if (err.response.status === 500) {
          return Alerts.singleButtonError(
            "Error", "Your email does not exist in our database!",
          );
        }
      });
  };


  render() {
    return (
      
      <Container>
        <StatusBar hidden />
        <Header>
          <Body>
            <Title>Forgot Password</Title>
          </Body>
        </Header>
        <Content padder contentContainerStyle={{ flex: 1, marginTop: 50 }}>
          <KeyboardAvoidingView
                      behavior='padding'
                      keyboardVerticalOffset={10}
                      enabled
          >
            <Form>
              <H3 style={{textAlign: "center"}}>Please enter the email associated with your account: </H3> 
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
              />
              <View style={{ marginVertical: 20, alignSelf: "center" }}>
                 <Button > 
                  <Text onPress={this.sendEmailBack}>Reset Password</Text>
                 </Button>
              </View>
            </Form>
          </KeyboardAvoidingView>
        </Content>
      </Container>
     
    );
  }
}
