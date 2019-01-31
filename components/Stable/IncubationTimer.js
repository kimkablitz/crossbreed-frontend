import React, { Component } from "react";
import { View } from "react-native";
import { H2 } from "native-base";

export default class Timer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        seconds: '00',
        minutes: '00'
      }
      this.secondsRemaining;
      this.intervalHandle;
    }

    componentDidUpdate(prevProps){
        if(prevProps.timeLeft !== this.props.timeLeft && this.props.timeLeft > 0 && this.props.lifeStage === "incubating"){
            clearInterval(this.intervalHandle);
            const timeLeft = Math.floor(this.props.timeLeft/ 1000);
            console.log("Timer(ms): " + this.props.timeLeft);
            console.log("Timer(s): " + timeLeft);
            this.startCountDown(timeLeft);
        }
    }

    componentWillUnmount(){
        console.log("unmounting");
        clearInterval(this.intervalHandle);
    }

    setTimeState = () => {
        var min = Math.floor(this.secondsRemaining / 60);
        var sec = this.secondsRemaining - (min * 60);
        
        if(min < 10 ){
            min = "0" + min;
        }

        if(sec < 10){
            sec = "0" + sec;
        }

        this.setState({
          minutes: min,
          seconds: sec,
        });
    }
  
    tick = () => {
      this.setTimeState();

      if(this.secondsRemaining === 0){
        this.props.readyToHatch();
        return clearInterval(this.intervalHandle);
      }
  
      this.secondsRemaining--
    }
  
    startCountDown = (timeLeft) => {
      this.secondsRemaining = timeLeft;
      this.intervalHandle = setInterval(this.tick, 1000);
    }
  
    render() {
      return (
        <View>
            <H2 style={{ color: (this.state.minutes !== "00" && this.state.seconds !== "00" ? "black" : "white")}}>{this.state.minutes} : {this.state.seconds}</H2>
        </View>
      );
    }
}