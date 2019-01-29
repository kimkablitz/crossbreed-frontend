import React from "react";
import { Alert } from "react-native";

export default {
    singleButtonError: (title, message) => {
        return Alert.alert(
            `${title}`,
            `${message}`,
            [
                { text: "Close", style: "cancel" }
            ]
        )
    }
}