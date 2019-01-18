import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Image,Button } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import * as Expo from 'expo';
// import AppNavigator from './navigation/AppNavigator';
import Authentication from './navigation/Authentication';

export default class App extends React.Component {
  state = {
    isReady: false,
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <Authentication />
      </View>
    );
  }

  async _cacheResourcesAsync() {
    const images = [
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages)

  }
}
// const LoginPage = props => {
//   return (
//     <View>
//       {/* <Text style={styles.header}>Sign In With Google</Text> */}
//       {/* <Image
//           source={require("./assets/images/signin-button.png")} onPress={() => props.signIn()} 
//         />      */}
//       <Button title="Sign in with Google" onPress={() => props.signIn()} />
//     </View>
//   )
// }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
