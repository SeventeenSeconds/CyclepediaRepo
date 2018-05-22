import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Login',
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <View><Text>Login</Text></View>
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