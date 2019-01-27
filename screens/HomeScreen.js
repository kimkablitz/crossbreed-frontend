import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage
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
    stalls: []
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
  componentWillMount(){
    (async () => {
      try {
        // Temporary method of passing pets to game lobby, in future, user info should contain pets
        // await AsyncStorage.setItem('pets', JSON.stringify(this.state.stalls));
        const value = await AsyncStorage.getItem('user');
        const userInfo = JSON.parse(value);
        if (value !== null) {
          // We have data!!
          console.log('User: ' + userInfo);
          console.log("user pets: " + userInfo.pets)
          this.setState({ stalls: userInfo.pets });
        }
       } catch (error) {
         // Error retrieving data
         console.log(error);
       }
    })()
    //console.log( "userInfo: " + userInfo);
  }

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
                {this.state.stalls ? this.state.stalls.map( (stall, index) => {
                return <Col key={stall._id} style={{width: 150, height: 200}} >
                  <RecipeCard key={stall._id} data={stall} press={() => {this.handleOnPress(index)}} />
                </Col>
                })
              : <Text> Loading Stable</Text>
              }
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
