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
import RecipeCard from '../components/PetCard';
import { Col, Row, Grid } from "react-native-easy-grid";
import { NavigationActions } from 'react-navigation';
import { Content, Header, Body, Title } from 'native-base';
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    // this will eventually hold all the users's pets and eggs
    stalls: [
      {
          name: "Red",
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
          parents: ["The Wild"],
          level: 1,
          experiencePoints: 42
      },
      {
          name: "Blue",
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
          parents: ["Bob", "Mary"],
          level: 2,
          experiencePoints: 42
      },
      {
          name: "Green",
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
          parents: ["Frank", "Sue"],
          level: 3,
          experiencePoints: 42
      },
      {
          name: "Magenta",
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
          parents: ["Matilda", "Madison"],
          level: 6,
          experiencePoints: 42
      },
      {
          name: "Cyan",
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
          parents: ["Goldie", "Blackie"],
          level: 10,
          experiencePoints: 42
      },
      {
          name: "Yellow",
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
          parents: ["The Wild"],
          level: 15,
          experiencePoints: 42
      },
      {
          name: "White",
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
          parents: ["The Wild"],
          level: 20,
          experiencePoints: 42
      },
      {
          name: "Black",
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
          parents: ["The Wild"],
          level: 1,
          experiencePoints: 42
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

  // componentDidMount(){
  //   const userInfo = this.props.navigation.getParam("user");
  //   console.log(userInfo);
  // }

  handleOnPress = (index) => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'PetScreen',
    
      params: { pet: this.state.stalls[index] },
    });
    
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    return (
      <Content>
        <Header> 
          <Body>
            <Title style={{alignSelf: 'center'}}>Stable</Title>
          </Body>
        </Header>
        <View style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Grid>
              <Row style={{flexWrap: "wrap", justifyContent: 'space-evenly'}} > 
                {this.state.stalls.map( (stall, index) => {
                return <Col key={stall.name} style={{width: 150, height: 200}} >
                  <RecipeCard key={index} data={stall} press={() => {this.handleOnPress(index)}} />
                </Col>
                })}
              </Row>
            </Grid>
          </ScrollView>

        </View>
      </Content>
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
    backgroundColor: '#000000',
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
