import React from 'react';
import API from '../utils/API';
import validator from '../utils/validation';
import Alerts from "../utils/Alerts";
import { StyleSheet, View, KeyboardAvoidingView, AsyncStorage, Alert } from 'react-native';
import { Svg } from 'expo';
import { Content, Card, CardItem, Text, Button, Header, Body, Title, Item, Input } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { NavigationActions } from 'react-navigation';
const { Circle } = Svg;
import SlimePet from "../components/SlimePet";

export default class PetScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state = {
            pet: {},
            editing: false,
            nameInput: ""
        },
        this.currentPetNumber
    }

    componentDidMount(){
        this.props.navigation.addListener(
            "willFocus",
            () => {
                this.getPetData();
            }
        )
    }

    getPetData = () => {
        const id = this.props.navigation.getParam('pet');
        this.currentPetNumber = this.props.navigation.getParam('currentPetNumber');
        console.log(id);
        API.getPet(id).then(res => {
            console.log(res.data);
            var thisPet = res.data
            this.setState({
                pet: thisPet,
                nameInput: thisPet.name
            })
        }).catch(err => {
            console.log(err);
        });
    }

    releasePet = (pet) => {
        console.log("pet id: " + pet);
        // event.preventDefault();
        API.deletePet(pet)
     
          .then(res => {
            AsyncStorage.getItem("user").then( user => {
              user = JSON.parse(user);
              user.pets = user.pets.filter( pet => {
                if (pet._id !== this.state.pet._id){
                  return pet;
                }
              });
              AsyncStorage.setItem("user", JSON.stringify(user)).then(() =>{
                Alerts.singleButtonError("Done!", `${this.state.pet.name} has been released to the wild!`);
                this.goHome();
              })
            })
          })
          .catch(() => {
              Alerts.singleButtonError("Error", "Something went wrong, please try again!");
          })
      }
      goHome = () => {
        const navigateHome = NavigationActions.navigate({
            routeName: "Home",
        });
        this.props.navigation.dispatch(navigateHome);
    }

    showConfirm = () => {
        Alert.alert(
            'Are you sure you want to remove this Pet?',
            'Removal is permanent and cannot be undone',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Remove pet', onPress: () => this.releasePet(this.state.pet._id) },
            ],
            { cancelable: false },
        )
        return true;
    }


    toGameLobby = (pet) => {
        const navigateToGameLobby = NavigationActions.navigate({
            routeName: "GameLobby",
            params: { pet: pet }
        });
        // Adds 3 seconds to Android devices
        // const reset = StackActions.reset({
        //   index: 0,
        //   actions: [NavigationActions.navigate({ routeName: 'Home' })],
        // });
        // this.props.navigation.dispatch(reset);
        this.props.navigation.dispatch(navigateToGameLobby);
    }

    toBreedPage = (pet) => {
        const navigateToGameLobby = NavigationActions.navigate({
            routeName: "Breed",
            params: { pet: pet }
        });
        // Adds 3 seconds to Android devices
        // const reset = StackActions.reset({
        //   index: 0,
        //   actions: [NavigationActions.navigate({ routeName: 'Home' })],
        // });
        // this.props.navigation.dispatch(reset);
        this.props.navigation.dispatch(navigateToGameLobby);
    }

    editName = () => {
        this.setState({
            editing: true
        })
    }

    confirmEditName = () => {
        const message = validator.petname(this.state.nameInput);
        if (message === "Success") {
            API.updatePetName(this.state.pet._id, this.state.nameInput)
            .then(res => {
                AsyncStorage.getItem("user").then( user => {
                    user = JSON.parse(user);
                    user.pets = user.pets.map(pet => {
                        if(pet._id === res.data._id) {
                            return res.data
                        }
                        return pet
                    });
                    AsyncStorage.setItem("user", JSON.stringify(user)).then( () => {
                        this.setState({
                            pet: res.data,
                            editing: false,
                            nameInput: res.data.name
                        })
                    })
                })
            })
            .catch(err => {
                console.log(err)
                Alerts.singleButtonError("Uh Oh! Database Issue:", err)
            })
        }
        else {
            return Alerts.singleButtonError("Uh Oh!", message);
        }
    }
    cancelEditName = () => {
        this.setState( state => {
            return {
                editing: false,
                nameInput: state.pet.name
            }
        });
    }


    render() {
        if (this.state.pet._id) {
            return (
                <KeyboardAvoidingView
                    style={{flex: 1}}
                    behavior='padding'
                    enabled
                >
                <Content style={styles.centeredContent} >
                    <Header>
                        <Body>
                            <Title style={{ alignSelf: 'center' }}>{this.state.pet.name}</Title>
                        </Body>
                    </Header>
                    <Card style={styles.centeredContent}>
                        <CardItem>
                            <Body>
                                <View style={styles.svgContainer}>
                                    <SlimePet baseColor={this.state.pet.baseColor} outlineColor={this.state.pet.outlineColor} height="200" width="200" scale="1.65" />
                                </View>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body style={{justifyContent: 'center'}}>
                                <Row style={{flex: 1, alignSelf: 'center'}}>
                                    <Button success rounded style={{ margin: 10 }}
                                        onPress={() => this.toGameLobby(this.state.pet)}
                                    >
                                        <Text>Play</Text>
                                    </Button>
                                    <Button warning rounded style={{ margin: 10 }}
                                        onPress={() => this.toBreedPage(this.state.pet)}
                                    >
                                        <Text>Breed</Text>
                                    </Button>
                                    {this.currentPetNumber > 2 && 
                                        <Button danger rounded style={{ margin: 10 }}
                                            // onPress={() => this.releasePet(pet)}
                                            onPress={this.showConfirm}
                                        >
                                            <Text>Release</Text>
                                        </Button>
                                    }
                                </Row>
                                
                                {this.state.editing ? <Item rounded><Input value={this.state.nameInput} 
                                    autoCapitalize='words'
                                    onChangeText={(text) => this.setState({nameInput: text})}
                                /></Item>
                                : <Text style={{ alignSelf: "center" }}>Name: {this.state.pet.name}</Text>}
                                {this.state.editing ? 
                                    <Row style={{flex: 1, alignSelf: 'center' }}>
                                        <Button success rounded small style={{ alignSelf: 'center', margin: 10 }}
                                            onPress={() => this.confirmEditName()}
                                        >
                                            <Text>Confirm</Text>
                                        </Button>
                                        <Button danger rounded small style={{ alignSelf: 'center', margin: 10 }}
                                            onPress={() => this.cancelEditName()}
                                        >
                                            <Text>Cancel</Text>
                                        </Button>
                                    </Row>
                                : <Button dark rounded small style={{ alignSelf: 'center', margin: 10 }}
                                    onPress={() => this.editName()}
                                >
                                    <Text>Rename</Text>
                                </Button>}
                                <Text style={{ alignSelf: "center" }}>Level: {this.state.pet.level}</Text>
                                {this.state.pet.level > 1 && <Text style={{ alignSelf: "center" }}>Primary Game Color: {this.state.pet.gameColor.primary}</Text>}
                                {this.state.pet.level > 9 && <Text style={{ alignSelf: "center" }}>Secondary Game Color: {this.state.pet.gameColor.secondary}</Text>}
                                {this.state.pet.parents && <Text style={{ alignSelf: "center" }}> {this.state.pet.parents.length > 1 ? `Parents: ${this.state.pet.parents[0].name}, ${this.state.pet.parents[1].name}` : `Parents: THE WILD`}</Text>}
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
                </KeyboardAvoidingView>
            );
        }
        else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
    nameText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,1)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    centeredContent: {
        alignContent: 'center',
        flex: 1,
    },
    svgContainer: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    }
});