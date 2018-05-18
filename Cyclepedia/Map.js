import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

export class Map extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map}
        region={{
          latitude: 39.7392,
          longitude: -104.9903,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        >

        <MapView.Marker 
          coordinate={{
            latitude: 39.7392,
            longitude: -104.9903,
          }}
          title={'A Marker'}
          description={'Marker description'}
        />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
