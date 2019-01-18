import React from 'react';
import {Linking} from 'react-native';

import { Image, StyleSheet, View } from 'react-native';
import { Svg } from 'expo';
import { Content, Header, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
// export default class RecipeCard extends Component {

// const baseImage = '../assets/images/robot-dev.png';
const { Circle } = Svg;

export default RecipeCard = (props) => {
        const {name, baseColor, outlineColor } = props.data;
        const { red, blue, green, transparency } = baseColor;
    return (
        <Content>
          <Card style={{flex: 1}}>
            <CardItem>
                <Body>
                  <View style={{alignSelf: 'center'}}>
                    <Svg
                        height="100"
                        width="100"
                    >
                        <Circle
                            onPress={props.press}
                            cx="50"
                            cy="50"
                            r="45"
                            fill={`rgba(${red}, ${green},  ${blue}, ${transparency})`}
                            strokeWidth="3"
                            stroke={`rgba(${outlineColor.red}, ${outlineColor.green},  ${outlineColor.blue}, ${outlineColor.transparency})`}
                        />
                    </Svg>
                  </View>
                </Body>
            </CardItem>
            <CardItem>
              <Body>
              <Text style={{alignSelf: 'center'}}>{name}</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
    );
  
}

const styles = StyleSheet.create({
  nameText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,1)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
});