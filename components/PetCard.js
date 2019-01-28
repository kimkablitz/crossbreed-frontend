import React from 'react';

import { Image, StyleSheet, View } from 'react-native';
import { Svg } from 'expo';
import { Content, Header, Card, CardItem, Text, Body } from 'native-base';
<<<<<<< HEAD
const { Circle, G, Path, Defs } = Svg;

export default PetCard = (props) => {
  const { name, baseColor, outlineColor } = props.data;
  const { red, blue, green, transparency } = baseColor;
=======
const { Circle, Path, G } = Svg;
import SlimePet from './SlimePet';

export default PetCard = (props) => {
  const { name, baseColor, outlineColor } = props.data;
>>>>>>> 8b595e7902affc0dfd7c94fb501015b204444e66
  return (
    <Content>
      <Card style={{ flex: 1 }}>
        <CardItem
          button={true}
          onPress={props.press}
        >
          <Body>
            <View style={{ alignSelf: 'center' }}>
<<<<<<< HEAD
              <Svg
                height="100"
                width="100">

                <Circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill={`rgba(${red}, ${green},  ${blue}, ${transparency})`}
                  strokeWidth="3"
                  stroke={`rgba(${outlineColor.red}, ${outlineColor.green},  ${outlineColor.blue}, ${outlineColor.transparency})`}
                />
                
                <Circle
                  cx="35"
                  cy="40"
                  r="5"
                  fill={`rgba(${outlineColor.red}, ${outlineColor.green},  ${outlineColor.blue}, ${outlineColor.transparency})`}
                  strokeWidth="1"
                  stroke={`rgba(${outlineColor.red}, ${outlineColor.green},  ${outlineColor.blue}, ${outlineColor.transparency})`}
                />
                
                <Circle
                  cx="65"
                  cy="40"
                  r="5"
                  fill={`rgba(${outlineColor.red}, ${outlineColor.green},  ${outlineColor.blue}, ${outlineColor.transparency})`}
                  strokeWidth="1"
                  stroke={`rgba(${outlineColor.red}, ${outlineColor.green},  ${outlineColor.blue}, ${outlineColor.transparency})`}
                />

                {/*   <Circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill={`rgba(${red}, ${green},  ${blue}, ${transparency})`}
                          strokeWidth="3"
                          stroke={`rgba(${outlineColor.red}, ${outlineColor.green},  ${outlineColor.blue}, ${outlineColor.transparency})`}
                      /> */}
              </Svg>
=======
             <SlimePet baseColor={baseColor} outlineColor={outlineColor} height="100" width="100" scale="0.80"/>
>>>>>>> 8b595e7902affc0dfd7c94fb501015b204444e66
            </View>
          </Body>
        </CardItem>
        <CardItem>
          <Body>
            <Text style={{ alignSelf: 'center' }}>{name}</Text>
          </Body>
        </CardItem>
      </Card>
<<<<<<< HEAD
    </Content >
=======
    </Content>
>>>>>>> 8b595e7902affc0dfd7c94fb501015b204444e66
  );
}