import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Container, Header, Body, Title, Left, Right, Button, Icon, Content } from "native-base";
import GameBoard from '../components/GameBoard';

export default class Match3Screen extends Component {
	static navigationOptions = {
		header: null,
	};

	state = {
		playerScore: 0,
		enemyScore: 0
	};

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
				<Content contentContainerStyle={{ alignItems: "center" }}>
					<Text>Score: { this.state.playerScore }</Text>
					<GameBoard pet={{ color: "red" }} playerScore={ this.state.playerScore } enemyScore={ this.state.enemyScore } updateScore={ this.updateScore }/>
				</Content>
			</Container>
    )
  }
}
