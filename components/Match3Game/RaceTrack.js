import React from 'react'
import { Row, Col } from "react-native-easy-grid";
import { Image } from "react-native";

function RaceTrack(props) {
    return (
      <Row style={{ alignItems: "center", marginVertical: 10 }}>
          <Col size={ 1 }>
            <Image source={{ uri: "https://facebook.github.io/react-native/docs/assets/favicon.png" }} style={{width: 50, height: 50}} />
          </Col>
          <Col size={ 3 }>
            <Row style={{ height: 20, borderColor: "black", borderWidth: "1px", borderRadius: "50px"}}>
                <Row style={{ height: "100%", backgroundColor: "black", width: `${props.score}%`, borderRadius: "50px", maxWidth: "100%" }}/>
            </Row>
          </Col>
      </Row>
    )

}

export default RaceTrack;