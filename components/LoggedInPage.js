import React from 'react';
import { StyleSheet, Text, View, Image, Button } from "react-native";


export default LoggedInPage = (props) => {
    console.log(props)

    return (
        <View style={styles.container}>
          <Text style={styles.header}>Welcome:{props.name}</Text>
          {/* <Text style={styles.header}>Welcome:{props.email}</Text> */}
          <Image style={styles.image} source={{ uri: props.photoUrl }}/>
        </View>
      )
}
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
      width: 250,
      height: 250,
      borderColor: "rgba(0,0,0,0.2)",
      borderWidth: 3,
      borderRadius: 150
    }
  })