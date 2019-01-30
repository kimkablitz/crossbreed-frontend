import React, { Component } from 'react';
// import axios from 'axios';
import { StyleSheet, View, Alert, AsyncStorage } from 'react-native';
import { Svg } from 'expo';
import { Content, Header, Title, Card, CardItem, Text, Button, Body } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { NavigationActions, StackActions } from 'react-navigation';
const { Circle } = Svg;
import SlimeEgg from "../components/SlimeEgg";
import API from "../utils/API";
import { convertMongoDateToPST } from "../utils/action"



export default class EggScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props)
        this.state = {
            egg: {}
        }
    }

    componentWillMount() {
        const id = this.props.navigation.getParam('egg');
        console.log(id)
        API.getEgg(id).then(res => {
            var thisEgg = res.data
            this.setState({
                egg: thisEgg
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
    // if (this.state.egg._id) {
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
                <SlimeEgg height="205" width="200" scale="1.6" lifeStage="egg" />
              </View>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Row style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <Button success rounded style={{ flex: 1, margin: 10 }}
                  onPress={() => this.hatchEgg(egg)}
                >
                  <Text>Hatch</Text>
                </Button>
                <Button danger rounded style={{ flex: 1, margin: 10 }}
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
  // }
  // else {
  //     return null;
  //     console.log("The id does not exist")
  //     }
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