import React from "react";
import { createStackNavigator } from "react-navigation";
import AuthenticationScreen from "../screens/Authentication";
import SignUpScreen from "../screens/SignUp";

export default createStackNavigator({
    Authentication: AuthenticationScreen,
    SignUp: SignUpScreen
});