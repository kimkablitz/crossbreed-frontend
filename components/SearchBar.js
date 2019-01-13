import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';
export default SearchBar = (props) =>  {
    return (
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input 
                placeholder="Search" 
                onChangeText={props.handleInputChange}
            />
          </Item>
          <Button 
            transparent
            onPress={props.search}
          >
            <Text>Search</Text>
          </Button>
        </Header>
    );
  }
