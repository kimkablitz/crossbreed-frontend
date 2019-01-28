import React from 'react';

import { View } from 'react-native';
import { Svg } from 'expo';
import { Content, Card, CardItem, Text, Body } from 'native-base';
const { Circle } = Svg;

export default TinyPetCard = (props) => {
  const { name, baseColor, outlineColor } = props.data;
  return (
<<<<<<< HEAD
      <Content >
        <Card style={{flex: 1}}>
          <CardItem
            button={true}
            onPress={props.press}
          >
              <Body>
                <View style={{alignSelf: 'center'}} >
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
              </Svg>
                </View>
              </Body>
          </CardItem>
            <Text style={{alignSelf: 'center', marginBottom: 5}}>{name}</Text>
        </Card>
      </Content>
=======
    <Content >
      <Card style={{ flex: 1 }}>
        <CardItem
          button={true}
          onPress={props.press}
        >
          <Body>
            <View style={{ alignSelf: 'center' }} >
              <SlimePet baseColor={baseColor} outlineColor={outlineColor} height="60" width="60" scale="0.5" transformX="-40" transformY="-10" />
            </View>
          </Body>
        </CardItem>
        <Text style={{ alignSelf: 'center', textAlign: 'center', marginBottom: 5 }}>{name}</Text>
      </Card>
    </Content>
>>>>>>> 8b595e7902affc0dfd7c94fb501015b204444e66
  );
}