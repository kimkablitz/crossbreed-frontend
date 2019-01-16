import React, { Component } from 'react';
import { Container, Header, Body, Title, Left, Right, Button, Icon, Content, H1, Text } from "native-base";
import { Grid, Row } from "react-native-easy-grid";
import { StackActions, NavigationActions } from 'react-navigation';
import GameBoard from '../components/Match3Game/GameBoard';
import RaceDisplay from "../components/Match3Game/RaceDisplay";
import MyModal from "../components/Modal";

const exampleImg = "https://facebook.github.io/react-native/docs/assets/favicon.png ";
let modalMessage = "";

export default class Match3Screen extends Component {
	static navigationOptions = {
		header: null,
	};

	state = {
		playerScore: 0,
		enemyScore: 0,
		gameStarted: false,
		gameEnded: false
	};

	componentDidMount(){
		// TODO: add GET request to get Pet info
		
		// TODO: add GET request to get random enemy 
		
	}

	updateScore = (newScore) => {
		const [ name, value ] = newScore;
		if(!this.state.gameEnded){
    	this.setState({ [name] : value }, () => {
				if(value >= 100){
					this.endGame(name);
				}
			});
		}
	}
	
	startGame = () => {
		this.setState({ gameStarted: true, gameEnded: false, playerScore: 0, enemyScore: 0 });
	}

	endGame = (name) => {
		if(name === "playerScore"){
			modalMessage = "You Won!"
		}
		else{
			modalMessage = "You Lost!"
		}
		this.setState({ gameEnded: true, gameStarted: false });
	}

  render() {
		const navigateHome = NavigationActions.navigate({
			routeName: 'Home'});
		

    return (
			<Container>
        <Header>
          <Left>
            <Button transparent
							onPress={ () => {this.props.navigation.dispatch(navigateHome) }}
						>
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
					<MyModal visible={ this.state.gameEnded }>
						<Grid style={{ backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "center", alignItems: "center"}}>
							<Row size={ 2 }>
								<H1 style={{ alignSelf: "center", color: "white" }}> { modalMessage }</H1>
							</Row>
							<Row size={ 1 }>
								<Button danger rounded style={{ alignSelf: "center", margin: 5 }}
									onPress={ this.startGame }
								> 
									<Text style={{ color: "white" }}> Play Again </Text> 
								</Button>
								<Button success rounded style={{ alignSelf: "center", margin: 5 }}
									onPress={ () => this.setState({ gameEnded: false}, () => {this.props.navigation.dispatch(navigateHome) })}
								> 
									<Text style={{ color: "white" }}> Return to Stable </Text> 
								</Button>
							</Row>
						</Grid>
					</MyModal>
					<RaceDisplay playerScore={ this.state.playerScore } enemyScore={ this.state.enemyScore } playerImg={ exampleImg } enemyImg={ exampleImg }/>
					<GameBoard startGame={ this.state.gameStarted } pet={{ color: "red" }} playerScore={ this.state.playerScore } enemyScore={ this.state.enemyScore } updateScore={ this.updateScore }/>
				</Content>
			</Container>
    )
  }
}
