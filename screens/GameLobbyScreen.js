import React, { Component } from 'react';
import { AsyncStorage } from "react-native";
import { Container, Header, Body, Title, Content, Button, Text } from "native-base";
import { Grid, Row, Col } from "react-native-easy-grid";
import { NavigationActions } from "react-navigation";
import RecipeCard from "../components/RecipeCard";

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
        (async () => {
            try {
              const user = await AsyncStorage.getItem('user');
              const pets = await AsyncStorage.getItem('pets');
              if (user !== null && pets !== null) {
                // We have data!!
                let userInfo = JSON.parse(user);
                let userPets = JSON.parse(pets);
                console.log('userInfo: ' + userInfo);
                console.log('pets: ' + userPets);
                this.setState({ userPets: userPets, selectedPet: this.props.navigation.getParam("pet", userPets[0]) });
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
                <Content>
                    <Grid style={{ alignItems: "center" }}>
                        <Row size={ 1 }>
                            <Button rounded info style={{ margin: 10 }} 
                                onPress={ () => this.startGame() }
                            >
                                <Text>Start Game</Text>
                            </Button>
                        </Row>
                        <Row size={ 1 }>
                            <Text style={{ marginVertical: 10 }}> Choose a difficulty level: </Text>
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
                        <Row size={ 2 }>
                            <Text style={{ marginVertical: 10}}> Choose a Pet: </Text>
                        </Row>
                        <Row style={{ flexWrap: "wrap", justifyContent: 'space-evenly' }} > 
                          {this.state.userPets.map( (stall, index) => {
                            const borderColor = this.state.selectedPet.name === stall.name ? "grey" : "white"
                            return (<Col key={stall.name} style={{width: 150, borderWidth: 5, borderColor: borderColor }} >
                              <RecipeCard key={index} data={stall} press={() => this.setPet(stall) } />
                            </Col>)
                          })}
                        </Row>
                    </Grid>
                </Content>
            </Container>
        )
    }
}

