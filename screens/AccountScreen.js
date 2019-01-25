import React, { Component } from 'react';
import { Font } from 'expo';
import { Image, StyleSheet, View, Text } from 'react-native';


// Font.loadAsync("open-sans", 'http://url/to/open-sans.ttf');

export default AccountScreen = (props) => {
  // console.log("my props: "+ props)
  return (
      <View>
        <Text style={styles.header}>Welcome:</Text>
        {/* <Text style={{fontFamily: "open-sans"}}>Hello world</Text> */}
        {/* <Text style={styles.header}>Welcome:{props.email}</Text> */}
        {/* <Image style={styles.image} source={{ uri: props.photoUrl }}/> */}
      </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "open-sans"
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
}

)

