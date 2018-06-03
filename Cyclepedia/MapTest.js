import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';

const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 1000
};
// var date = new Date();
// const TIMESTAMP = date.toDateString();

var speeds = [];
var isPaused = false;
var isEndRide = false;

let ride = {
  id: null,
  speed: null,
  distance: null,
  time: null,
}

let startCoords = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0.1,
  longitudeDelta: 0.05,
  speed: null,
  timestamp: null
}

let pauseCoords = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0.1,
  longitudeDelta: 0.05,
  speed: null,
  timestamp: null
}

let endCoords = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0.1,
  longitudeDelta: 0.05,
  speed: null,
  timestamp: null
}

function resumeClick() {
  isPaused = false;
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
    startBtnStatus: true,
    pauseBtnStatus: false,
    resumeBtnStatus: false,
    endBtnStatus: false,
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
      pauseCoords.speed = location.coords.speed;
      speeds.push(location.coords.speed);
      pauseCoords.timestamp = location.timestamp;
    }
    if (isEndRide == true) {
      endCoords.latitude = location.coords.latitude;
      endCoords.longitude = location.coords.longitude;
      endCoords.speed = location.coords.speed;
      speeds.push(location.coords.speed);
      endCoords.timestamp = location.timestamp;
      var distance = this.calculateDistance(startCoords.latitude, endCoords.latitude, startCoords.longitude, startCoords.latitude);
      var time = this.calculateTime(startCoords.timestamp, endCoords.timestamp);
      var avSpeed = this.calculateAverageSpeed();
      this.createRide(distance, time, avSpeed);
    }

    speeds.push(location.coords.speed);

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
    lat1 = parseFloat(lat1);
    lat2 = parseFloat(lat2);
    lon1 = parseFloat(lon1);
    lon2 = parseFloat(lon2);
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
    //persist d as distance for ride
    return d;
  }

  calculateTime = (startTime, endTime) => {
    startTime = parseFloat(startTime);
    endTime = parseFloat(endTime);
    var tripTime = endTime - startTime;
    console.log("trip length", tripTime);
    var tripAsDate = new Date(tripTime);
    console.log("trip readable", tripAsDate);
    return tripTime;
  }

  calculateAverageSpeed = () => {
    const arrAvg = speeds => speeds.reduce((a, b) => a + b, 0) / speeds.length;
    return arrAvg;
  }

  createRide = (distance, time, speed) => {
    //id will need to be based off of past rides?
    ride.id = 1;
    ride.distance = distance;
    ride.time = time;
    ride.speed = speed;
    this.saveRide();
  }

  saveRide = () => {
    //persist ride
    //u.rides.push(ride);
  }

  beginRide = () => {
    this.setState({ startBtnStatus: false });
    this.setState({ pauseBtnStatus: true });
    this.setState({ endBtnStatus: true });
  }
  
  pauseRide = () => {
    this.setState({ startBtnStatus: false });
    this.setState({ pauseBtnStatus: false });
    this.setState({ resumeBtnStatus: true });
    this.setState({ endBtnStatus: true });
    isPaused = true;
  }
  
  resumeRide = () => {
    this.setState({ startBtnStatus: false });
    this.setState({ pauseBtnStatus: true });
    this.setState({ resumeBtnStatus: false });
    this.setState({ endBtnStatus: true });
  }
  
  endRide = () => {
    this.setState({ startBtnStatus: true });
    this.setState({ pauseBtnStatus: false });
    this.setState({ endBtnStatus: false });
    isEndRide = true;
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

    startCoords.latitude = locationResult.coords.latitude;
    startCoords.longitude = locationResult.coords.latitude;
    startCoords.speed = locationResult.coords.speed;
    //persist speed
    startCoords.timestamp = locationResult.timestamp;
    //persist time

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

    //   let locationObj = null;
    //   let locationStateArray = [];
    //   let location = await Location.getCurrentPositionAsync({}).then(function() {
    //   locationObj = JSON.parse(location);
    //   this.setState({ locationResult: "hello" });
    // }.bind(this));
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
        <View style={styles.buttonView}>
        {
          this.state.pauseBtnStatus ? <View style={styles.buttonContainer}> <Button style={styles.button} title="Pause Ride" onPress={this.pauseRide} /> </View> : null
        }
        {
          this.state.resumeBtnStatus ? <View style={styles.buttonContainer}> <Button style={styles.button} title="Resume Ride" onPress={this.resumeRide} /> </View> : null
        }
        {
          this.state.endBtnStatus ? <View style={styles.buttonContainer}> <Button style={styles.button} title="End Ride" onPress={this.endRide} /> </View> : null
        }
        {
          this.state.startBtnStatus ? <View style={styles.buttonContainer}> <Button style={styles.button} title="Start Ride" onPress={this.beginRide} /> </View> : null
        }
        </View>
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
  buttonView: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    marginTop: 5
  },
  button: {
    width: 'max-content',
    height: 'max-content'
  },
  buttonContainer: {
    flex: 1,
    height: 100,
    width: 120
  }
});