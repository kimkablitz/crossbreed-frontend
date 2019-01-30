import React from 'react';

import { Image, StyleSheet, View } from 'react-native';
import { Svg } from 'expo';
import { Content, Header, Card, CardItem, Text, Body } from 'native-base';
const { Circle } = Svg;
import SlimeEgg from "../SlimeEgg";
import { convertMongoDateToPST } from "../../utils/action"

export default EggCard = (props) => {
  const { _id, createdOn, } = props.data;
  const lifeStage = props.lifeStage;
  return (
        <Card style={{flex: 1}}>
          <CardItem
            button={true}
            onPress={props.press}
          >
              <Body>
                <View style={{alignSelf: 'center'}}>
                {/* NOTE: we need to pass the prop 'lifeStage' to change icon...'egg', 'incubating', or 'readyToHatch' */}
                  <SlimeEgg height="128" width="100" lifeStage={lifeStage} />
                </View>
              </Body>
          </CardItem>
          <CardItem>
            <Body>
            <Text style={{alignSelf: 'center'}}>{ convertMongoDateToPST (createdOn)}</Text>
            </Body>
          </CardItem>
        </Card>
  );
}