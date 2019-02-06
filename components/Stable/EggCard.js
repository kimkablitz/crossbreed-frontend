import React from 'react';

import { Image, StyleSheet, View } from 'react-native';
import { Svg } from 'expo';
import { Content, Header, Card, CardItem, Text, Body } from 'native-base';
const { Circle } = Svg;
import SlimeEgg from "../SlimeEgg";
import { convertMongoDateToPST, convertUnixToTime } from "../../utils/action"
import moment from "moment";

export default EggCard = (props) => {
  const { createdOn, lifeStage, willHatchOn } = props.data;

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
            {willHatchOn 
              ? <Text style={{ alignSelf: "center", textAlign: "center" }}> Hatch Time: { convertUnixToTime(willHatchOn) }</Text>
              : <Text style={{alignSelf: 'center', textAlign: "center"}}> Created: { convertMongoDateToPST (createdOn)}</Text> }
            </Body>
          </CardItem>
        </Card>
  );
}