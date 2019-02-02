import React, { Component } from 'react';
import { StyleSheet, View, Image, KeyboardAvoidingView, AsyncStorage, Alert } from 'react-native';
import { Container, Header, Content, Title, Text, Body } from 'native-base';

export default class aboutUs extends Component {
    static navigationOptions = {
        title: 'About the Developers',
      };
    
    render() {
        return(
        <Container style={styles.content}>
        <Content>
        <Image source={require('../../../assets/images/Tassa.png')} />
        <Image source={require('../../../assets/images/Kimmy.png')} />
        <Image source={require('../../../assets/images/Jover.jpg')} />
        <Image source={require('../../../assets/images/Theresa.png')} />
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
        justifyContent:'center'
    },
   
});