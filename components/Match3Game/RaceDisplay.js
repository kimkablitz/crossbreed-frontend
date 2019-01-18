import React from "react";
import { Grid, Col } from "react-native-easy-grid";
import RaceTrack from "./RaceTrack";

function RaceDisplay(props){
    return (
      <Grid style={{ marginBottom: 10 }}>
        <Col>
            <RaceTrack score={ props.playerScore } img={ props.playerImg } />
            <RaceTrack score={ props.enemyScore } img={ props.enemyImg }/>
        </Col>
      </Grid>
    )

}

export default RaceDisplay;