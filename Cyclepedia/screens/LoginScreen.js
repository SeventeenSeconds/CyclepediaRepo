import React from 'react';
import { View, ScrollView, StyleSheet, Text, Button } from 'react-native';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Login',
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <View><Text>Login</Text></View>
                <Button title="Login" onPress={this.authenticatedUser}></Button>
            </ScrollView>
        );
    }

    authenticatedUser = () => {
        this.props.navigation.navigate('Bottom');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});