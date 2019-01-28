import React from "react";
import { Grid, Col } from "react-native-easy-grid";
import RaceTrack from "./RaceTrack";

function randomColor(){
  return Math.floor(Math.random() * 256);
}

function randomEnemy(){
  return enemySlime = {
    outlineColor: {
      blue: randomColor(),
      green: randomColor(),
      red: randomColor(),
      transparency: 1
    },
    baseColor: {
      blue: randomColor(),
      green: randomColor(),
      red: randomColor(),
      transparency: 1
    }
  }
}

function RaceDisplay(props){
    return (
      <Grid style={{ marginBottom: 10 }}>
        <Col>
            <RaceTrack score={ props.playerScore } petInfo={ props.petInfo}/>
            <RaceTrack score={ props.enemyScore } petInfo={ randomEnemy() } />
        </Col>
      </Grid>
    )

}

export default RaceDisplay;