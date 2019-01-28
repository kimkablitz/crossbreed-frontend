import React from 'react';

import { StyleSheet, View } from 'react-native';
import { Svg } from 'expo';
import { Content, Card, CardItem, Text, Button, Body } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { NavigationActions, StackActions } from 'react-navigation';
const { Circle } = Svg;

export default EggScreen = (props) => {
  const param = props.navigation.getParam('egg');
  const { _id, createdOn, isFrozen, isStarter, parents } = param;

  return (
      <Content style={styles.centeredContent}>
        <Card style={styles.centeredContent}>
          <CardItem>
              <Body>
                <View style={styles.svgContainer}>
                  <Svg
                      height="200"
                      width="200"
                  >
                      <Circle
                          cx="100"
                          cy="100"
                          r="95"
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
              <Row style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <Button success rounded style={{ flex: 1, margin: 10 }}
                    onPress={ () => this.hatchEgg(egg) }
                > 
                    <Text>Hatch</Text> 
                </Button>
                <Button danger rounded style={{ flex: 1, margin: 10}}
                    onPress={ () => this.releaseEgg(egg) }
                > 
                    <Text>Release</Text> 
                </Button>
              </Row>
              <Text style={{alignSelf: "center"}}>Created: {createdOn}</Text>
              {parents && <Text style={{alignSelf: "center"}}> { parents.length > 1 ? `Parents: ${parents[0].name}, ${parents[1].name}` : `Parents: THE WILD` }</Text>}
            </Body>
          </CardItem>
        </Card>
      </Content>
  );
}

const styles = StyleSheet.create({
  nameText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,1)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  centeredContent: {
    alignContent: 'center',
    flex: 1,
  },
  svgContainer: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  }
});