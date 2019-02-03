import React, { Component } from 'react';
import { StyleSheet, View, Image, KeyboardAvoidingView, AsyncStorage, Alert } from 'react-native';
import { Container, Header, Content, Title, Text, Body } from 'native-base';

export default class aboutGame extends Component {
    static navigationOptions = {
        title: 'About Game',
      };
    
    render() {
        return(
        <Container>
            <Header>
                <Body>
                    <Title style={{alignSelf: 'center'}}>About Game</Title>
                </Body>
            </Header>
            <Content contentContainerStyle={styles.content}>
                <Text>
                    Crossbreed is a react native game that is built in an Expo environment. It has a growing potential among all ages
                </Text>
            </Content>
      </Container>
        )
    }
}

var styles = StyleSheet.create({
    content:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        margin: 20
    },
   
});