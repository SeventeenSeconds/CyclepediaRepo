import React from 'react';
import {View, ScrollView, StyleSheet, Text, StatusBar, Button} from 'react-native';
import {UserObject} from "./LoginScreen";
import {FontAwesome} from '@expo/vector-icons';
import EmergencyIcon from '../constants/EmergencyIcon';

export default class RideScreen extends React.Component {
    static navigationOptions = {
        title: 'Ride',
        headerRight: <EmergencyIcon />,
    };

    render() {
        return (
            <View>
                <Text>Ride Screen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
