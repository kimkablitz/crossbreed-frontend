import React from "react";
import { createStackNavigator } from "react-navigation";
import AuthenticationScreen from "../screens/Authentication";

export default createStackNavigator({
    Authentication: AuthenticationScreen
});