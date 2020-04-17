/**

	Screen: Stats

**/

import React, {Component} from 'react';
import {
  TextInput,
  StyleSheet,
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
import Graph from '../components/Graph';

// import styles
import { viewport, font, buttons, nav, stats, maps } from '../stylesheets/master';

// set dimensions
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Stats extends React.Component {

	state = {
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
			delay: 500,
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

				<View style={{ position: 'relative', flex: 2, backgroundColor: '#FFF', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: '#FE812C' }}>						

            <View style={ styles.titleArea }>
              
            </View>

            <Graph />

				</View>

				<View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'center', padding: 40 }}>

          {/*
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
          */}


          <Text style={[ styles.heading ]}>dit is het verloop van jouw risicoscore</Text>
					<Text style={[ font.caption, { width: '80%', textAlign: 'center', marginTop: 30 } ]}>Jouw risicoscore wordt berekend op basis van jouw anonieme bewegingen van de afgelopen 6 dagen afgezet tegen de bewegingen van de gemeenschap en de symptomen.</Text>

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

const styles = StyleSheet.create({
  titleArea: {
    position: 'absolute', top: 0, left: 0, 
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
  },
  heading: {
    width: '70%',
    textAlign: 'center',
    fontSize: 24,
    color: '#000'
  }
});

