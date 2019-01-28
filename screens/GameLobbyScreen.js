import React, { Component } from 'react';
import { AsyncStorage, ScrollView, View } from "react-native";
import { Container, Header, Body, Title, Content, Button, Text } from "native-base";
import { Grid, Row, Col } from "react-native-easy-grid";
import { NavigationActions } from "react-navigation";
import PetCard from "../components/Stable/PetCard";
import API from "../utils/API";

export default class GameLobbyScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            difficulty: "easy",
            userPets: [],
            selectedPet: {}
        }
    }

    componentWillMount(){
        // First time this screen loads, grab all the locally stored user/pet data
        // Need to add in API call to generate/grab random enemy 
        (async () => {
            try {
              const user = await AsyncStorage.getItem('user');
              if (user !== null) {
                // We have data!!
                let userInfo = JSON.parse(user);
                this.setState({ userPets: userInfo.pets, selectedPet: this.props.navigation.getParam("pet", userInfo.pets[0]) });
              }
             } catch (error) {
               // Error retrieving data
             }
        })()  
    }

    componentWillReceiveProps(nextProps){
        // IF the screen receives a new pet param, then set the selectedPet state to the new pet
        if(nextProps.navigation.state.params.pet){
            this.setState({ selectedPet: nextProps.navigation.getParam("pet", this.state.userPets[0])});
        }
    }

    setDifficulty = (difficultyLevel) => {
        this.setState({ difficulty: difficultyLevel });
    }

    setPet = (petInfo) => {
        this.setState({ selectedPet: petInfo });
    }

    startGame = () => {
        // Navigates to the actual game page, passing the difficulty and selectedPet as params
        const navigateToGame = NavigationActions.navigate({
            routeName: "Match3Game",
            params: { difficultyLevel: this.state.difficulty, petInfo: this.state.selectedPet }
        });
        this.props.navigation.dispatch(navigateToGame);
    }

    render(){
        return (
            <Container>
                <Header>
        	        <Body>
        	          <Title style={{ alignSelf: "center" }}>Game Lobby</Title>
        	        </Body>
        	    </Header>
                <View style={{ flex: 1 }}>
                    <Grid style={{ alignItems: "center", flex: 1 }}>
                        <Row size={ 2 }>
                            <Button rounded info style={{ margin: 10, alignSelf: "center" }} 
                                onPress={ () => this.startGame() }
                            >
                                <Text>Start Game</Text>
                            </Button>
                        </Row>
                        <Row size={ 1 }>
                            <Text style={{ marginTop: 20 }}> Choose a difficulty level: </Text>
                        </Row>
                        <Row size={ 1 } >
                            <Button success bordered={ this.state.difficulty === "easy" ? false : true } rounded style={{ margin: 10}}
                                onPress={ () => this.setDifficulty("easy") }
                            > 
                                <Text>Easy</Text> 
                            </Button>
                            <Button primary bordered={ this.state.difficulty === "normal" ? false : true } rounded style={{ margin: 10}}
                                onPress={ () => this.setDifficulty("normal") }
                            > 
                                <Text>Normal</Text> 
                            </Button>
                            <Button danger bordered={ this.state.difficulty === "hard" ? false : true } rounded style={{ margin: 10}}
                                onPress={ () => this.setDifficulty("hard") }
                            > 
                                <Text>Hard</Text> 
                            </Button>
                        </Row>
                        <Row size={ 1 }>
                            <Text style={{ marginTop: 20 }}> Choose a Pet: </Text>
                        </Row>
                    </Grid>
                        <ScrollView style={{ flex: 1 }}>
                            <Row style={{ flexWrap: "wrap", justifyContent: 'space-evenly' }} > 
                              {this.state.userPets.map( (stall, index) => {
                                const borderColor = this.state.selectedPet._id === stall._id ? "grey" : "white"
                                return (<Col key={stall._id} style={{width: 150, borderWidth: 5, borderColor: borderColor }} >
                                  <PetCard key={index} data={stall} press={() => this.setPet(stall) } />
                                </Col>)
                              })}
                            </Row>
                        </ScrollView>
                    
                </View>
            </Container>
        )
    }
}

