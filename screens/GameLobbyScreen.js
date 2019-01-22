import React, { Component } from 'react';
import { Container, Header, Body, Title, Content, Left, Right, Button, Text, Icon } from "native-base";
import { Grid, Row, Col } from "react-native-easy-grid";
import { NavigationActions } from "react-navigation";
import RecipeCard from "../components/RecipeCard";

class GameLobbyScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            difficulty: "easy",
            userPets: [],
            selectedPet: {}
        }
    }

    componentDidMount(){
        const pets = [
            {
                name: "Red",
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
                parents: ["The Wild"],
                level: 1,
                experiencePoints: 42
            },
            {
                name: "Blue",
                baseColor: {
                    red: 0,
                    blue: 255,
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
                    primary: "blue",
                    secondary: "blue"
                },
                isFavorite: false,
                parents: ["Bob", "Mary"],
                level: 2,
                experiencePoints: 42
            },
            {
                name: "Green",
                baseColor: {
                    red: 0,
                    blue: 0,
                    green: 255,
                    transparency: 1 
                },
                outlineColor: {
                    red: 0,
                    blue: 0,
                    green: 0,
                    transparency: 1
                },
                gameColor: {
                    primary: "green",
                    secondary: "green"
                },
                isFavorite: false,
                parents: ["Frank", "Sue"],
                level: 3,
                experiencePoints: 42
            },
            {
                name: "Magenta",
                baseColor: {
                    red: 255,
                    blue: 255,
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
                    primary: "magenta",
                    secondary: "magenta"
                },
                isFavorite: false,
                parents: ["Matilda", "Madison"],
                level: 6,
                experiencePoints: 42
            },
            {
                name: "Cyan",
                baseColor: {
                    red: 0,
                    blue: 255,
                    green: 255,
                    transparency: 1 
                },
                outlineColor: {
                    red: 0,
                    blue: 0,
                    green: 0,
                    transparency: 1
                },
                gameColor: {
                    primary: "cyan",
                    secondary: "cyan"
                },
                isFavorite: false,
                parents: ["Goldie", "Blackie"],
                level: 10,
                experiencePoints: 42
            },
            {
                name: "Yellow",
                baseColor: {
                    red: 255,
                    blue: 0,
                    green: 255,
                    transparency: 1 
                },
                outlineColor: {
                    red: 0,
                    blue: 0,
                    green: 0,
                    transparency: 1
                },
                gameColor: {
                    primary: "yellow",
                    secondary: "yellow"
                },
                isFavorite: false,
                parents: ["The Wild"],
                level: 15,
                experiencePoints: 42
            },
            {
                name: "White",
                baseColor: {
                    red: 255,
                    blue: 255,
                    green: 255,
                    transparency: 1 
                },
                outlineColor: {
                    red: 0,
                    blue: 0,
                    green: 0,
                    transparency: 1
                },
                gameColor: {
                    primary: "white",
                    secondary: "white"
                },
                isFavorite: false,
                parents: ["The Wild"],
                level: 20,
                experiencePoints: 42
            },
            {
                name: "Black",
                baseColor: {
                    red: 0,
                    blue: 0,
                    green: 0,
                    transparency: 1 
                },
                outlineColor: {
                    red: 255,
                    blue: 255,
                    green: 255,
                    transparency: 1
                },
                gameColor: {
                    primary: "black",
                    secondary: "black"
                },
                isFavorite: false,
                parents: ["The Wild"],
                level: 1,
                experiencePoints: 42
            }
        ]
        this.setState({ userPets: pets, selectedPet: pets[0] });
    }

    setDifficulty = (difficultyLevel) => {
        this.setState({ difficulty: difficultyLevel });
    }

    setPet = (petInfo) => {
        this.setState({ selectedPet: petInfo });
    }

    startGame = () => {
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

export default GameLobbyScreen;