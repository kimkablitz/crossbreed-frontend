import React, { Component } from "react";
import { Text, Animated } from "react-native";
import { Row, Grid } from "react-native-easy-grid";
import _ from "lodash";
import Tile from "./Tile";

// Current colors used in the game
const colors = ["red", "green", "blue", "white", "black"];

export default class GameBoard extends Component {
    constructor(props){
        super(props)
        this.state= {
            displayBoard: false,
            tile: [
                ['', '', '', '', ''],
                ['', '', '', '', ''],
                ['', '', '', '', ''],
                ['', '', '', '', ''],
                ['', '', '', '', '']
            ],
            tilesSwipeable: true,
            fadeAnimation: new Animated.Value(0)
        }
    }

    // The first time the board is mounted, generate a random board
    componentDidMount(){
        this.generateRandomBoard();
    }

    componentDidUpdate(prevProps){
        // If the game is restarted, generated a different board
        if(prevProps.gameEnded === true && this.props.gameEnded === false){
            this.setState({ displayBoard: false }, () => {
                this.generateRandomBoard();
            })
        }
    }

    // Function to generate a random board
    generateRandomBoard = () => {
        let newTileState = [];
        // Go through each row of tiles
        this.state.tile.map((row, xIndex) => {
            let newRow = [];
            // Go through each tile of the row
            row.map((tile, yIndex) => {
                // Genarate a new tile with a random color
                tile = {color: this.randomColor()};
                // Also store the x and y coordinates of the tile within the 2D array
                tile.xIndex = xIndex;
                tile.yIndex = yIndex;
                tile.key = "" + xIndex + yIndex;
                // Initializing the switched and dropped properties which are used for animations during the game
                tile.switched = "";
                tile.dropped = false;
                // Push new tile in newRow array
                return newRow.push(tile);
            });
            // Push each newRow into newTileState array
            return newTileState.push(newRow);
        });
        // Set tile state with the newTileState array, and set displayBoard to true
        // Then, in call back check if there are any matches on the board
        this.setState({tile: newTileState}, () => {
            this.checkMatchesOnBoard();
        });
    }

    // Returns a random color from the color array
    randomColor = () => {
        const randomNumber = Math.floor(Math.random() * colors.length);
        return colors[randomNumber];
    }

    // Render game board according to the current tile state 
    renderBoard = () => {
        this.fadeInBoard();
        // Go through each row of tiles
        return (this.state.tile.map((row, index) => {
            // For each tile in the row
            return (
                <Row key={ index }>
                    {row.map(tile => {
                        // Deconstruct the tile object into variables
                        const {color, switched, dropped, xIndex, yIndex} = tile;
                        // Then pass the variables as props into the Tile component
                        return <Tile color={color} switched={switched} dropped={dropped} xIndex={xIndex} yIndex={yIndex} key={`${xIndex}${yIndex}`} swipe={this.handleSwipes}/>
                    })}
                </Row>
            );
        }));
    }

    // Fade in animation for when a board is initially displayed
    fadeInBoard = () => {
        Animated.timing(
            this.state.fadeAnimation,
            {
                toValue: 1,
                duration: 1000
            }
        ).start();
    }

    // Handles the swiping recognition on the gameboard
    handleSwipes = (directionSwiped, firstTileCoordinates) => {
        // Initiallizing the secondTile object and switch direction;
        let secondTileCoordinates = _.clone(firstTileCoordinates);
        let secondTileDirection = "";
        switch(directionSwiped){
            case "SWIPE_UP":
                // Only allow tiles to swap if the swiped tile is not in the first row
                if(firstTileCoordinates.x !== 0){
                    secondTileCoordinates.x = (firstTileCoordinates.x - 1);
                    directionSwiped = "up";
                    secondTileDirection = "down";
                }
                break;
            case "SWIPE_DOWN":
                // Only allow tiles to swap if the swiped tile is not in the last row
                if(firstTileCoordinates.x < (this.state.tile.length -1)){
                    secondTileCoordinates.x = (firstTileCoordinates.x + 1);
                    directionSwiped = "down";
                    secondTileDirection = "up";
                }
                break;
            case "SWIPE_LEFT":
                // Only allow tiles to swap if the swiped tile is not in the first column
                if(firstTileCoordinates.y !== 0){
                    secondTileCoordinates.y = (firstTileCoordinates.y -1);
                    directionSwiped = "left";
                    secondTileDirection = "right";
                }
                break;
            case "SWIPE_RIGHT":
                // Only allow tiles to swap if the swiped tile is not in the last column
                if(firstTileCoordinates.y < (this.state.tile[0].length - 1)){
                    secondTileCoordinates.y = (firstTileCoordinates.y + 1);
                    directionSwiped = "right";
                    secondTileDirection = "left";
                }
                break;
            default:
                break;
        }
        if(this.state.tilesSwipeable){
            this.switchTiles(firstTileCoordinates, secondTileCoordinates, directionSwiped, secondTileDirection);
        }
    } 

