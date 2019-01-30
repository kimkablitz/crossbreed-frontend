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
import axios from "axios";
import PetCard from '../components/Stable/PetCard';
import EggCard from '../components/Stable/EggCard';
import { Col, Row, Grid } from "react-native-easy-grid";
import { NavigationActions } from 'react-navigation';
import { Content, Container, Header, Body, Button, Title, Text } from 'native-base';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    view: "pets",
    // this will hold all the users's pets
    stalls: [],
    // this will hold all the user's eggs
    eggs: []
  }

  componentWillMount(){
    this.grabAsyncStorage();
  }

  componentDidMount(){
    const willFocus = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.setState({stalls: []}, this.grabAsyncStorage);
      }
    );
  }

  grabAsyncStorage = async () => {
    try {
      // await AsyncStorage.setItem('pets', JSON.stringify(this.state.stalls));
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        // We have data!!
        const userInfo = JSON.parse(value);
        // console.log(userInfo);
        // console.log(userInfo.pets)
        this.setState({ 
          stalls: userInfo.pets,
          eggs: userInfo.eggs
        });
      }
    } catch (error) {
        // Error retrieving data
        console.log(error);
    }
  }

  petOnPress = (index) => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'PetScreen',
      params: { pet: this.state.stalls[index]._id },
    });
    
    this.props.navigation.dispatch(navigateAction);
  }

  eggOnPress = (index) => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'EggScreen',
      params: { egg: this.state.eggs[index]._id },
    });
    
    this.props.navigation.dispatch(navigateAction);
  }

  setView = (view) => {
    this.setState({ view: view });
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
          </Grid>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Grid>
              <Row style={{flexWrap: "wrap", justifyContent: 'space-evenly'}} > 
                {this.state.stalls ? (this.state.view === "pets" ? (this.state.stalls.map( (stall, index) => {
                    return <Col key={stall._id} style={{width: 150, height: 200}} >
                      <PetCard key={stall._id} data={stall} press={() => {this.petOnPress(index)}} />
                    </Col>
                  })(this.state.eggs.length > 0 && (this.state.eggs.map(( egg, index) => {
                    if(egg.lifeStage === "readyToHatch"){
                      return <Col key={egg._id} style={{width: 150, height: 200}} > 
                        <EggCard key={egg._id} data={egg} press={() => {this.eggOnPress(index)}} />
                      </Col>
                    }
                  }))))
                   : this.state.eggs.length > 0 ? (this.state.eggs.map((egg, index)  => {
                    console.log();
                    return <Col key={egg._id} style={{width: 150, height: 200}} > 
                      <EggCard key={egg._id} data={egg} press={() => {this.eggOnPress(index)}} />
                    </Col>
                  }) ) 
                  : <Text> No Eggs Here </Text>
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
