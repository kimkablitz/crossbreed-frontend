import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from "axios";
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard'
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    recipeSearch: "",
    recipes: []
  }

  searchRecipe = (event) => {
    event.preventDefault();
    axios
    .get("http://www.recipepuppy.com/api/", { params: {q: this.state.recipeSearch }})
    .then(({ data: { results } }) => {
      console.log(results)
      this.setState({recipes: results})
    })
    .catch(err => console.log(err));
    
  }
  
  handleInputChange = (search) => {
    this.setState({recipeSearch: search})
  }


  render() {
    return (
      <View style={styles.container}>
        <SearchBar handleInputChange={this.handleInputChange} 
          search={this.searchRecipe}
        />
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
         {this.state.recipes.map(recipe => 
         
         <RecipeCard key={recipe.title} data={recipe} />
         )}

        </ScrollView>

      </View>
    );
  }

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
