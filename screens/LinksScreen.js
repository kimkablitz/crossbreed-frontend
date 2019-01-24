import React from 'react';
import axios from "axios";
import { View, ScrollView, StyleSheet } from 'react-native';
import PetCard from '../components/PetCard';
import TinyPetCard from '../components/TinyPetCard';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Button, Text } from 'native-base';
import { NavigationActions } from 'react-navigation';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Breed',
  };

  state = {
    // holds up to 2 pets to be bred
    tobreed: [],
    // holds all users pets not in tobreed array
    pets: [
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
  }

  componentWillReceiveProps = (nextProps) => {
    let breedThis = nextProps.navigation.getParam('pet');
    // let otherPets = 
    if (breedThis) {
      this.setState( () => {
        return {
          tobreed: [breedThis]
        }
      })
    }
  }

  petOnPress = (index) => {
    if (this.state.tobreed.length < 2) {
      this.setState(state => { 
        // get chosen pet
        const newbreeder = state.pets[index];
        // make new array of pets, minus chosen pet
        const newpets = state.pets.filter((pet, i) => {
          if (i !== index) {
            return pet
          }
        });
        // get current tobreed pet, if any
        // this doesn't work without slice, 
        // because React does weird things
        let breeders = state.tobreed.slice(0);
        // add new pet to breed to the array
        breeders.push(newbreeder);
        // return the new arrays to set the new state
        return { 
          tobreed: breeders,
          pets: newpets
        } 
      });
    }
  }

  breederOnPress = (index) => {
    const removebreeder = this.state.tobreed[index];
    const breedpets = this.state.tobreed.filter((pet, i) => {
      if (i !== index) {
        return pet
      }
    })
    const allpets = this.state.pets.slice(0);
    allpets.push(removebreeder);
    this.setState(() => { 
      return { 
        tobreed: breedpets,
        pets: allpets
      } 
    });
  }

  handleBreedPets = () => {

  }

  render() {
    return (
      <View style={styles.container}>
        <Grid>
          <Row style={{flexWrap: "wrap", justifyContent: 'space-evenly', height: 175}}>
          {this.state.tobreed.map( (breeder, index) => {
            return <Col key={breeder.name} style={{width: 150, height: 200}} >
              <PetCard key={index} data={breeder} press={() => {this.breederOnPress(index)}} 
              />
            </Col>
          })}
          </Row>
          <Row style={{justifyContent: 'center'}}>
            <Button danger rounded style={{ margin: 10}}
              onPress={ () => this.handleBreedPets() }
            > 
              <Text>Breed</Text> 
            </Button>
          </Row>
        </Grid>
        <ScrollView style={styles.container}>
          <Grid>
            <Row style={{flexWrap: "wrap", justifyContent: 'space-evenly'}} > 
              {this.state.pets.map( (pet, index) => {
                return <Col key={pet.name} style={{width: 100, height: 140}} >
                <TinyPetCard key={index} data={pet} press={() => {this.petOnPress(index)}} />
              </Col>
              })}
            </Row>
          </Grid>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
