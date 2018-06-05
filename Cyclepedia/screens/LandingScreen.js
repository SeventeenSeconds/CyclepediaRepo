import React from 'react';
import {View, ScrollView, StyleSheet, Text, Button} from 'react-native';
import colorStyles from '../constants/colors';
import EmergencyIcon from '../constants/EmergencyIcon';
import {FontAwesome} from '@expo/vector-icons';
import {UserObject} from "./LoginScreen";

// main comp here
//state of different components,

export default class LandingScreen extends React.Component {
    static navigationOptions = {
        title: 'Settings',
        headerRight: <EmergencyIcon/>,
    };

    state = {
        buttonTitle: "Edit Settings",
        // buttonFunction: this.editSettings,
    }


    // editSettings() {
    //     this.setState({buttonTitle: "Save Settings"});
    //     this.setState({buttonFunction: this.saveSettings});
    // }
    //
    // saveSettings() {
    //     this.setState({buttonTitle: "Edit Settings"});
    //     this.setState({buttonFunction: this.editSettings});
    // }

    user = null;

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text>Welcome {UserObject.firstName}!</Text>
                    <Text>Email: {UserObject.email}</Text>
                    <Text>Emergency Contact: {UserObject.contactName}</Text>
                    <Text>Emergency Contact Email: {UserObject.contactEmail}</Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        // backgroundColor: colorStyles.white,
    },
    text: {

    },
});