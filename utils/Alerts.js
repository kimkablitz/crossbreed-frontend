import React from "react";
import { Alert } from "react-native";

export default {
    emptyFieldError: () => {
        return Alert.alert(
            "Error",
            "Please fill in all fields",
            [
              { text: "Close", style: "cancel"}
            ]
          )
    },
    loginError: (message) => {
        return Alert.alert(
            "Unable to login",
            `${message}`,
            [
              { text: "Close", style: 'cancel' }
            ]
          )
    }
}