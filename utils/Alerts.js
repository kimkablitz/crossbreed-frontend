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
    },

    exitGame: (pressFunction) => {
        Alert.alert(
			"Are you sure?",
			"Returning to the lobby will exit the current game, and your pet will not earn any experience points!",
			[
				{ text: "Cancel", style: 'cancel' },
				{ text: "Return to lobby", onPress: pressFunction }
			]
		)
		return true;
    },

    hangmanHint: (ears, synonyms, antenae, definition) => {
        Alert.alert(
            "Hint:",
            `${ears ? "Synonyms:" : ""} ${ears && synonyms ? synonyms : ""} ${antenae ? "\n\nDefinition:" : ""} ${antenae && definition ? definition : ""}`,
            [
                { text: "Close", style: "cancel" }
            ]
        )
    }
}