    // Switch the color of two tiles
    switchTiles = (firstTileCoordinates, secondTileCoordinates, firstDirection, secondDirection) => {
        const tiles = this.state.tile;
        // Switch the color of the two tiles using the coordinates grabbed at the click event
        // Lovely straighforward way to switch elements in an array using ES6!
        [ tiles[firstTileCoordinates.x][firstTileCoordinates.y].color, tiles[secondTileCoordinates.x][secondTileCoordinates.y].color, tiles[firstTileCoordinates.x][firstTileCoordinates.y].switched, tiles[secondTileCoordinates.x][secondTileCoordinates.y].switched ] = [tiles[secondTileCoordinates.x][secondTileCoordinates.y].color, tiles[firstTileCoordinates.x][firstTileCoordinates.y].color, firstDirection, secondDirection]
        // Set tile state to new array after switch and clear firstTileCoordinates state to player can click again
        this.setState({tile: tiles}, () => {
            // Update enemy score
            this.props.updateScore([name = "enemyScore", value = this.randomEnemyScore( this.props.difficulty )]);
            // After new tiles are set, check the board for matches of 3 or more
            this.state.displayBoard ? 
                setTimeout(
                    function(){
                        this.checkMatchesOnBoard();
                    }
                    .bind(this),
                    300)
                : 
                this.checkMatchesOnBoard();
        });
    }

    // Generates a random enemy score depending on the difficulty setting of the game
    randomEnemyScore = (difficulty) => {
        const randomNumber = Math.floor(Math.random() * 100);
        let enemyScore = this.props.enemyScore;
        let baseNumber;
        // The basic number by which enemy score increases is higher for hard mode
        switch(difficulty){
            case "easy":
                baseNumber = 3;
                break;
            case "normal":
                baseNumber = 4;
                break;
            case "hard":
                baseNumber = 5;
                break;
            default:
                break;
        }
        // There is a 25% chance enemy score only increases by baseNumber;
        if(randomNumber < 25){
            return enemyScore += baseNumber;
        }
        // There is a 25% chance enemy score increases by baseNumber + 1;
        else if(randomNumber < 50){
            return enemyScore += (baseNumber + 1);
        }
        // There is a 25% chance enemy score increases by baseNumber + 2;
        else if (randomNumber < 75){
            return enemyScore += (baseNumber + 2);
        }
        // There is a 15% chance enemy score increases by baseNumber + 3;
        else if(randomNumber < 90){
            return enemyScore += (baseNumber + 3);
        }
        // There is a 10% chance enemy score increases by baseNumber + 4;
        else{
            return enemyScore += (baseNumber + 4);
        }
    }

    // Checks game board for matches of 3 or more 
    checkMatchesOnBoard = () => {
        const tiles = this.state.tile;
        let tilesToDelete = [];
        tiles.forEach((row, i) => {
            row.forEach((tile, j) => {
                tile.switched = "";
                tile.dropped = false;
                if(j < tiles[i].length-2){
                    // If three in a row are matching, store tile coordinates in an array of objects
                    if(tile.color === tiles[i][j+1].color && tiles[i][j].color === tiles[i][j+2].color){
                        if(_.includes(tilesToDelete, tile.key)){
                            tilesToDelete.push(tiles[i][j+1].key, tiles[i][j+2].key);
                        }
                        else{
                            tilesToDelete.push(tile.key, tiles[i][j+1].key, tiles[i][j+2].key);
                        }
                    }
                }
            
                if(i < tiles.length-2){
                    // If three in a column are matching, store tile coordinates in an array of objects
                    if(tile.color === tiles[i+1][j].color && tiles[i][j].color === tiles[i+2][j].color){
                        if(_.includes(tilesToDelete, tile.key)){
                            tilesToDelete.push(tiles[i+1][j].key, tiles[i+2][j].key);
                        }
                        else{
                            tilesToDelete.push(tile.key, tiles[i+1][j].key, tiles[i+2][j].key);
                        }
                    }
                }
            })
        });
        // If there are tiles to delete, run deleteTiles function
        // This is run before the game start to make sure that the first board presented to the player does not have any matches!!
        if(tilesToDelete.length > 0){
            this.setState({ tilesSwipeable: false }, () => this.deleteTiles(tilesToDelete));
        }
        // If there are no tiles that match, then game is started and board will become visible to player
        else if(tilesToDelete.length === 0){
            this.setState({displayBoard: true, tile: tiles});
        }
    }

