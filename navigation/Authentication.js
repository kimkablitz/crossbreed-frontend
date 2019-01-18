import React, { Component } from 'react'
import { Platform, StatusBar, StyleSheet, View, Image, Text, Button } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import * as Expo from 'expo';
import LoggedInPage from "../components/LoggedInPage"


export default class AUTHENTICATION extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: false,
      name: "",
      photoUrl: "",
      email:""
    }
  }
  signIn = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        iosClientId:
          "778512270288-qf47t5td929rgm78g61nm6o7hvfecllr.apps.googleusercontent.com",
          androidClientId: "865415366088-6beq1kml9n1j99ghe7ep8ql9kd7lk6va.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      })

      if (result.type === "success") {
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl,
          email: result.user.email
        })
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.signedIn ? (
          <LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} email={this.state.email}  />
        ) : (
          <LoginPage signIn={this.signIn} />
        )}
      </View>
    )
  }
}
// const googleIcon = "./assets/images/signin-button.png"
const LoginPage = props => {
  return (
    <View>
      <Button title="Sign in with Google" onPress={() => props.signIn()} />
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 25
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }
})