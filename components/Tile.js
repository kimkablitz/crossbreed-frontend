import React , { Component } from 'react';
import { Col } from "react-native-easy-grid";
import { Ionicons } from '@expo/vector-icons';
import { Transition, animated } from "react-spring";

class Tile extends Component{
    constructor(props){
        super(props);
        this.state = { 
            color: ""
        }
    }

    componentDidMount(){
        this.setState({ color: this.props.color });
    }

    componentDidUpdate(prevProps){
        if(this.props.color !== prevProps.color){
            this.setState({ color: this.props.color });
        }
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
                <Ionicons name={ this.updateIcon() } size={ 40 } color={ this.state.color !== "" ? this.state.color : "white"}/>
            </Col>
        );
    }
}

export default Tile;