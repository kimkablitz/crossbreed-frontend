import React, { Component } from 'react';
import { View, AsyncStorage } from "react-native"; 
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Icon } from 'native-base';

export default class Forgot extends Component {

    state = {
        email: ''
    }

    reset = () =>{
        console.log("love you")
    }
  render() {
    return (
        <Container>
        <Content padder contentContainerStyle={{ flex: 1 }}>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input name="displayName" onChangeText={(value) => this.setState({email: value.trim()})}/>
            </Item>
            <View style={{ marginVertical: 20 }}>
               <Button block onPress={this.reset()}> 
                <Text>Reset Password</Text>
               </Button>
            </View>
          </Form> 
        </Content>
      </Container>
    )
  }
}
