import React from 'react';

import { View } from 'react-native';
import { Svg } from 'expo';
import { Content, Card, CardItem, Text, Body } from 'native-base';
const { Circle } = Svg;

export default TinyPetCard = (props) => {
  const { name, baseColor, outlineColor } = props.data;
  return (
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
  );
}