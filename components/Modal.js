import React, { Component } from 'react';
import { Modal } from "react-native";
import { Grid, Row } from "react-native-easy-grid";

class MyModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.visible !== prevProps.visible){
            this.changeVisibility( this.props.visible );
        }
    }

    changeVisibility = (visibility) => {
        this.setState({ modalVisible: visibility });
    }

    render() {
      return (
        <Grid style={{ backgroundColor: "rgba(255,255,255,0.5)", alignContent: "center", justifyContent: "center"}}>
            <Row>
                <Modal
                    animationType="slide"
                    transparent={ true }
                    visible={ this.state.modalVisible }
                    onRequestClose={() => {
                        this.props.goToLobby();
                    }}
                > 
                { this.props.children }
                </Modal>
            </Row>
        </Grid>
      )
    }
}

export default MyModal;