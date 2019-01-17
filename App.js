import React from "react"
import { StyleSheet, Text, View, Image, Button } from "react-native"
import * as Expo from 'expo';
import LoggedInPage from "./components/LoggedInPage"
// import googleIcon from "./assets/images/signin-button.png";
export default class App extends React.Component {
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
      {/* <Text style={styles.header}>Sign In With Google</Text> */}
      {/* <Image
          source={require("./assets/images/signin-button.png")} onPress={() => props.signIn()} 
        />      */}
      <Button title="Sign in with Google" onPress={() => props.signIn()} />
    </View>
  )
}

// const LoggedInPage = props => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Welcome:{props.name}</Text>
//       <Image style={styles.image} source={{ uri: props.photoUrl }} />
//     </View>
//   )
// }

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