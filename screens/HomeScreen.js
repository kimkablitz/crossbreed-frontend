import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from "axios";
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard'
import { Col, Row, Grid } from "react-native-easy-grid";
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    // this will eventually hold all the users's pets and eggs
    stalls: [
      {
          name: "Red",
          baseImage: "testPet.svg",
          baseColor: {
              red: 255,
              blue: 0,
              green: 0,
              transparency: 1 
          },
          outlineColor: {
              red: 0,
              blue: 0,
              green: 0,
              transparency: 1
          },
          gameColor: {
              primary: "red",
              secondary: "red"
          },
          isFavorite: false,
          parents: [],
          dna: {}, //NOTE: dna will go here soon
      },
      {
          name: "Blue",
          baseImage: "testPet.svg",
          baseColor: {
              red: 0,
              blue: 255,
              green: 0,
              transparency: 1 
          },
          outlineColor: {
              red: 0,
              blue: 0,
              green: 0,
              transparency: 1
          },
          gameColor: {
              primary: "blue",
              secondary: "blue"
          },
          isFavorite: false,
          parents: [],
          dna: {}, //NOTE: dna will go here soon
      },
      {
          name: "Green",
          baseImage: "testPet.svg",
          baseColor: {
              red: 0,
              blue: 0,
              green: 255,
              transparency: 1 
          },
          outlineColor: {
              red: 0,
              blue: 0,
              green: 0,
              transparency: 1
          },
          gameColor: {
              primary: "green",
              secondary: "green"
          },
          isFavorite: false,
          parents: [],
          dna: {}, //NOTE: dna will go here soon
      },
      {
          name: "Magenta",
          baseImage: "testPet.svg",
          baseColor: {
              red: 255,
              blue: 255,
              green: 0,
              transparency: 1 
          },
          outlineColor: {
              red: 0,
              blue: 0,
              green: 0,
              transparency: 1
          },
          gameColor: {
              primary: "magenta",
              secondary: "magenta"
          },
          isFavorite: false,
          parents: [],
          dna: {}, //NOTE: dna will go here soon
      },
      {
          name: "Cyan",
          baseImage: "testPet.svg",
          baseColor: {
              red: 0,
              blue: 255,
              green: 255,
              transparency: 1 
          },
          outlineColor: {
              red: 0,
              blue: 0,
              green: 0,
              transparency: 1
          },
          gameColor: {
              primary: "cyan",
              secondary: "cyan"
          },
          isFavorite: false,
          parents: [],
          dna: {}, //NOTE: dna will go here soon
      },
      {
          name: "Yellow",
          baseImage: "testPet.svg",
          baseColor: {
              red: 255,
              blue: 0,
              green: 255,
              transparency: 1 
          },
          outlineColor: {
              red: 0,
              blue: 0,
              green: 0,
              transparency: 1
          },
          gameColor: {
              primary: "yellow",
              secondary: "yellow"
          },
          isFavorite: false,
          parents: [],
          dna: {}, //NOTE: dna will go here soon
      },
      {
          name: "White",
          baseImage: "testPet.svg",
          baseColor: {
              red: 255,
              blue: 255,
              green: 255,
              transparency: 1 
          },
          outlineColor: {
              red: 0,
              blue: 0,
              green: 0,
              transparency: 1
          },
          gameColor: {
              primary: "white",
              secondary: "white"
          },
          isFavorite: false,
          parents: [],
          dna: {}, //NOTE: dna will go here soon
      },
      {
          name: "Black",
          baseImage: "testPet.svg",
          baseColor: {
              red: 0,
              blue: 0,
              green: 0,
              transparency: 1 
          },
          outlineColor: {
              red: 255,
              blue: 255,
              green: 255,
              transparency: 1
          },
          gameColor: {
              primary: "black",
              secondary: "black"
          },
          isFavorite: false,
          parents: [],
          dna: {}, //NOTE: dna will go here soon
      }
  ]
  }

  // getPets = (event) => {
  //   event.preventDefault();
  //   axios
  //   .get("localhost:3000/")
  //   .then(({ data: { results } }) => {
  //     console.log(results)
  //     this.setState({stalls: results})
  //   })
  //   .catch(err => console.log(err));
    
  // }


  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Grid>
            <Row style={{flexWrap: "wrap", justifyContent: 'space-evenly'}} > 
              {this.state.stalls.map(stall => 
              
              <Col key={stall.name} style={{width: 150, height: 200}} >
                <RecipeCard key={stall.name} data={stall} />
              </Col>
              )}
            </Row>
          </Grid>
        </ScrollView>

      </View>
    );
  }

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
