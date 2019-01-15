import React, { Component } from 'react';
import { Text } from 'react-native';
import { Container, Header, Body, Title, Left, Right, Button, Icon, Content } from "native-base";
import GameBoard from '../components/Match3Game/GameBoard';
import RaceDisplay from "../components/Match3Game/RaceDisplay";

const exampleImg = "https://facebook.github.io/react-native/docs/assets/favicon.png ";


export default class Match3Screen extends Component {
	static navigationOptions = {
		header: null,
	};

	state = {
		playerScore: 0,
		enemyScore: 0
	};

	componentDidMount(){
		// TODO: add GET request to get Pet info
		
		// TODO: add GET request to get random enemy 
		
	}

	updateScore = (newScore) => {
		const [ name, value ] = newScore;
    this.setState({ [name] : value });
  }

  render() {
    return (
			<Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
              <Text> To Stable </Text>
            </Button>
          </Left>
          <Body>
            <Title>Match 3</Title>
          </Body>
          <Right />
        </Header>
				<Content padder contentContainerStyle={{ justifyContent: "flex-start", alignItems: "center" }}>
					<RaceDisplay playerScore={ this.state.playerScore } enemyScore={ this.state.enemyScore } playerImg={ exampleImg } enemyImg={ exampleImg }/>
					<GameBoard pet={{ color: "red" }} playerScore={ this.state.playerScore } enemyScore={ this.state.enemyScore } updateScore={ this.updateScore }/>
				</Content>
			</Container>
    )
  }
}
