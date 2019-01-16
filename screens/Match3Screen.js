import React, { Component } from 'react';
import { Alert } from "react-native";
import { Container, Header, Body, Title, Left, Right, Button, Icon, Content, H1, Text } from "native-base";
import { Grid, Row } from "react-native-easy-grid";
import { NavigationActions } from 'react-navigation';
import GameBoard from '../components/Match3Game/GameBoard';
import RaceDisplay from "../components/Match3Game/RaceDisplay";
import MyModal from "../components/Modal";

const exampleImg = "https://facebook.github.io/react-native/docs/assets/favicon.png ";
let modalMessage = "";
const examplePet = {
	name: "Red",
	baseImage: "testPet.svg",
	baseColor: {
			red: 255,
			blue: 0,
			green: 0,
			transparency: 1 
	},
	outlineColor: {
			red: 0,
			blue: 0,
			green: 0,
			transparency: 1
	},
	gameColor: {
			primary: "red",
			secondary: "red"
	},
	isFavorite: false,
	parents: [],
	dna: {}, //NOTE: dna will go here soon
};

export default class Match3Screen extends Component {
	static navigationOptions = {
		header: null,
	};

	state = {
		playerScore: 0,
		enemyScore: 0,
		gameStarted: false,
		gameEnded: false,
		petInfo: {}
	};

	componentDidMount(){
		// TODO: add GET request to get Pet info
		this.setState({ petInfo: examplePet });
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
		this.setState({ gameEnded: true });
	}

	showAlert = () => {
		Alert.alert(
			"Are you sure?",
			"Returning to the stable will exit the game, and your pet will not earn any experience points!",
			[
				{ text: "Cancel", style: 'cancel' },
				{ text: "Return to stable", onPress: this.navigateHome }
			]
		)
	}

	navigateHome = () => {
		this.setState({ gameStarted: false }, () => {
			const navigateHome = NavigationActions.navigate({
				routeName: 'Home'});
			this.props.navigation.dispatch(navigateHome);
		});
	}

  render() {
		
		

    return (
			<Container>
        <Header>
          <Left>
            <Button transparent
							onPress={ this.state.gameStarted ? this.showAlert : this.navigateHome }
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
				
					
					{ this.state.gameStarted ? 
						<Content padder scrollEnabled={false} contentContainerStyle={{ justifyContent: "flex-start", alignItems: "center" }}>
							<RaceDisplay playerScore={ this.state.playerScore } enemyScore={ this.state.enemyScore } playerImg={ exampleImg } enemyImg={ exampleImg }/>
							<GameBoard gameEnded={ this.state.gameEnded } pet={ this.state.petInfo } playerScore={ this.state.playerScore } enemyScore={ this.state.enemyScore } updateScore={ this.updateScore }/>
							<MyModal visible={ this.state.gameEnded }>
								<Grid style={{ backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "center", alignItems: "center"}}>
									<Row size={ 2 }>
										<H1 style={{ alignSelf: "center", color: "white" }}> { modalMessage }</H1>
									</Row>
									<Row size={ 1 }>
										<Button success rounded style={{ alignSelf: "center", margin: 5 }}
											onPress={ this.startGame }
										> 
											<Text style={{ color: "white" }}> Play Again </Text> 
										</Button>
										<Button danger rounded style={{ alignSelf: "center", margin: 5 }}
											onPress={ this.navigateHome }
										> 
											<Text style={{ color: "white" }}> Return to Stable </Text> 
										</Button>
									</Row>
								</Grid>
							</MyModal>
						</Content>
					: <Content>
							<Grid>
								<Row size={ 1 } style={{ justifyContent: "center"}}>
									<Text style={{ marginVertical: 10 }}> Play Game </Text>
								</Row>
								<Row size={ 1 } style={{ justifyContent: "center"}}>
									<Button primary rounded style={{ marginVertical: 10}}
										onPress={ this.startGame }
									> 
										<Text>Easy</Text> 
									</Button>
								</Row>
								<Row size={ 2 } style={{ justifyContent: "center"}}>
									<Text style={{ marginVertical: 10}}>Instructions on how to play the game!</Text>
								</Row>
							</Grid>
						</Content>
					}
				
			</Container>
    )
  }
}
