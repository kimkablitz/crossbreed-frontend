import React, { Component } from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Text, Button} from 'native-base';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { NavigationActions } from "react-navigation";
import * as Expo from 'expo';
import API from "../utils/API";

export default class AUTHENTICATION extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: false,
      authenticating: false, 
      username: "",
      password: ""
    }
  }

  googleSignIn = async () => {
    try {
      console.log("I am a monkey")
      this.setState({ authenticating: true });
      const result = await Expo.Google.logInAsync({
        iosClientId: "778512270288-qf47t5td929rgm78g61nm6o7hvfecllr.apps.googleusercontent.com",
        androidClientId: "865415366088-6beq1kml9n1j99ghe7ep8ql9kd7lk6va.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      })
      console.log("Result type = ", result.type)
      if (result.type === "success") {
        console.log("Purple Bear")
        this.goToHome(result);
      } else {
        this.setState({ authenticating: false });
        console.log("cancelled")
      }
    } catch (e) {
      this.setState({ authenticating: false });
      console.log("error", e)
    }
  }

  localSignIn = () => {
    API.login(this.state)
    .then(res => this.goToHome(res.data))
    .catch(err => console.log(err));
  }

  signUp = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: "SignUp",
    });
    this.props.navigation.dispatch(navigateAction);
  }

  goToHome = (result) => {
    const navigateHome = NavigationActions.navigate({
      routeName: "Home",
      params: { user: result.user }
    });
    this.props.navigation.dispatch(navigateHome);
  }
  
  render() {
    return (
      <Container>
        {Platform.OS === "ios"
          ? <View style={styles.container }> 
              <Button style={{ alignSelf: "center" }} onPress={ () => this.googleSignIn() }>
                <Text>Sign in with Google</Text>
              </Button>
            </View>
          : <Content padder contentContainerStyle={{ flex: 1 , justifyContent: "center" }}>
              <Form>
                <Item floatingLabel>
                  <Label>Username</Label>
                  <Input onChangeText={(value) => this.setState({username: value})}/>
                </Item>
                <Item floatingLabel last>
                  <Label>Password</Label>
                  <Input secureTextEntry={true} onChangeText={(value) => this.setState({password: value})}/>
                </Item>
                <Button
                    block
                    success
                    style={{ marginVertical: 20 }}
                    onPress={ () => this.localSignIn() }
                >
                  <Text>Login</Text>
                </Button>
                <Button
                    block
                    onPress={ () => this.signUp() }
                >
                  <Text>Register</Text>
                </Button>
              </Form>
            </Content>
        }
      
      </Container>
    )
  }
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