import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';

export default class App extends Component {
  state = {
    locationResult: null
  };

  componentDidMount() {
    this._getLocationAsync();
  }
  
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
     });
   }
   
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
     });
   }

    let locationObj = null;
    let locationStateArray = [];
    let location = await Location.getCurrentPositionAsync({}).then(function() {
     locationObj = JSON.parse(location);
    this.setState({ locationResult: "hello" });
   }.bind(this));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Location: {this.state.locationResult}
        </Text>
        <MapView
        style={{ alignSelf: 'stretch', height: 200 }}
        region={this.state.mapRegion}
        onRegionChange={this._handleMapRegionChange}
        >
        <MapView.Marker 
          coordinate={{
            latitude: 39.7392,
            longitude: -104.9903,
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
