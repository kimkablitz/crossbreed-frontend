import React, { Component } from "react";
import { View, AsyncStorage, Button } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Text,
  Icon
} from "native-base";
import { showMessage, hideMessage } from "react-native-flash-message";
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
      return Alerts.singleButtonError("Error", "Please fill in all fields");
    }
    const resetPasswordUser = email;

    API.resetPassword(resetPasswordUser)
      .then(res => {
        this.handleForgotPasswordRedirect(res.data);
      })
      .catch(err => {
        if (err.response.status === 405) {
          return Alerts.singleButtonError(
            "Err! Something has gone wrong, your password reset cannot be complete at this time",
            err.response.data.message
          );
        }
        return Alerts.singleButtonError(
          "Something went wrong",
          "Please try again!"
        );
      });
  };

  handleForgotPasswordRedirect = thisEmail => {
    console.log(thisEmail);
  };

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
              <Button
                onPress={() => {
                  /* HERE WE GONE SHOW OUR FIRST MESSAGE */
                  showMessage({
                    message: "Simple message",
                    type: "info"
                  });
                }}
                title="Reset Password"
                color="#841584"
              />
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}
