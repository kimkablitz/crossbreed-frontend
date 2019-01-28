import React from 'react';

import { Image, StyleSheet, View } from 'react-native';
import { Svg } from 'expo';
import { Content, Header, Card, CardItem, Text, Body } from 'native-base';
const { Circle, Path, G } = Svg;
import SlimePet from '../SlimePet';

export default PetCard = (props) => {
  const { name, baseColor, outlineColor } = props.data;
  return (
    <Content>
      <Card style={{ flex: 1 }}>
        <CardItem
          button={true}
          onPress={props.press}
        >
          <Body>
            <View style={{ alignSelf: 'center' }}>
             <SlimePet baseColor={baseColor} outlineColor={outlineColor} height="100" width="100" scale="0.80"/>
            </View>
          </Body>
        </CardItem>
        <CardItem>
          <Body>
            <Text style={{ alignSelf: 'center' }}>{name}</Text>
          </Body>
        </CardItem>
      </Card>
    </Content>
  );
}