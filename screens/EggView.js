import React, { Component } from 'react';
// import axios from 'axios';
import { StyleSheet, View, Alert, AsyncStorage } from 'react-native';
import { Svg } from 'expo';
import { Content, Header, Title, Card, CardItem, Text, Button, Body, H2 } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { NavigationActions, StackActions } from 'react-navigation';
const { Circle } = Svg;
import SlimeEgg from "../components/SlimeEgg";
import Timer from "../components/Stable/IncubationTimer";
import API from "../utils/API";
import { convertMongoDateToPST } from "../utils/action"



export default class EggScreen extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props)
        this.state = {
            egg: {},
            incubationTimer: 0
        }
    }

    componentDidMount(){
        this.props.navigation.addListener(
            "willFocus",
            () => {
                this.grabEggInfo();
            }
        )
    }

    grabEggInfo = () => {
        const id = this.props.navigation.getParam('egg');
        API.getEgg(id).then(res => {
            var thisEgg = res.data
            this.setState({
                egg: thisEgg
            }, () => {
                const now = Date.now();
                if( parseInt(now) >= parseInt(this.state.egg.willHatchOn)){
                    this.readyToHatch();
                }
                else{
                    const { willHatchOn, lifeStage } = this.state.egg;
                    if(willHatchOn && lifeStage === "incubating"){
                        this.hatchTimer(willHatchOn);
                    }
                }
            })
        }).catch(err => {
            console.log(err);
        });
    }

  releaseEgg = (egg) => {
    console.log("egg id: " + egg);
    // event.preventDefault();
    API.deleteEgg(egg)
      .then(res => {
        AsyncStorage.getItem("user").then( user => {
          user = JSON.parse(user);
          user.eggs = user.eggs.filter( egg => {
            if (egg._id !== this.state.egg._id){
              return egg;
            }
          });
          AsyncStorage.setItem("user", JSON.stringify(user)).then(() =>{
            this.goHome();
          })
        })
      })
      .catch(err => console.log(err))
  }

  incubateEgg = () => {
    const now = Date.now();
    const { _id, duration, willHatchOn } = this.state.egg;
    const eggObj = {
        lifeStage: "incubating",
        startIncubate: now,
        duration: duration
    }
    this.updateEggViaAPI( _id, eggObj);
  }

  hatchTimer = (hatchTime) => {
    const now = Date.now();
    const timeTillHatch = parseInt(hatchTime) - parseInt(now);
    if(timeTillHatch > 0){
        console.log("in hatchTimer update")
        this.setState({ incubationTimer: timeTillHatch });
    }
  }

  readyToHatch = () => {
      const eggObj = { lifeStage : "readyToHatch" }
      const { _id } = this.state.egg;
      this.updateEggViaAPI( _id, eggObj);
  }

  hatchEgg = () => {
      API.hatchEgg(this.state.egg)
      .then(res => {
          AsyncStorage.getItem("user").then(user => {
              user = JSON.parse(user);
              user.eggs = user.eggs.filter( egg => {
                  if(egg._id !== this.state.egg._id){
                      return egg;
                  }
              });
              user.pets.push(res.data);
              AsyncStorage.setItem("user", JSON.stringify(user)).then( () => {
                const reset = StackActions.reset({
                    index: 1,
                    actions: [
                        NavigationActions.navigate({
                            routeName: "Home"
                        }),
                        NavigationActions.navigate({ 
                            routeName: "PetScreen",
                            params: { pet: res.data._id }
                        })
                    ],
                })
                this.props.navigation.dispatch(reset);
              })
          })
      })
      .catch( err => {
          console.log(err);
      })
  }

  updateEggViaAPI = ( _id, eggObj ) => {
    API.updateEgg(_id, eggObj)
    .then( res => {
        AsyncStorage.getItem("user").then( user => {
            user = JSON.parse(user);
            user.eggs = user.eggs.map( egg => {
                if(egg._id === this.state.egg._id){
                    egg.lifeStage = res.data.lifeStage;
                    egg.willHatchOn = res.data.willHatchOn;
                }
                return egg;
            });
            AsyncStorage.setItem("user", JSON.stringify(user)).then( () => {
                this.setState({ egg: res.data }, () => {
                    if(res.data.lifeStage === "incubating"){
                        this.hatchTimer(res.data.willHatchOn);
                    }
                });
            });
        })
    })
  }

    goHome = () => {
        const navigateHome = NavigationActions.navigate({
            routeName: "Home",
        });
        this.props.navigation.dispatch(navigateHome);
    }

    showConfirm = () => {
        Alert.alert(
            'Are you sure you want to remove this egg?',
            'Removal is permanent and cannot be undone',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Remove egg', onPress: () => this.releaseEgg(this.state.egg._id) },
            ],
            { cancelable: false },
        )
        return true;
    }


  render() {
    const eggMadeTime = this.state.egg.createdOn
    if (this.state.egg._id) {
    return (
      <Content style={styles.centeredContent}>
        <Header>
            <Body>
                <Title style={{ alignSelf: 'center' }}>Egg</Title>
            </Body>
        </Header>
        <Card style={styles.centeredContent}>
          <CardItem>
            <Body>
              <View style={styles.svgContainer}>
              {/* NOTE: to change the icon, we need to pass the prop 'lifeStage': 'egg', 'incubating' or 'readyToHatch' */}
                <SlimeEgg height="205" width="200" scale="1.6" transformX="10" lifeStage={this.state.egg.lifeStage} />
              </View>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Row style={{ alignSelf: "center" }}> 
                  <Timer readyToHatch={ this.readyToHatch } timeLeft={ this.state.incubationTimer } duration={ this.state.egg.duration } lifeStage={ this.state.egg.lifeStage }/>
            </Row>
              <Row style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <Button success rounded style={{ flex: 1, margin: 10, justifyContent: "center" }}
                  disabled={ this.state.egg.lifeStage === "incubating" ? true : false }
                  onPress={() => {
                      if(this.state.egg.lifeStage === "egg"){
                          this.incubateEgg();
                      }
                      else if(this.state.egg.lifeStage === "readyToHatch"){
                          this.hatchEgg();
                      }
                  }}
                >
                  <Text>
                      { this.state.egg.lifeStage !== "egg" ? "Hatch" : "Incubate" }
                  </Text>
                </Button>
                <Button danger rounded style={{ flex: 1, margin: 10, justifyContent: "center" }}
                  onPress={this.showConfirm}
                >
                  <Text>Release</Text>
                </Button>
              </Row>
              <Text style={{ alignSelf: "center" }}>Created: {convertMongoDateToPST(eggMadeTime)} </Text>
              {this.state.egg.parents && <Text style={{ alignSelf: "center" }}> {this.state.egg.parents.length > 1 ? `Parents: ${this.state.egg.parents[0].name}, ${this.state.egg.parents[1].name}` : `Parents: THE WILD`}</Text>}
            </Body>
          </CardItem>
        </Card>
      </Content>
    );
  }
  else {
      return <Text>Loading Egg...</Text>
      
  }
 }
}


const styles = StyleSheet.create({
    nameText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,1)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    centeredContent: {
        alignContent: 'center',
        flex: 1,
    },
    svgContainer: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    }
});