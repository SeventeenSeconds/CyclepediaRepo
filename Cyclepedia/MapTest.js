import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';

const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 1000
};

var isPaused = false;
var isEndRide = false;

let startCoords = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0.1,
  longitudeDelta: 0.05,
}

let pauseCoords = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0.1,
  longitudeDelta: 0.05,
}

let endCoords = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0.1,
  longitudeDelta: 0.05,
}

export default class App extends Component {
  state = {
    locationResult: null,
    longitude: null,
    latitude: null,
    location: {
      coords: {
        latitude: 0,
        longitude: 0
      }
    },
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  componentWillMount() {
    Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
  }

  locationChanged = (location) => {
    //these will be set on button click
    if (isPaused == true) {
      pauseCoords.latitude = location.coords.latitude;
      pauseCoords.longitude = location.coords.longitude;
    }
    if (isEndRide == true) {
      endCoords.latitude = location.coords.latitude;
      endCoords.longitude = location.coords.longitude;
    }

    startCoords.latitude = location.coords.latitude;
    startCoords.longitude = location.coords.latitude;

    region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.05,
      },
      this.setState({
        location,
        region
      })
  }

  calculateDistance = (lat1, lat2, lon1, lon2) => {
    var R = 6371e3;
    var lat1Rad = lat1.toRadians();
    var lat2Rad = lat2.toRadians();
    var distLatRad = (lat2 - lat1).toRadians();
    var distLonRad = (lon2 - lon1).toRadians();

    var a = Math.sin((lat1Rad / 2)) * (Math.sin(distLatRad / 2)) +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) *
      Math.sin(distLatRad / 2) * Math.sin(distLonRad / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var d = R * c;
    console.log("distance", d);
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
        region={this.state.region}
        onRegionChange={this._handleMapRegionChange}
        showsUserLocation={true}
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