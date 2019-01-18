import React from 'react'
import { Row, Col } from "react-native-easy-grid";
import { Image } from "react-native";

function RaceTrack(props) {
    return (
      <Row style={{ alignItems: "center", marginVertical: 20 }}>
          <Col>
            <Row style={{ height: 20, alignItems: "center", borderColor: "black", borderWidth: "1px", borderRadius: "50px", marginLeft: 50}}>
                <Row style={{ height: "100%", backgroundColor: "black", width: `${props.score}%`, borderRadius: "50px 0px 0px 50px", maxWidth: "100%" }}/>
                <Image source={{ uri: "https://facebook.github.io/react-native/docs/assets/favicon.png" }} style={{width: 50, height: 50, left: -50}} />
            </Row>
          </Col>
      </Row>
    )

}

export default RaceTrack;