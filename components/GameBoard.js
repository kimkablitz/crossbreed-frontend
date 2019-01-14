import React, { Component } from "react";
import { Text } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import _ from "lodash";
import { Spring } from "react-spring";
import Tile from "./Tile";

// Current colors used in the game
const colors = ["red", "green", "blue", "magenta"];

export default class GameBoard extends Component {
    constructor(props){
        super(props)
        this.state= {
            gameStarted: false,
            tile: [
                ['', '', '', ''],
                ['', '', '', ''],
                ['', '', '', ''],
                ['', '', '', '']
            ],
            firstClick: {}
        }
    }

    // The first time the board is mounted, generate a random board
    componentDidMount(){
        this.generateRandomBoard();
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
                // Push new tile in newRow array
                return newRow.push(tile);
            });
            // Push each newRow into newTileState array
            return newTileState.push(newRow);
        });
        // Set tile state with the newTileState array, and set gameStarted to true
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
        // Go through each row of tiles
        return (this.state.tile.map((row, index) => {
            // For each tile in the row
            return (
                <Row key={ index }>
                    {row.map(tile => {
                        // Deconstruct the tile object into variables
                        const {color, xIndex, yIndex} = tile;
                        // Then pass the variables as props into the Tile component
                        return <Tile color={color} xIndex={xIndex} yIndex={yIndex} key={`${xIndex}${yIndex}`} click={this.handleClicks}/>
                    })}
                </Row>
            );
        }));
    }

    // Function to handle clicking of Tiles on the Board
    handleClicks = (coordinates) => {
        const firstClick = this.state.firstClick;
        // If firstClick is empty, set clicked Tile as firstClick
        if(Object.keys(firstClick).length === 0){
            this.setState({firstClick: coordinates});
        }
        // If firstClick already exists, set clicked Tile as secondClick
        // Then check the secondClick to see if it was contiguous to firstClick
        else{
            const secondClick = coordinates;
            if(((firstClick.x === secondClick.x) && (Math.abs(firstClick.y - secondClick.y) === 1)) || ((firstClick.y === secondClick.y) && (Math.abs(firstClick.x - secondClick.x) === 1))){
                // If two clicked tiles are contiguous, then switch the tiles
                this.switchTiles(firstClick, secondClick);
            }
            // If they are not contiguous, clear the firstClick state so player can click again
            else{
                // TODO: INSERT ANIMATION TO SHOW TILES CANNOT BE SWITCHED!!!
                console.log("cannot swap tiles!");
                this.setState({ firstClick: {} });
            }
        }
    }

    // Switch the color of two tiles
    switchTiles = (firstClick, secondClick) => {
        const tiles = this.state.tile;
        // Switch the color of the two tiles using the coordinates grabbed at the click event
        // Lovely straighforward way to switch elements in an array using ES6!
        [ tiles[firstClick.x][firstClick.y].color, tiles[secondClick.x][secondClick.y].color ] = [tiles[secondClick.x][secondClick.y].color, tiles[firstClick.x][firstClick.y].color]
        // Set tile state to new array after switch and clear firstClick state to player can click again
        this.setState({tile: tiles, firstClick: {}}, () => {
            let enemyScore = this.props.enemyScore;
            enemyScore++;
            // After new tiles are set, check the board for matches of 3 or more
            this.checkMatchesOnBoard();
        });
    }

    // Checks game board for matches of 3 or more 
    checkMatchesOnBoard = () => {
        console.log("checking board");
        const tiles = this.state.tile;
        let tilesToDelete = [];
        tiles.forEach((row, i) => {
            row.forEach((tile, j) => {
                
                if(j < tiles[i].length-2){
                    // If three in a row are matching, store tile coordinates in an array of objects
                    if(tile.color === tiles[i][j+1].color && tiles[i][j].color === tiles[i][j+2].color){
                        tilesToDelete.push(tile.key, tiles[i][j+1].key, tiles[i][j+2].key);
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
            this.deleteTiles(tilesToDelete);
        }
        // If there are no tiles that match, then game is started and board will become visible to player
        else if(tilesToDelete.length === 0){
            this.setState({gameStarted: true});
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
            if(this.state.gameStarted){
                if(deletedColor === this.props.pet.color){
                    score+=2;
                }
                else{
                    score++;
                }
            }
        });
        // Set tile state to new tiles array and shift tiles down

        this.state.gameStarted ? 
        setTimeout(
            function(){
                this.setState({tile: tiles}, () =>{
                    this.props.updateScore([ name = "playerScore", value = score ]);
                    this.shiftTilesDown();
                })
            }
            .bind(this),
            300)
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
                //If the tile is not in the last row and does not have a color, switch it with next tile in column
                // if(xIndex < tiles.length-1 && tiles[xIndex][yIndex].color === ""){
                //     // If the next tile over also doesn't have a color, then switch tile with next next tile in the column
                //     if(xIndex < tiles.length-2 && tiles[xIndex+1][yIndex].color === ""){
                //         if(xIndex < tiles.length-3 && tiles[xIndex+2][yIndex].color === ""){
                //             return [tiles[xIndex][yIndex].color, tiles[xIndex+3][yIndex].color] = [tiles[xIndex+3][yIndex].color, tiles[xIndex][yIndex].color];
                //         }
                //         return [tiles[xIndex][yIndex].color, tiles[xIndex+2][yIndex].color] = [tiles[xIndex+2][yIndex].color, tiles[xIndex][yIndex].color];
                //     }
                //     [tiles[xIndex][yIndex].color, tiles[xIndex+1][yIndex].color] = [tiles[xIndex+1][yIndex].color, tiles[xIndex][yIndex].color];
                // }
            })
        });
        // Reverse the array again to get back to origin array order
        tiles.reverse();
        // Fill in any remaining empty tiles with new random tiles
        this.state.gameStarted ? 
        setTimeout(
            function(){
                this.fillInEmptyTiles(tiles)
            }
            .bind(this),
            500)
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
        return [tilesArray[xIndex][yIndex].color, tilesArray[xIndex+shiftIndex][yIndex].color] = [tilesArray[xIndex+shiftIndex][yIndex].color, tilesArray[xIndex][yIndex].color];
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
        this.setState({tile: tiles}, () => {
            this.state.gameStarted ? 
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
            this.state.gameStarted ? 
            <Grid>
                { this.renderBoard() }
            </Grid>
            : <Text className="text-center">Game Loading</Text>
        )
    }
}
