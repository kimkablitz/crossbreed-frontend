import React , { Component } from 'react';
import { Animated } from "react-native";
import { Col } from "react-native-easy-grid";
import { Ionicons } from '@expo/vector-icons';
import GestureRecognizer from 'react-native-swipe-gestures';

class Tile extends Component{
    constructor(props){
        super(props);
        this.state = { 
            color: "", 
            yShiftAnimation: new Animated.Value(-10),
            rotateAnimation: "0deg",
            fadeOutAnimation: new Animated.Value(1),
            xShiftAnimation: new Animated.Value(0)
        }
    }

    componentDidMount(){
        this.setState({ color: this.props.color });
        this.yShiftTile();
    }

    componentDidUpdate(prevProps){
        if(this.props.color !== prevProps.color){
            if(this.props.color === ""){
                return this.rotateAndFadeTile();
            }
            else if(this.props.switched === ""){
                this.setState({ color: this.props.color, yShiftAnimation: new Animated.Value(-10), rotateAnimation: "0deg", fadeOutAnimation: new Animated.Value(1) }, ()=>{    
                    this.yShiftTile();
                });
            }
            else if(this.props.switched !== ""){
                switch(this.props.switched){
                    case "up":
                        this.yShiftTile("up");
                        setTimeout(function(){this.setState({color: this.props.color}, this.yShiftTile())}.bind(this), 300);
                        break;
                    case "down":
                        this.yShiftTile("down");
                        setTimeout(function(){this.setState({color: this.props.color}, this.yShiftTile())}.bind(this), 300);
                        break;
                    case "left":
                        this.xShiftTile("left");
                        setTimeout(function(){this.setState({color: this.props.color}, this.xShiftTile())}.bind(this), 300);
                        break;
                    case "right":
                        this.xShiftTile("right");
                        setTimeout(function(){this.setState({color: this.props.color}, this.xShiftTile())}.bind(this), 300);
                        break;
                    default:
                        break;
                }
            }
            else{
                this.setState({ color: this.props.color });
            }
        }
        else if( this.props.color === prevProps.color && this.props.dropped !== prevProps.dropped && this.props.dropped === true ){
            this.setState({ color: this.props.color, yShiftAnimation: new Animated.Value(-10), rotateAnimation: "0deg", fadeOutAnimation: new Animated.Value(1) }, ()=>{    
                this.yShiftTile();
            });
        }   

    }

    yShiftTile = (shiftDirection) => {
        let finalPosition;
        if(shiftDirection === undefined){
            finalPosition = 10;
        }
        else if(shiftDirection === "up"){
            finalPosition = -10;
        }
        else if(shiftDirection === "down"){
            finalPosition = 50;
        }
        Animated.timing(
            this.state.yShiftAnimation,
            {
                toValue: finalPosition,
                duration: 300,
                useNativeDriver: true
            }
        ).start();
    }

    xShiftTile = (shiftDirection) => {
        let finalPosition;
        if(shiftDirection === undefined){
            finalPosition = 0;
        }
        else if(shiftDirection === "left"){
            finalPosition = -15;
        }
        else if(shiftDirection === "right"){
            finalPosition = 15;
        }
        Animated.timing(
            this.state.xShiftAnimation,
            {
                toValue: finalPosition,
                duration: 300,
                useNativeDriver: true
            }
        ).start();
    }

    rotateAndFadeTile = () => {
        let rotateValue = new Animated.Value(0);
        Animated.parallel([
            Animated.timing(
                rotateValue,
                {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                this.state.fadeOutAnimation,
                {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true
                }
            )
        ]).start(() => {this.setState({ color: this.props.color })})
        
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
            <GestureRecognizer 
                config={{ velocityThreshold: 0.3, directionalOffsetThreshold: 1000, gestureIsClickThreshold: 10 }}
                onSwipe={(direction) => this.props.swipe(direction, {x: this.props.xIndex, y: this.props.yIndex})}
            >
                <Col style={{ width: 70, alignItems: "center", justifyContent: "center" }}>
                    <Animated.View style={{ opacity: this.state.fadeOutAnimation, 
                        transform: [ {translateY: this.state.yShiftAnimation}, {translateX: this.state.xShiftAnimation}] 
                    }}>
                        <Ionicons name={ this.updateIcon() } size={ 40 } color={ this.state.color !== "" ? this.state.color : "transparent"}/>
                    </Animated.View>
                </Col>
            </GestureRecognizer>
        );
    }
}

export default Tile;