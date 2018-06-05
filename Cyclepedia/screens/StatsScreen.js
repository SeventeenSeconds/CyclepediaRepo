import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import EmergencyIcon from '../constants/EmergencyIcon';
import {FontAwesome} from '@expo/vector-icons';

export default class StatsScreen extends React.Component {
    static navigationOptions = {
        title: 'Stats',
        headerRight: <EmergencyIcon />,
    };
    constructor(props){
        super(props);
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View><Text>Stats</Text></View>
            </ScrollView>
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