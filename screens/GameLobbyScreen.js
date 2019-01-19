import React, { Component } from 'react';
import { Container, Header, Body, Title, Content, Left, Right, Button, Text, Icon } from "native-base";
import { Grid, Row } from "react-native-easy-grid";
import { NavigationActions } from "react-navigation";

class GameLobbyScreen extends Component {
    constructor(props){
        super(props);
    }

    startGame = (difficultyLevel) => {
        const navigateToGame = NavigationActions.navigate({
            routeName: "Match3Game",
            params: { difficultyLevel: difficultyLevel }
        });
        this.props.navigation.dispatch(navigateToGame);
    }

    render(){
        return (
            <Container>
                <Header>
        	        <Body>
        	          <Title>Game Lobby</Title>
        	        </Body>
        	    </Header>
                <Content>
                    <Grid style={{ alignItems: "center" }}>
                        <Row size={ 1 }>
                            <Text style={{ marginVertical: 10 }}> Choose a difficulty level! </Text>
                        </Row>
                        <Row size={ 1 } >
                            <Button success rounded style={{ margin: 10}}
                                onPress={ () => this.startGame("easy") }
                            > 
                                <Text>Easy</Text> 
                            </Button>
                            <Button primary rounded style={{ margin: 10}}
                                onPress={ () => this.startGame("normal") }
                            > 
                                <Text>Normal</Text> 
                            </Button>
                            <Button danger rounded style={{ margin: 10}}
                                onPress={ () => this.startGame("hard") }
                            > 
                                <Text>Hard</Text> 
                            </Button>
                        </Row>
                        <Row size={ 2 }>
                            <Text style={{ marginVertical: 10}}> Choose a Pet! </Text>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        )
    }
}

export default GameLobbyScreen;