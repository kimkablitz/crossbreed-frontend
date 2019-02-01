import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native';
import _ from "lodash";
import PetCard from '../components/Stable/PetCard';
import EggCard from '../components/Stable/EggCard';
import { Col, Row, Grid } from "react-native-easy-grid";
import { NavigationActions } from 'react-navigation';
import { Content, Container, Header, Body, Button, Title, Text } from 'native-base';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      view: "pets",
      // this will hold all the users's pets
      stalls: [],
      // this will hold all the user's eggs
      eggs: [],
      incubatingEggs: [],
      readyToHatchEggs: [],
      // Stalls that are taken up by a pet, incubating egg, or readyToHatch egg
      stallsTaken: 0
    },
    this.timer;
  }

  componentDidMount(){
    this.props.navigation.addListener(
      'willFocus',
      () => {
        this.grabAsyncStorage();
      }
    );
    this.props.navigation.addListener(
      "willBlur",
      () => {
        clearInterval(this.timer);
      }
    )
  }

  grabAsyncStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        // We have data!!
        const userInfo = JSON.parse(value);
        const eggs = [];
        const incubatingEggs = [];
        const readyToHatchEggs = [];
        userInfo.eggs.map( egg => {
          if(egg.lifeStage === "incubating"){
            incubatingEggs.push(egg);
          }
          else if(egg.lifeStage === "readyToHatch"){
            readyToHatchEggs.push(egg);
          }
          else{
            eggs.push(egg);
          }
        });
        const stallsTaken = parseInt(userInfo.pets.length) + parseInt(incubatingEggs.length) + parseInt(readyToHatchEggs.length);
        this.setState({ 
          stalls: userInfo.pets,
          eggs: eggs,
          incubatingEggs: incubatingEggs,
          readyToHatchEggs: readyToHatchEggs,
          stallsTaken: stallsTaken
        }, () => {
          if(incubatingEggs.length > 0){
            this.incubationTimer();
          }
        });
      }
    } catch (error) {
        // Error retrieving data
        console.log(error);
    }
  }

  incubationTimer = () => {
    clearInterval(this.timer);
    this.timer = setInterval( () => {
      let incubatingEggs = _.clone(this.state.incubatingEggs);
      if(incubatingEggs.length < 1){
        clearInterval(this.timer);
      }
      incubatingEggs.forEach((egg, index) => {
        const now = Date.now();
        if(parseInt(now) >= parseInt(egg.willHatchOn)){
          egg.lifeStage = "readyToHatch";
          incubatingEggs.splice(index, 1);
          const readyToHatchEggs = _.clone(this.state.readyToHatchEggs);
          readyToHatchEggs.push(egg);
          this.setState({ incubatingEggs: incubatingEggs, readyToHatchEggs: readyToHatchEggs }, () => {
            AsyncStorage.getItem("user").then( user => {
              user = JSON.parse(user);
              user.eggs = user.eggs.map( userEgg => {
                if(userEgg._id === egg._id){
                  return egg;
                }
                return userEgg;
              });
              AsyncStorage.setItem("user", JSON.stringify(user));
            })
          });
        }
      });
    }, 1000)
  }

  petOnPress = (_id) => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'PetScreen',
      params: { pet: _id, currentPetNumber: this.state.stalls.length },
    });
    
    this.props.navigation.dispatch(navigateAction);
  }

  eggOnPress = (_id) => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'EggScreen',
      params: { egg: _id, stallsTaken: this.state.stallsTaken },
    });
    
    this.props.navigation.dispatch(navigateAction);
  }

  setView = (view) => {
    this.setState({ view: view });
  }

  mapPetsAndEggs = () => {
    const renderArray = [];
    this.state.stalls.map( stall => {
      renderArray.push( <Col key={stall._id} style={{width: 150}} >
        <PetCard key={stall._id} data={stall} press={() => {this.petOnPress(stall._id)}} />
      </Col>)
    });
    if(this.state.readyToHatchEggs.length > 0){
      this.state.readyToHatchEggs.map( egg => {
        renderArray.push( <Col key={egg._id} style={{width: 150}} > 
            <EggCard key={egg._id} data={egg} press={() => {this.eggOnPress(egg._id)}} />
          </Col>)
      })
    }
    if(this.state.incubatingEggs.length > 0){
      this.state.incubatingEggs.map( egg => {
        renderArray.push( <Col key={egg._id} style={{width: 150}} > 
          <EggCard key={egg._id} data={egg} press={() => {this.eggOnPress(egg._id)}} />
        </Col>)
      })
    }
    return renderArray;
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
          <Grid>
            <Row style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}} >
              <Button info bordered={ this.state.view === "pets" ? false : true } rounded style={{ flex: 1, margin: 10, justifyContent: "center"}}
                  onPress={ () => this.setView("pets") }
              > 
                  <Text>Pets</Text> 
              </Button>
              <Button success bordered={ this.state.view === "eggs" ? false : true } rounded style={{ flex: 1, margin: 10, justifyContent: "center"}}
                  onPress={ () => this.setView("eggs") }
              > 
                  <Text>Eggs</Text> 
              </Button>
            </Row>
            <Row style={{ alignSelf: "center" }}>
              {this.state.view === "pets" &&
                <Text>Stalls Taken: {this.state.stallsTaken}/10</Text>
              }
            </Row>
          </Grid>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Grid>
              <Row style={{flexWrap: "wrap", justifyContent: 'space-evenly'}} > 
                {this.state.stalls ? (this.state.view === "pets" ? (this.mapPetsAndEggs().map( card => {
                  return card;
                }))
                   : this.state.eggs.length > 0 ? (this.state.eggs.map( egg => {
                    if(egg.lifeStage === "egg"){
                      return <Col key={egg._id} style={{width: 150, height: 200}} > 
                        <EggCard key={egg._id} data={egg} press={() => {this.eggOnPress(egg._id)}} />
                      </Col>
                    }
                  }) ) 
                  : <View>
                      <Text> No Eggs Here </Text>
                      <Image resizeMode="contain" source={require("../assets/images/shopping-basket.png")}/>
                    </View>
                  )
                : <Text> Loading Stable </Text>
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
});
