import React from "react";
import MyModal from "./Modal";
import { Grid, Row } from "react-native-easy-grid";
import { Button, Text, H3 } from "native-base";

export default EndGameModal = (props) => {
    
    return (
        <MyModal visible={ props.visible } goToLobby={ props.navigateToLobby }>
			<Grid style={{ backgroundColor: "rgba(0,0,0,0.8)", justifyContent: "center", alignItems: "center"}}>
				<Row size={ 6 }>
					<H3 style={{ alignSelf: "center", color: "white", textAlign: "center" }}> { props.modalMessage }</H3>
				</Row>
				<Row size={ 1 }>
					<Button success rounded style={{ alignSelf: "center" }}
						onPress={ props.startGame }
					>
						<Text> Play Again </Text>
					</Button>
				</Row>
				<Row size={ 1 }>
					<Button warning rounded style={{ alignSelf: "center" }}
						onPress={ props.navigateToLobby }
					> 
						<Text style={{ color: "white" }}> Return to Lobby</Text> 
					</Button>
				</Row>
				<Row size={ 1 } style={{ paddingBottom: 20 }}>
					<Button danger rounded style={{ alignSelf: "center" }}
						onPress={ props.navigateToStable }
					> 
						<Text style={{ color: "white" }}> Return to Stable </Text> 
					</Button>
				</Row>
			</Grid>
		</MyModal>
    )
}