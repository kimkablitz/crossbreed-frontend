import React, { Component } from 'react';
import { View, AsyncStorage, Button } from "react-native";
import { Container, Header, Content, Form, Item, Input, Label, Text, Icon } from 'native-base';
import { showMessage, hideMessage } from "react-native-flash-message";


export default class Forgot extends Component {

    state = {
        email: ''
    }

    reset = () => {
        console.log("love you")
    }

    render() {
        return (
            <Container>
                <Content padder contentContainerStyle={{ flex: 1 }}>
                    <Form>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input name="email" onChangeText={(value) => this.setState({ email: value.trim() })} />
                        </Item>
                        <View style={{ marginVertical: 20 }}>
                            <Button
                                onPress={() => {
                                    /* HERE WE GONE SHOW OUR FIRST MESSAGE */
                                    showMessage({
                                        message: "Simple message",
                                        type: "info",
                                    });
                                }}
                                title="Reset Password"
                                color="#841584"
                            />
                        </View>
                    </Form>
                </Content>
            </Container>
        )
    }
}
