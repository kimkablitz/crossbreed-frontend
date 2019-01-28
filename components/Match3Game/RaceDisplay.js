import React from "react";
import { Grid, Col } from "react-native-easy-grid";
import RaceTrack from "./RaceTrack";

function RaceDisplay(props){
    return (
      <Grid style={{ marginBottom: 10 }}>
        <Col>
            <RaceTrack score={ props.playerScore } petInfo={ props.petInfo }/>
            <RaceTrack score={ props.enemyScore } petInfo={ props.enemyInfo } />
        </Col>
      </Grid>
    )

}

export default RaceDisplay;