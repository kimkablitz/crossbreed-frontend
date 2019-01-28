import React from 'react';

import { View } from 'react-native';
import { Svg } from 'expo';
import { Content, Card, CardItem, Text, Body } from 'native-base';
const { Circle } = Svg;

export default TinyPetCard = (props) => {
  const {name, baseColor, outlineColor } = props.data;
  const { red, blue, green, transparency } = baseColor;
  return (
      <Content >
        <Card style={{flex: 1}}>
          <CardItem
            button={true}
            onPress={props.press}
          >
              <Body>
                <View style={{alignSelf: 'center'}} >
                  <Svg
                      height="50"
                      width="50"
                  >
                      <Circle
                          cx="25"
                          cy="25"
                          r="22"
                          fill={`rgba(${red}, ${green},  ${blue}, ${transparency})`}
                          strokeWidth="2"
                          stroke={`rgba(${outlineColor.red}, ${outlineColor.green},  ${outlineColor.blue}, ${outlineColor.transparency})`}
                      />
                  </Svg>
                </View>
              </Body>
          </CardItem>
            <Text style={{alignSelf: 'center', textAlign: 'center', marginBottom: 5}}>{name}</Text>
        </Card>
      </Content>
  );
}