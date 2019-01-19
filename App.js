import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Image,Button } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import * as Expo from 'expo';
import AppNavigator from './navigation/AppNavigator';

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
        <AppNavigator />
      </View>
    );
  }

<<<<<<< HEAD
  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
        require('./assets/images/testPet.svg'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };
=======
  async _cacheResourcesAsync() {
    const images = [
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ];
>>>>>>> 1b0d3e37e1d466ff623fe5510fb6b600497cce90

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages)

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
