import React from 'react'
import { Row, Col } from "react-native-easy-grid";
import { View } from "react-native";
import SlimePet from "../SlimePet";

function RaceTrack(props) {
    const { baseColor, outlineColor } = props.petInfo;
    const { red, blue, green } = baseColor;

    return (
      <Row style={{ alignItems: "center", marginVertical: 20 }}>
          <Col>
            <Row style={{ height: 20, alignItems: "center", borderColor: "black", borderWidth: 0.5, borderRadius: 50, marginLeft: 50}}>
                <Row style={{ height: "100%", backgroundColor: `rgb(${red}, ${green}, ${blue})`, width: `${props.score}%`, borderRadius: 50, maxWidth: "100%" }}/>
                <View style={{ left: -47 }}>
                    <SlimePet baseColor={baseColor} outlineColor={outlineColor} height="50" width="50" scale="0.4"/>
                </View>
            </Row>
          </Col>
      </Row>
    )

}

export default RaceTrack;