import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import RecipeCard from '../components/RecipeCard';
import { Col, Row, Grid } from "react-native-easy-grid";

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Breed',
  };

  state = {
    tobreed: [],
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

  petOnPress = (index) => {
    if (this.state.tobreed.length < 2) {
      const newbreeder = this.state.pets[index];
      const newpets = this.state.pets.filter((pet, i) => {
        if (i !== index) {
          return pet
        }
      })
      this.setState((state) => { 
        return { 
          tobreed: state.tobreed.push(newbreeder),
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
      this.setState((state) => { 
        return { 
          tobreed: breedpets,
          pets: state.pets.push(removebreeder)
        } 
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Row>
        {this.state.tobreed.map( (breeder, index) => {
          return <Col key={breeder.name} style={{width: 150, height: 200}} >
            <RecipeCard key={index} data={breeder} press={() => {this.breederOnPress(index)}} />
          </Col>
        })}
        </Row>
        <ScrollView style={styles.container}>
          <Grid>
            <Row style={{flexWrap: "wrap", justifyContent: 'space-evenly'}} > 
              {this.state.pets.map( (pet, index) => {
                return <Col key={pet.name} style={{width: 150, height: 200}} >
                <RecipeCard key={index} data={pet} press={() => {this.petOnPress(index)}} />
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
