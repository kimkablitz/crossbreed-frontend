import React from 'react';
import { Animated, Image, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon, SplashScreen } from 'expo';
import AppNavigator from './navigation/AppNavigator';

console.disableYellowBox = true;

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    splashAnimation: new Animated.Value(0),
    splashAnimationComplete: false,
  };

  componentDidMount() {
    SplashScreen.preventAutoHide();
    this._loadAsync();
  }

  _loadAsync = async () => {
    try {
      await this._loadResourcesAsync();
    } catch (e) {
      this._handleLoadingError(e);
    } finally {
      this._handleFinishLoading();
    }
  };

  render() {
    if (!this.state.isLoadingComplete) {
      return <View />;
    }

    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
        {this._maybeRenderLoadingImage()}
      </View>
    );
  }

  _maybeRenderLoadingImage = () => {
    if (this.state.splashAnimationComplete) {
      return null;
    }

    return (
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          opacity: this.state.splashAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
        }}>
        <Animated.Image
          source={require('./assets/images/splash.png')}
          style={{
            width: undefined,
            height: undefined,
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            resizeMode: 'contain',
            transform: [
              {
                scale: this.state.splashAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 4],
                }),
              },
            ],
          }}
          onLoadEnd={this._animateOut}
        />
      </Animated.View>
    );
  };

  _animateOut = () => {
    SplashScreen.hide();
    Animated.timing(this.state.splashAnimation, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start(() => {
      this.setState({ splashAnimationComplete: true });
    });
  };

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
        require('./assets/images/splash.png'),
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

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});