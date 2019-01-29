import React from 'react';

import { Image, StyleSheet, View } from 'react-native';
import { Svg } from 'expo';
import { Content, Header, Card, CardItem, Text, Body } from 'native-base';
const { Circle } = Svg;
import SlimeEgg from "../SlimeEgg";

export default EggCard = (props) => {
  const { _id, createdOn, isFrozen, isStarter, parents } = props.data;
  return (
      <Content>
        <Card style={{flex: 1}}>
          <CardItem
            button={true}
            onPress={props.press}
          >
              <Body>
                <View style={{alignSelf: 'center'}}>
                  <SlimeEgg />
                </View>
              </Body>
          </CardItem>
          <CardItem>
            <Body>
            <Text style={{alignSelf: 'center'}}>{createdOn}</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
  );
}