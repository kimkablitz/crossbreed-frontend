import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, View, Alert } from 'react-native';
import { Svg } from 'expo';
import { Content, Card, CardItem, Text, Button, Body } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { NavigationActions, StackActions } from 'react-navigation';
const { Circle } = Svg;
import SlimeEgg from "../components/SlimeEgg";
import API from "../utils/API";

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
    const { _id, createdOn, isFrozen, isStarter, parents } = param;
    let selectedEggId = JSON.stringify(id)
    console.log("hereis the ID" + selectedEggId);
    API.getEgg(id).then(res => {
      console.log(res.data);
      var thisEgg = res.data
      this.setState({
        egg: thisEgg
      })
    }).catch(err => {
      console.log(err);
    });
  }

  // handleChange = event => {
  //   this.setState({ eggId: event.target.value })
  //   console.log("oops?")
  // }

  releaseEgg = (egg) => {
    console.log(egg)
    // const eggId = {
    //   id: this.state.egg._id
    // };

    // event.preventDefault();
    // API.deleteEgg(selectedEggId)
    axios.delete(`https://crossbreed-backend.herokuapp.com/api/eggs` + { eggId })
    console.log("here!")
      //  console.log(eggId)
      .then(res => this.goHome())
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
        { text: 'OK', onPress: () => this.releaseEgg() },
      ],
      { cancelable: false },
    )
    return true;
  }

  // const param = props.navigation.getParam('eggId');
  // const { _id, createdOn, isFrozen, isStarter, parents } = param;

  render() {

    //     const param = this.props.navigation.getParam('eggId');
    // const { _id, createdOn, isFrozen, isStarter, parents } = param;
    return (
      <Content style={styles.centeredContent}>
        <Card style={styles.centeredContent}>
          <CardItem>
            <Body>
              <View style={styles.svgContainer}>
                <SlimeEgg height="205" width="200" scale="1.6" />
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
                  // onPress={(eggId) => this.releaseEgg(eggId)}
                  // onPress={this.handleChange}
                  onPress={this.showConfirm}
                >
                  <Text>Release</Text>
                </Button>
              </Row>
              <Text style={{ alignSelf: "center" }}>Created: {this.state.egg.createdOn}</Text>
              {this.parents && <Text style={{ alignSelf: "center" }}> {this.parents.length > 1 ? `Parents: ${this.parents[0].name}, ${this.parents[1].name}` : `Parents: THE WILD`}</Text>}
            </Body>
          </CardItem>
        </Card>
      </Content>
    )
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