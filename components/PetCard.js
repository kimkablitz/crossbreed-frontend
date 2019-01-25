import React from 'react';

import { Image, StyleSheet, View } from 'react-native';
import { Svg } from 'expo';
import { Content, Header, Card, CardItem, Text, Body } from 'native-base';
const { Circle } = Svg;

export default PetCard = (props) => {
  const {name, baseColor, outlineColor } = props.data;
  const { red, blue, green, transparency } = baseColor;
  return (
      <Content>
        <Card style={{flex: 1}}>
          <CardItem
            button={true}
            onPress={props.press}
          >
              <Body>
                <View style={{alignSelf: 'center'}}>
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