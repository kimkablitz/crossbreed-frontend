import React from 'react'
import { Row, Col } from "react-native-easy-grid";
import { View } from "react-native";
import { Svg } from "expo";

const { Circle } = Svg;

function RaceTrack(props) {
    const { baseColor, outlineColor } = props.petInfo;
    const { red, blue, green, transparency } = baseColor;

    return (
      <Row style={{ alignItems: "center", marginVertical: 20 }}>
          <Col>
            <Row style={{ height: 20, alignItems: "center", borderColor: "black", borderWidth: 0.5, borderRadius: 50, marginLeft: 50}}>
                <Row style={{ height: "100%", backgroundColor: "black", width: `${props.score}%`, borderRadius: 50, maxWidth: "100%" }}/>
                {/* <Image source={{ uri: "https://facebook.github.io/react-native/docs/assets/favicon.png" }} style={{width: 50, height: 50, left: -50}} /> */}
                <View style={{ left: -50 }}>
                    <Svg
                        height="50"
                        width="50"
                    >
                        <Circle
                            onPress={props.press}
                            cx="25"
                            cy="25"
                            r="24"
                            fill={`rgba(${red}, ${green},  ${blue}, ${transparency})`}
                            strokeWidth="2"
                            stroke={`rgba(${outlineColor.red}, ${outlineColor.green},  ${outlineColor.blue}, ${outlineColor.transparency})`}
                        />
                    </Svg>
                </View>
            </Row>
          </Col>
      </Row>
    )

}

export default RaceTrack;