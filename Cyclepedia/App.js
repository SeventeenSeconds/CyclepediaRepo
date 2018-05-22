import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Geolocation } from './Geolocation';
//import { AppLoading, Font } from '.expo';
import { AppLoading, Font } from 'expo';

import { colorStyles } from './constants/colors';
import { RegisterScreen } from './screens/RegisterScreen';

export default class App extends React.Component {
  state = {
    fontLoaded: false,
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Raleway': require('./assets/fonts/Raleway/Raleway-Regular.ttf'),
        'Work_Sans': require('./assets/fonts/Work_Sans/WorkSans-Regular.ttf'),
        'FontAwesome': require('./assets/fonts/fontawesome.ttf')
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded) {
      return <Expo.AppLoading />;
    }
    return (
    <View style={styles.container}>
      
      <Text style={styles.headingFont}>
        I am a Raleway heading
      </Text>
      <Text style={styles.bodyFont}>
        I am Work Sans body text
      </Text>

      <View style={styles.grid}>
        <View style={styles.iconContainer}>
          <Image
            source={require('./assets/images/fabicycle.png')}
            style={styles.icon}
          />
        </View>
        <View style={styles.iconContainer}>
          <Image
            source={require('./assets/images/fachart.png')}
            style={styles.icon}
          />
        </View>
        <View style={styles.iconContainer}>
          <Image
            source={require('./assets/images/faexclamation.png')}
            style={styles.icon}
          />
        </View>
        <View style={styles.iconContainer}>
          <Image
            source={require('./assets/images/fahome.png')}
            style={styles.icon}
          />
        </View>
      </View>

    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingFont: {
    fontFamily: 'Raleway',
    fontSize: 40,
    color: colorStyles.blue
  },
  bodyFont: {
    fontFamily: 'Work_Sans',
    fontSize: 20
  },
  grid: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row'
  },
  iconContainer: {
    flex: 1,
    height: 40,
    width: 40
  },
  icon: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined,
    resizeMode: 'contain'
  }
});
