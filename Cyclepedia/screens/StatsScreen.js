import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';

export default class StatsScreen extends React.Component {
    static navigationOptions = {
        title: 'Stats',
    };

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