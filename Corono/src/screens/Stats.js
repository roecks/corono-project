/**

	Screen: Stats

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

import Svg, { Rect, Polygon, RadialGradient, LinearGradient, Stop, Path, Circle, Text as SVGText } from 'react-native-svg';
import AsyncStorage from '@react-native-community/async-storage';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import Map from '../components/Map';

// import styles
import { viewport, font, buttons, nav, stats, maps } from '../stylesheets/master';

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

class Stats extends React.Component {

	state = {
		anchors: "0 0 414 0 414 500 331.2 325 248.4 430 165.6 470 82.8 400 0 448",
		points: [500, 325, 430, 470, 400, 448],
		activeToggle: 'hours',
		map: false,
		mapAlpha: new Animated.Value(0)
	}

	componentDidMount() {
		this._setPublickey();
	}

	_setPublickey = async () => {
		try {

			const publickey = await AsyncStorage.getItem('@publickey');
			await this.setState({ publickey: publickey });
			console.log(this.state.publickey);

		} catch (e) {
			console.log(e);
		}
	}

	_handleToggle = async (period) => {

		// alert(period);
		this.setState({ activeToggle: period });

		let points;
		if(period === 'hours') points = [500, 325, 430, 470, 400, 448];
		else if(period === 'days') points = [520, 430, 460, 380, 350, 400];
		else if(period === 'weeks') points = [500, 325, 430, 470, 400, 448];
		await this.setState({ points: points });

		let anchors = "0 0 414 0 414 "+ this.state.points[0] +" 331.2 "+ this.state.points[1] +" 248.4 "+ this.state.points[2] +" 165.6 "+ this.state.points[3] +" 82.8 "+ this.state.points[4] +" 0 "+ this.state.points[5];
		this.setState({ anchors: anchors });

	}

	_openMaps = () => {
		this.setState({ map: true });
		Animated.timing(this.state.mapAlpha, {
			toValue: 1,
			duration: 300,
			easing: Easing.out(Easing.cubic),
			delay: 100,
	        useNativeDriver: true
		}).start();
	}

	_closeMaps = () => {
		Animated.timing(this.state.mapAlpha, {
			toValue: 0,
			duration: 10,
			easing: Easing.out(Easing.cubic),
			delay: 100,
	        useNativeDriver: true
		}).start(() => { this.setState({ map: false }) });
	}

	render() {

		let map = (this.state.map) ? <Animated.View style={[ maps.holder, { opacity: this.state.mapAlpha } ]}><Map method={ this._closeMaps } /></Animated.View> : null;

		return (

			<View style={[ viewport.container ]}>

				<View style={{ position: 'relative', flex: 2, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' }}>
					
					<View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
						<Svg width={ 414 } height={ 600 } viewBox="0 0 414 600">

							<RadialGradient id="grad" x1="0%" y1="30%" x2="0%" y2="100%">
								<Stop offset="0%" stopColor='#FF8E41' stopOpacity="1" />
								<Stop offset="75%" stopColor='#FE812C' stopOpacity="1" />
								<Stop offset="100%" stopColor='#ED8415' stopOpacity="1" />
							</RadialGradient>

							<LinearGradient id="line" x1="0%" y1="0%" x2="0%" y2="100%">
								<Stop offset="0" stopColor='#DDD' stopOpacity="1" />
								<Stop offset="1" stopColor='#FFF' stopOpacity="1" />
							</LinearGradient>

							<Rect x="330" y={ this.state.points[1] } width="1" height="80" fill="url(#line)" />
							<Rect x="248" y={ this.state.points[2] } width="1" height="80" fill="url(#line)" />
							<Rect x="165" y={ this.state.points[3] } width="1" height="80" fill="url(#line)" />
							<Rect x="82" y={ this.state.points[4] } width="1" height="80" fill="url(#line)" />

							<Polygon id="Rectangle" points={ this.state.anchors } fill="url(#grad)"></Polygon>
							
							<Circle cx="331.2" cy={ this.state.points[1] } r="7" fill="white" fillOpacity="1" stroke="#FF6500" strokeWidth="2" />
							<Circle cx="248.4" cy={ this.state.points[2] } r="7" fill="white" fillOpacity="1" stroke="#FF6500" strokeWidth="2" />
							<Circle cx="165.6" cy={ this.state.points[3] } r="7" fill="white" fillOpacity="1" stroke="#FF6500" strokeWidth="2" />
							<Circle cx="82.8" cy={ this.state.points[4] } r="7" fill="white" fillOpacity="1" stroke="#FF6500" strokeWidth="2" />
							

						</Svg>
					</View>

					<View style={{ padding: 0, flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            {/*
						<View style={[ stats.clmn, { padding: 0 } ]}>
              <View style={{ borderBottomWidth: 1, borderBottomColor: '#FFF' }}>
                <Text style={[ font.statSub ]}>encounter score</Text>
              </View>
							<Text style={[ font.statTitle, { top: -10 }]}>34</Text>
						</View>
						<View style={[ stats.clmn, { padding: 0 }]}>
              <View style={{ borderBottomWidth: 1, borderBottomColor: '#FFF' }}>
							   <Text style={[ font.statSub ]}>riskyness</Text>
              </View>
              <Text style={ font.statTitleSmall }>5%</Text>
						</View>
            */}

					</View>

				</View>

				<View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', padding: 40 }}>

					<View>
						
						<View style={ stats.toggles }>
							<TouchableOpacity onPress={() => { this._handleToggle('hours') }}>
								<View style={[ stats.toggle ]}>
									<Text style={[ stats.toggleText, this.state.activeToggle === 'hours' ? stats.active : null ]}>uren</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => { this._handleToggle('days') }}>
								<View style={ stats.toggle }>
									<Text style={[ stats.toggleText, this.state.activeToggle === 'days' ? stats.active : null ]}>dagen</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => { this._handleToggle('weeks') }}>
								<View style={ stats.toggle }>
									<Text style={[ stats.toggleText, this.state.activeToggle === 'weeks' ? stats.active : null ]}>weken</Text>
								</View>
							</TouchableOpacity>
						</View>

					</View>

					<Text style={[ font.caption, { paddingRight: 80, paddingLeft: 80, textAlign: 'center', marginTop: 30 } ]}>Bekijk jouw resultaten over 5 uren, dagen of weken.</Text>

					<TouchableOpacity onPress={() => { this._openMaps() }}>
						<View style={{ width: 40, height: 40, marginTop: 30 }}>
							<Image style={{ width: 40, height: 40 }} source={{ uri: 'https://corono.s3-eu-west-1.amazonaws.com/icons/Maps.png'}} />
						</View>
					</TouchableOpacity>

				</View>

				

				{ map }



				<View style={[ nav.bar, nav.barLeft ]}>
					<View style={[ nav.inner ]}>
						<TouchableOpacity style={[ nav.tab ]} onPress={ () => { this.props.navigation.goBack(null) }}>
							<View>
								<Image style={[ buttons.icon, buttons.wide, buttons.active ]} source={{uri: 'https://corono.s3-eu-west-1.amazonaws.com/icons/Dashboard.png'}} />
							</View>
						</TouchableOpacity>
					</View>
				</View>
				
			</View>

		)
	}

}

export default Stats;