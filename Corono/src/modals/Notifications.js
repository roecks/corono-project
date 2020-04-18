/**

	Modal: Notifications

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

import { Navigation } from 'react-navigation';

import Svg, { Rect, RadialGradient, LinearGradient, Stop, Path, Circle, Text as SVGText } from 'react-native-svg';
import AsyncStorage from '@react-native-community/async-storage';

import Notification from '../components/Notification';

// import styles
import { viewport, font, buttons, nav, stats, notifications } from '../stylesheets/master';

// set dimensions
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Notifications extends React.Component {

	state = {
		publickey: ''
	}

	componentDidMount() {
		this._setPublickey();
	}

	_getNotifications = async  () => {
		
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

	render() {

		return (

			<ScrollView style={[ notifications.container ]}>
				
				<Notification 
					date="2 uur geleden" 
					title="Je bent lekker bezig."  
					message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lectus ipsum, auctor sit amet feugiat quis, pulvinar at tellus. Class aptent taciti sociosqu ad litora torquent per conubia nostra."
					read={ true }
				/>

				<Notification 
					date="2 uur geleden" 
					title="Hou jezelf in de gaten."  
					message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lectus ipsum, auctor sit amet feugiat quis, pulvinar at tellus. Class aptent taciti sociosqu ad litora torquent per conubia nostra."
				/>

				<Notification 
					date="2 uur geleden" 
					title="Challenge update."  
					message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lectus ipsum, auctor sit amet feugiat quis, pulvinar at tellus. Class aptent taciti sociosqu ad litora torquent per conubia nostra."
				/>

			</ScrollView>

		)
	}

}

export default Notifications;