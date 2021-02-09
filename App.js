import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Button } from 'react-native';
import MapView, { Marker, ProviderPropType, Geojson } from 'react-native-maps';

export default function App() {
  return (
      <View style={styles.container}>
          <MapView style={styles.map} initialRegion={myPlace.initialRegion}>
              <Geojson geojson={myPlace} />
          </MapView>
          <TextInput style={styles.input} ></TextInput>
          <TextInput style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Email"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              onChangeText={this.handleEmail} />
          <Button title="Click" style={styles.submitbutton}></Button>
      </View>
  );
}

const myPlace = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Point',
                coordinates: [128.7870343, 35.4508677],
            },
        },
    ],
    initialRegion: {
        longitude: 128.7870343,
        latitude: 35.4508677,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    },
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2,
    },
    input: {
        margin: 15,
        height: 40,
        padding: 5,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    submitbutton: {
        width: 500
    }
});
