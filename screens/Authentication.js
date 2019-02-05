import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  AsyncStorage,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text
} from "native-base";
import { NavigationActions } from "react-navigation";
import * as Expo from "expo";
import API from "../utils/API";
import Alerts from "../utils/Alerts";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo";
import AppIntroSlider from "react-native-app-intro-slider";
import { Grid, Row, Col } from "react-native-easy-grid";
import Layout from "../constants/Layout";


export default class AUTHENTICATION extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      authenticating: false,
      username: "",
      password: ""
    };
  }

  googleSignIn = async () => {
    try {
      this.setState({ authenticating: true });
      const result = await Expo.Google.logInAsync({
        iosClientId:
          "778512270288-qf47t5td929rgm78g61nm6o7hvfecllr.apps.googleusercontent.com",
        androidClientId:
          "865415366088-6beq1kml9n1j99ghe7ep8ql9kd7lk6va.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });
      if (result.type === "success") {
        this.googleAPI(result.user);
        //this.goToHome(result);
      } else {
        this.setState({ authenticating: false });
        console.log("cancelled");
      }
    } catch (e) {
      this.setState({ authenticating: false });
      console.log("error", e);
    }
  };

  localSignIn = () => {
    if (this.state.username === "" || this.state.password === "") {
      return Alerts.singleButtonError("Error", "Please fill in all fields");
    }
    this.setState({ authenticating: true }, () => {
      API.login({
        username: this.state.username,
        password: this.state.password
      })
        .then(res => this.goToHome(res.data))
        .catch(err => {
          this.setState({ authenticating: false }, () => {
            if (err.response.status === 403) {
              return Alerts.singleButtonError(
                "Unable to login",
                err.response.data.message
              );
            }
            return Alerts.singleButtonError(
              "Something went wrong!",
              "Please try again!"
            );
          });
        });
    });
  };

  googleAPI = googleUserInfo => {
    // Need to make API call to back end after google sign in to retrieve user's Mongo _id and pet data
    console.log(googleUserInfo);
    API.googleLogin(googleUserInfo)
      // Then call goToHome with the returned data
      .then(res => {
        console.log(res.data);
        return this.goToHome(res.data);
      })
      .catch(err =>
        this.setState({ authenticating: false }, () => console.log(err))
      );
  };

  signUp = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: "SignUp"
    });
    this.props.navigation.dispatch(navigateAction);
  };

  toForgotRoute = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: "Forgot"
    });
    this.props.navigation.dispatch(navigateAction);
  };


  goToHome = async result => {
    try {
      // Storing user data in react-native's AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify(result));
      const navigateHome = NavigationActions.navigate({
        routeName: "Home"
      });
      this.props.navigation.dispatch(navigateHome);
    } catch (error) {
      console.log(error);
    }
  };

  _renderItem = props => (
    <LinearGradient
      style={[
        styles.mainContent,
        {
          paddingTop: props.topSpacer,
          paddingBottom: props.bottomSpacer,
          width: props.width,
          height: props.height
        }
      ]}
      colors={props.colors}
      start={{ x: 0, y: 0.1 }}
      end={{ x: 0.1, y: 1 }}
    >
      <Ionicons
        style={{ backgroundColor: "transparent" }}
        name={props.icon}
        size={200}
        color="white"
      />
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </LinearGradient>
  );

  render() {
    return {
      ...(this.state.authenticating ? (
        <View style={styles.container} />
      ) : (
        <KeyboardAvoidingView
                    style={{flex: 1}}
                    behavior='position'
                    contentContainerStyle={ {height: Layout.window.height} }
                    keyboardVerticalOffset={0}
                    enabled
        >
        <Container>
            <View style={styles.container}>
                      <AppIntroSlider
            slides={slides}
            renderItem={this._renderItem}
            bottomButton
            showPrevButton
            showSkipButton
            hideNextButton
            hideDoneButton
            // onSkip={() => console.log("skipped")}
          />
              <Content padder contentContainerStyle={styles.formContainer}>
                <Form>
                  <Item floatingLabel>
                    <Label>Username</Label>
                    <Input
                      onChangeText={value => this.setState({ username: value })}
                    />
                  </Item>
                  <Item floatingLabel>
                    <Label>Password</Label>
                    <Input
                      secureTextEntry={true}
                      onChangeText={value => this.setState({ password: value })}
                    />
                  </Item>
                </Form>
                <Button
                    block
                    full
                    info 
                    style={{ margin: 10}}
                    // style={{ marginVertical: 20 }}
                    onPress={() => this.localSignIn()}
                  >
                    <Text >Sign In</Text>
                </Button>
                <Row size={ 1 } style={{ justifyContent: "space-evenly"}}>
                  <Button block light style={{ flex: 1, margin: 10}} onPress={() => this.toForgotRoute()}>
                    <Text>Forgot Password?</Text>
                  </Button>
                  <Button block light style={{ flex: 1, margin: 10}} onPress={() => this.signUp()}>
                    <Text>Sign up</Text>
                  </Button>
                  </Row>
                {Platform.OS === "ios" && <Row style={{ margin: 10 , alignSelf: "center", justifyContent: "center", alignContent: "center"}}>
                  <Button iconLeft block style={{margin: 10}} onPress={() => this.googleSignIn()}>
                    <Image
                      style={styles.centerSelf}
                      source={require("../assets/images/googleSignin.png")}
                    />
                    <Text>Sign in with Google</Text>
                  </Button>
                </Row>}
              </Content>
            </View>
        </Container>
        </KeyboardAvoidingView>
      ))
    };
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "stretch",
    justifyContent: "center"
  },
  formContainer: {
    flex: 1,
    justifyContent: "flex-start"
  },
  // myButtons:{
  //   flexDirection: "row",
  // },
  centerSelf: {
    alignSelf: "center"
  },
  mainContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  image: {
    width: 320,
    height: 320
  },
  text: {
    color: "rgba(255, 255, 255, 0.8)",
    backgroundColor: "transparent",
    textAlign: "center",
    paddingHorizontal: 16
  },
  title: {
    fontSize: 22,
    color: "white",
    backgroundColor: "transparent",
    textAlign: "center",
    marginBottom: 16
  }
});

const slides = [
  {
    key: "somethun",
    title: "Quick setup, good defaults",
    text:
      "React-native-app-intro-slider is easy to setup with a small footprint and no dependencies. And it comes with good default layouts!",
    icon: "ios-apps",
    colors: ["#63E2FF", "#B066FE"]
  },
  {
    key: "somethun1",
    title: "Super customizable",
    text:
      "The component is also super customizable, so you can adapt it to cover your needs and wants.",
    icon: "md-git-network",
    colors: ["#A3A1FF", "#3A3897"]
  },
  {
    key: "somethun2",
    title: "No need to buy me beer",
    text: "Usage is all free",
    icon: "md-people",
    colors: ["#29ABE2", "#4F00BC"]
  }
];
