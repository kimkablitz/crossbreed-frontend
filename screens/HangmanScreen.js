import React, { Component } from 'react';
import { Alert, BackHandler, AsyncStorage, StyleSheet } from "react-native";
import { Container, Header, Body, Title, Left, Right, Button, Icon, Content, H2, H3, Text } from "native-base";
import { Grid, Row, Col } from "react-native-easy-grid";
import { NavigationActions, StackActions } from 'react-navigation';
import GameBoard from '../components/Match3Game/GameBoard';
import RaceDisplay from "../components/Match3Game/RaceDisplay";
import MyModal from "../components/Modal";
import API from "../utils/API";
import Alerts from "../utils/Alerts";

export default class HangmanScreen extends Component {
    state = {
        petInfo: {},
        difficultyLevel: "",
        gameEnded: false,
        helpModalVisible: false
    };

    componentWillMount(){
		const difficultyLevel = this.props.navigation.getParam("difficultyLevel");
		const petInfo = this.props.navigation.getParam("petInfo");
		this.backHandler = BackHandler.addEventListener("hardwareBackPress", this.showAlert);
		this.setState({ petInfo: petInfo, difficultyLevel: difficultyLevel });
	}

    showAlert = () => {
        Alerts.exitGame((() => this.navigate("GameLobby")))
    }

    navigate = (routeName) => {
		this.setState({ gameEnded: false }, () => {
			this.backHandler.remove();
			const navigate = NavigationActions.navigate({
				routeName: routeName });
			const reset = StackActions.reset({
				index: 0,
				actions: [NavigationActions.navigate({ routeName: 'GameLobby' })],
			})
			this.props.navigation.dispatch(reset);
			this.props.navigation.dispatch(navigate);
		})
	}

    render(){
        return(
            <Container>
        	    <Header>
        	      <Left style={{ flex: 1 }}>
        	        <Button transparent onPress={ this.showAlert }>
        	          <Icon name='arrow-back' />
        	          <Text> To Lobby </Text>
        	        </Button>
        	      </Left>
        	      <Body style={{ flex: 1 }}>
        	        <Title>Hangman</Title>
        	      </Body>
			      <Right style={{ flex: 1 }}>
			      	<Button transparent onPress={ () => this.setState({ helpModalVisible: true }) }>
			    		<Icon name='help-circle-outline'/>
			    	</Button>
			      </Right>
        	    </Header>	
                <MyModal visible={ this.state.helpModalVisible }>
					<Grid style={{ backgroundColor: "rgba(0,0,0,0.9)", justifyContent: "center", alignItems: "center"}}>
						<Row size={ 1 } >
							<H2 style={{ alignSelf: "center", color: "white", textAlign: "center" }}>
								Play Hangman with your pet!
							</H2>
						</Row>
						<Row size={ 1 }>
							<Button onPress={ () => this.setState({ helpModalVisible: false }) }>
								<Text>Close</Text>
							</Button>
						</Row>
					</Grid>
				</MyModal>
            </Container>
        )
    }
}