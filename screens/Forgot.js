import React, { Component } from "react";
import { View, AsyncStorage } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Text,
  Icon,
  Button
} from "native-base";
// import { showMessage, hideMessage } from "react-native-flash-message";
import Alerts from "../utils/Alerts";
import API from "../utils/API";

export default class Forgot extends Component {
  state = {
    email: ""
  };

  reset = () => {
    console.log("love you");
  };

  passwordReset = () => {
    if (this.state.email === "") {
      return Alerts.singleButtonError("Message", "Send us your email to reset password");
    }
    const email = this.state
    const thisUserEmail = email;

    API.resetPassword(thisUserEmail)
      .then(res => {
        console.log((res.data));
      })
      .catch(err => {
        if (err.response.status === 405) {
          return Alerts.singleButtonError(
            "Err! Something has gone wrong, your password reset cannot be complete at this time",
            err.response.data.message
          );
        }
        // return Alerts.singleButtonError(
        //   "Something went wrong",
        //   "Please try again!"
        // );
      });
  };

//   handleForgotPasswordRedirect = thisEmail => {
//     console.log(thisEmail);
//   };

  render() {
    return (
      <Container>
        <Content padder contentContainerStyle={{ flex: 1 }}>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                name="email"
                onChangeText={value => this.setState({ email: value.trim() })}
              />
            </Item>
            <View style={{ marginVertical: 20 }}>
               <Button > 
                <Text onPress={this.passwordReset()}>Reset Password</Text>
               </Button>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}
