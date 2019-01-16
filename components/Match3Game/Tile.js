import React , { Component } from 'react';
import { Animated } from "react-native";
import { Col } from "react-native-easy-grid";
import { Ionicons } from '@expo/vector-icons';

class Tile extends Component{
    constructor(props){
        super(props);
        this.state = { 
            color: "", 
            dropInAnimation: new Animated.Value(-10),
            rotateAnimation: "0deg"
        }
    }

    componentDidMount(){
        this.setState({ color: this.props.color });
        this.dropDownTile();
    }

    componentDidUpdate(prevProps){
        if(this.props.color !== prevProps.color){
            if(this.props.color === ""){
                return this.rotateTile();
            }
            else if(!this.props.switched){
                this.setState({ color: this.props.color, dropInAnimation: new Animated.Value(-10), rotateAnimation: "0deg" }, ()=>{    
                    this.dropDownTile();
                });
            }
            
            else{
                this.setState({ color: this.props.color });
            }
        }
        else if( this.props.color === prevProps.color && this.props.dropped !== prevProps.dropped && this.props.dropped === true ){
            console.log("dropped same color");
            this.setState({ color: this.props.color, dropInAnimation: new Animated.Value(-10), rotateAnimation: "0deg" }, ()=>{    
                this.dropDownTile();
            });
        }   
    }

    dropDownTile = () => {
        Animated.timing(
            this.state.dropInAnimation,
            {
                toValue: 0,
                duration: 300
            }
        ).start();
    }

    rotateTile = () => {
        let rotateValue = new Animated.Value(0);
        Animated.timing(
            rotateValue,
            {
                toValue: 1,
                duration: 300
            }
        ).start(() => {this.setState({ color: this.props.color })});
        this.state.rotateAnimation = rotateValue.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "180deg"]
        });
    }

    updateIcon = () => {
        let iconName = "";
        switch (this.state.color){
            case "green":
                return iconName += "md-planet";
            case "blue":
                return iconName += "md-water";
            case "red":
                return iconName += "md-flame";
            case "white":
                return iconName += "md-cloudy";
            case "black": 
                return iconName += "md-paw";
            default:
                return iconName += "md-medal";
        }
    }
    
    render(){
        return (
            <Col style={{ width: 50, alignItems: "center", justifyContent: "center" }}
            onPress={()=> this.props.click({x: this.props.xIndex, y: this.props.yIndex})}
            >
                <Animated.View style={{ top : this.state.dropInAnimation, transform: [{rotate: this.state.rotateAnimation}] }}>
                    <Ionicons name={ this.updateIcon() } size={ 40 } color={ this.state.color !== "" ? this.state.color : "transparent"}/>
                </Animated.View>
            </Col>
        );
    }
}

export default Tile;