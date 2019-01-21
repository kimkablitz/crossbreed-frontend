import React from 'react';
import {Linking} from 'react-native';

// import { Image } from 'react-native';
import { Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
// export default class RecipeCard extends Component {

export default RecipeCard = (props) => {
        // console.log(props)
        const {title, href, ingredients, thumbnail } = props.data;
    return (
    //   <Container>
    //     <Header />
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: thumbnail}} />
                <Body>
                  <Text>NativeBase</Text>
                  <Text>{title}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                {/* <Image source={{uri: 'Image URL'}} style={{height: 200, width: 200, flex: 1}}/> */}
                <Text>
                  Ingredients: {ingredients}
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button 
                    transparent 
                    textStyle={{color: '#87838B'}}
                    onPress = {() => {
                        Linking.openURL(href).then(() => {
                            console.log("Opening link");
                        }).catch(err => console.error('An error occurred', err))
                        }
                    }>
                  <Icon name="navigate" />
                  <Text>Go to Recipe</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
        </Content>
    //   </Container>
    );
  
}