import React, { Component } from "react";
import { View } from "react-native";
import { H2 } from "native-base";

export default class Timer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        seconds: '00',
        minutes: '05',
        hours: '00'
      }
      this.secondsRemaining;
      this.intervalHandle;
      this.startCountDown = this.startCountDown.bind(this);
      this.tick = this.tick.bind(this);
    }

    componentWillReceiveProps(nextProps){
        // if(nextProps.timeLeft)
    }
  
    tick() {
      var min = Math.floor(this.secondsRemaining / 60);
      var sec = this.secondsRemaining - (min * 60);
  
      this.setState({
        value: min,
        seconds: sec,
      })
  
      if (sec < 10) {
        this.setState({
          seconds: "0" + this.state.seconds,
        })
  
      }
  
      if (min < 10) {
        this.setState({
          value: "0" + min,
        })
  
      }
  
      if (min === 0 & sec === 0) {
        this.props.readyToHatch();
        clearInterval(this.intervalHandle);
      }
  
  
      this.secondsRemaining--
    }
  
    startCountDown() {
      this.intervalHandle = setInterval(this.tick, 1000);
      let time = this.state.value;
      this.secondsRemaining = time * 60;
      this.setState({
        isClicked : true
      })
    }
  
    render() {
      return (
        <View>
            <H2>{this.state.hours} : {this.state.minutes} : {this.state.seconds}</H2>
        </View>
      );
    }
}