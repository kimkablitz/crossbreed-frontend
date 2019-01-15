import React , { Component } from 'react';
import { Animated } from "react-native";
import { Col } from "react-native-easy-grid";
import { Ionicons } from '@expo/vector-icons';

class Tile extends Component{
    constructor(props){
        super(props);
        this.state = { 
            color: "", 
            dropInAnimation: new Animated.Value(-10)
        }
    }

    componentDidMount(){
        this.setState({ color: this.props.color });
        this.dropDownTile();
    }

    componentDidUpdate(prevProps){
        if(this.props.color !== prevProps.color){
            if(!this.props.switched){
                this.setState({ color: this.props.color, dropInAnimation: new Animated.Value(-10) }, ()=>{    
                    this.dropDownTile();
                });
            }
            else{
                this.setState({ color: this.props.color });
            }
        }
    }

    dropDownTile = () => {
        Animated.timing(
            this.state.dropInAnimation,
            {
                toValue: 0,
                duration: 300
            }
        ).start()
    }

    updateIcon = () => {
        let iconName = "";
        switch (this.state.color){
            case "green":
                return iconName += "ios-globe";
            case "blue":
                return iconName += "ios-water";
            case "magenta":
                return iconName += "ios-heart";
            case "red":
                return iconName += "ios-flame";
            default:
                return iconName += "md-medal";
        }
    }
    
    render(){
        return (
            <Col style={{ width: 50, alignItems: "center", justifyContent: "center" }}
            onPress={()=> this.props.click({x: this.props.xIndex, y: this.props.yIndex})}
            >
                <Animated.View style={{ top : this.state.dropInAnimation }}>
                    <Ionicons name={ this.updateIcon() } size={ 40 } color={ this.state.color !== "" ? this.state.color : "white"}/>
                </Animated.View>
            </Col>
        );
    }
}

export default Tile;