    // Function to delete tiles that takes in an array of tile keys that represents the x and y coordinates of tile
    deleteTiles = (tilesToDelete) => {
        const tiles = this.state.tile;
        let score = this.props.playerScore;
        tilesToDelete.forEach(tile => {
            // Store the color that is being deleted for future use 
            const deletedColor = tiles[tile[0]][tile[1]].color;
            // Set the color to nothing
            tiles[tile[0]][tile[1]].color = "";
            // Only increase the score if the game has started
            if(this.state.displayBoard){
                if(deletedColor === this.props.pet.gameColor.primary){
                    score+=3;
                }
                if(deletedColor === this.props.pet.gameColor.secondary){
                    score+=2;
                }
                else{
                    score++;
                }
            }
        });
        // Set tile state to new tiles array and shift tiles down

        this.state.displayBoard ? 
        setTimeout(
            function(){
                this.setState({tile: tiles}, () =>{
                    this.props.updateScore([ name = "playerScore", value = score ]);
                    setTimeout(
                        function(){
                            this.shiftTilesDown();
                        }
                        .bind(this),
                        300)
                })
            }
            .bind(this),
            100)
        : 
        this.setState({tile: tiles}, () =>{
            this.shiftTilesDown();
        });
    }

    // Function to shift exisiting tiles down to fill in empty spaces below it
    shiftTilesDown = () => {
        let tiles = _.clone(this.state.tile);
        // Reverse the array to check from bottom to top
        tiles.reverse();
        tiles.forEach((row, xIndex) =>{
            row.forEach((tile, yIndex) => {
                this.dynamicShift(tiles.length, tiles, xIndex, yIndex);
            })
        });
        // Reverse the array again to get back to origin array order
        tiles.reverse();
        // Fill in any remaining empty tiles with new random tiles
        this.state.displayBoard ? 
        setTimeout(
            function(){
                this.fillInEmptyTiles(tiles)
            }
            .bind(this),
            300)
        : this.fillInEmptyTiles(tiles)
    }

    dynamicShift = (numberOfRows, tilesArray, xIndex, yIndex) => {
        let shiftIndex = 0;
        for(var i = 0 ; i < numberOfRows-1; i++){
            if(xIndex < tilesArray.length - (i+1)){
                if(tilesArray[xIndex+(i)][yIndex].color !== "") break;
                shiftIndex++;
            }
        }
        if(shiftIndex > 0){
            return [tilesArray[xIndex][yIndex].color, tilesArray[xIndex+shiftIndex][yIndex].color, tilesArray[xIndex+shiftIndex][yIndex].dropped ] = [tilesArray[xIndex+shiftIndex][yIndex].color, tilesArray[xIndex][yIndex].color, true];
        }
        else{
            return [tilesArray[xIndex][yIndex].color, tilesArray[xIndex+shiftIndex][yIndex].color ] = [tilesArray[xIndex+shiftIndex][yIndex].color, tilesArray[xIndex][yIndex].color ]
        }
    }

    // Function to fill in any remaining empty spaces after existing tiles have already been shifted down
    fillInEmptyTiles = (tiles) => {
        tiles.forEach(row => {
            row.forEach(tile => {
                if(tile.color === ""){
                    tile.color = this.randomColor();
                }
                else{
                    return;
                }
            });
        });
        this.setState({tile: tiles, tilesSwipeable: true}, () => {
            this.state.displayBoard ? 
            setTimeout(
                function(){
                    this.checkMatchesOnBoard();
                }
                .bind(this),
                500)
            : this.checkMatchesOnBoard()
        })
    }

    render() {
        return (
            this.state.displayBoard ? 
            <Animated.View style={{ opacity: this.state.fadeAnimation, marginTop: 10, marginBottom: 100 }}>
                <Grid style={{ backgroundColor: "#D5D4D2" }}> 
                { this.renderBoard() } 
                </Grid> 
            </Animated.View>
            : <Text> Game Loading </Text>
        )
    }
}
