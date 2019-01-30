import React from 'react';
import API from '../utils/API';

import { StyleSheet, View } from 'react-native';
import { Svg } from 'expo';
import { Content, Card, CardItem, Text, Button, Body } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { NavigationActions, StackActions } from 'react-navigation';
const { Circle } = Svg;
import SlimeEgg from "../components/SlimeEgg";

export default class EggScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state = {
            egg: {}
        }
    }

    componentWillMount() {
        const id = this.props.navigation.getParam('egg');
        console.log(id);
        API.getEgg(id).then(res => {
            console.log(res.data);
            var thisEgg = res.data
            this.setState({
                egg: thisEgg
            })
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <Content style={styles.centeredContent}>
                <Card style={styles.centeredContent}>
                    <CardItem>
                        <Body>
                            <View style={styles.svgContainer}>
                            {/* NOTE: to change icons, we need to pass the 'lifeStage' prop as 'egg', 'incubating', or 'readyToHatch' */}
                                <SlimeEgg height="205" width="200" scale="1.6" lifeStage="egg" />
                            </View>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Row style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <Button success rounded style={{ flex: 1, margin: 10 }}
                                    onPress={() => this.hatchEgg(this.state.egg._id)}
                                >
                                    <Text>Hatch</Text>
                                </Button>
                                <Button danger rounded style={{ flex: 1, margin: 10 }}
                                    onPress={() => this.releaseEgg(this.state.egg._id)}
                                >
                                    <Text>Release</Text>
                                </Button>
                            </Row>
                            <Text style={{ alignSelf: "center" }}>Created: {this.state.egg.createdOn}</Text>
                            {this.state.egg.parents && <Text style={{ alignSelf: "center" }}> {this.state.egg.parents.length > 1 ? `Parents: ${this.state.egg.parents[0].name}, ${this.state.egg.parents[1].name}` : `Parents: THE WILD`}</Text>}
                        </Body>
                    </CardItem>
                </Card>
            </Content>
        );
    }
}

const styles = StyleSheet.create({
    nameText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,1)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    centeredContent: {
        alignContent: 'center',
        flex: 1,
    },
    svgContainer: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    }
});