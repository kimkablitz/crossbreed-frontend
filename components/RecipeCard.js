import React from 'react';
import {Linking} from 'react-native';

import { Image } from 'react-native';
import { Svg } from 'expo';
import { Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
// export default class RecipeCard extends Component {

// const baseImage = '../assets/images/robot-dev.png';
const { Circle } = Svg;

export default RecipeCard = (props) => {
        // console.log(props)
        const {name, baseColor } = props.data;
        console.log(baseColor);
        const { red, blue, green, transparency } = baseColor;
    return (
        <Content>
          <Card style={{flex: 0, height: 190}}>
            <CardItem>
              {/* <Left> */}
                {/* <Thumbnail large source={require('../assets/images/testPet.svg')} /> */}
                <Body>
                  {/* <Text>Name: {name}</Text> */}
                  <Svg
                      height="100"
                      width="100"
                  >
                      <Circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill={`rgba(${red}, ${green},  ${blue}, ${transparency})`}
                          strokeWidth="3"
                          stroke="rgb(0,0,0)"
                      />
                  </Svg>
                </Body>
              {/* </Left> */}
            </CardItem>
            <CardItem>
              <Body>
              <Text>{name}</Text>
                {/* <Image source={{uri: '././assets/images'}} style={{height: 200, width: 200, flex: 1}}/> */}
              </Body>
            </CardItem>
          </Card>
        </Content>
    );
  
}