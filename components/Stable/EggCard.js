import React from 'react';

import { Image, StyleSheet, View } from 'react-native';
import { Svg } from 'expo';
import { Content, Header, Card, CardItem, Text, Body } from 'native-base';
const { Circle } = Svg;

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
                  <Svg
                      height="100"
                      width="100"
                  >
                      <Circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="aqua"
                          strokeWidth="3"
                          stroke="pink"
                      />
                  </Svg>
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