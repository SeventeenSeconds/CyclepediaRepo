import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';

export default class App extends Component {
  state = {
    locationResult: null,
    longitude: null,
    latitude: null,
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let {
      status
    } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
      });
    }

    let locationResult = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });

    this.setState({
      locationResult
    });
    let latitude = locationResult.coords.latitude;
    this.setState({
      latitude
    });
    let longitude = locationResult.coords.longitude;
    this.setState({
      longitude
    });
  }

  render() {
    let text = JSON.stringify(this.state.locationResult);
    let latText = JSON.stringify(this.state.latitude);
    let longText = JSON.stringify(this.state.longitude);
    let latNum = parseFloat(latText);
    let longNum = parseFloat(longText);
    return (
      <View style={styles.container}>
        <Text>
          Location: {text}
        </Text>
        <Text>
          Latitude: {latText}
        </Text>
        <Text>
          LatNum: {latNum}
        </Text>
        <Text>
          Longitude: {longText}
        </Text>
        <Text>
          LongNum: {longNum}
        </Text>
        <MapView
        style={{ alignSelf: 'stretch', height: 200 }}
        initialRegion={{
                latitude: 40.760779,
                longitude: -111.891047,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }}
        onRegionChange={this._handleMapRegionChange}
        >
        <MapView.Marker 
          coordinate={{
            latitude: latNum,
            longitude: longNum,
          }}
          title={'Current Location'}
          description={'I am here'}
        />
        </MapView>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});