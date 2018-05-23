import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';

export default class RideScreen extends React.Component {
    static navigationOptions = {
        title: 'Ride',
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <View><Text>Ride</Text></View>
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