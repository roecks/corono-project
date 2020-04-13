/**

	Component: Map

**/

import React, {Component} from 'react';
import {
TextInput,
  Easing,
  Animated,
  InteractionManager,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  View,
  ScrollView,
  Text,
} from 'react-native';

import MapView, { Heatmap, PROVIDER_GOOGLE } from 'react-native-maps';

// import styles
import { maps } from '../stylesheets/master';

// set dimensions
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const mapStyle = [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#131d33"
          }
        ]
      },
      {
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8ec3b9"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1a3646"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#4b6878"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#64779e"
          }
        ]
      },
      {
        "featureType": "administrative.neighborhood",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#4b6878"
          }
        ]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#334e87"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#023e58"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#283d6a"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#6f9ba5"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#023e58"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#3C7680"
          }
        ]
      },
      {
        "featureType": "road",
        "stylers": [
          {
            "weight": 1
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#304a7d"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#98a5be"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "stylers": [
          {
            "color": "#325079"
          },
          {
            "weight": 1
          }
        ]
      },
      {
        "featureType": "road.highway",
        "stylers": [
          {
            "color": "#255763"
          },
          {
            "visibility": "off"
          },
          {
            "weight": 1
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#2c6675"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#b0d5ce"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#023e58"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#98a5be"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#283d6a"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#3a4762"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#0e1626"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#4e6d70"
          }
        ]
      }
     ]

export default class DraggableToggle extends Component {

	render() {

		let points = [
			{ latitude: 37.78825, longitude: -122.4214, weight: 5 },
			{ latitude: 37.79025, longitude: -122.4354, weight: 1 },
			{ latitude: 37.79025, longitude: -122.4205, weight: 16 },
			{ latitude: 37.80025, longitude: -122.4205, weight: 1 },
			{ latitude: 37.80025, longitude: -122.4205, weight: 1 },
			{ latitude: 37.77725, longitude: -122.4305, weight: 6 },
		];
		
  		let gradient= { 
			colors: ["#79BC6A", "#BBCF4C", "#EEC20B", "#F29305", "#E50000"],
			startPoints: [0.01, 0.25, 0.50, 0.75, 1],
			colorMapSize: 6000 
		}

		return (
			<View style={[ maps.wrapper ]}>
				<MapView
		            provider={ PROVIDER_GOOGLE }
		            showsUserLocation={ true }
		            customMapStyle={ mapStyle }
		            initialRegion={{
		              latitude: 37.78825,
		              longitude: -122.4324,
		              latitudeDelta: 0.0922,
		              longitudeDelta: 0.0421,
		            }}
		            style={[ maps.map ]}
	         	>

	         		<Heatmap 
	         			points={ points } 
	         			opacity={ .4 } 
	         			radius= { 500 } 
	         			maxIntensity={ 100 }
	         			gradientSmoothing={ 1000 } />

	         	</MapView>

	         	<TouchableOpacity onPress={ () => { this.props.method() }}>
		         	<View style={[ maps.close ]}>
		         		<Image style={ maps.closeBtn } source={{ uri: 'https://corono.s3-eu-west-1.amazonaws.com/icons/Close.png' }} />
		         	</View>
	         	</TouchableOpacity>

			</View>
		)
	}

}