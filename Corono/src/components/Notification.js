/**

	Component: Notification

**/

import React, {Component, useRef} from 'react';
import {
  Animated,
  Image,
  InteractionManager,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  View,
  ScrollView,
  Text,
  PanResponder,
  Easing
} from 'react-native';

import { PanGestureHandler, State } from  'react-native-gesture-handler';

// import styles
import { font, sliders, notifications } from '../stylesheets/master';

// set dimensions
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const circleRadius = 30;

export default class Notification extends Component {

	state = {
		unfold: false,
		read: false,
		margin: new Animated.Value(5)
	}

	componentDidMount = () => {
		InteractionManager.runAfterInteractions(() => {
			
		});
	}

	_unfold = async () => {
		await this.setState({ 
			unfold: !this.state.unfold,
			read: true
		});

		Animated.timing(this.state.margin, {
			toValue: (this.state.unfold) ? 30 : 5,
			duration: 250,
			easing: Easing.out(Easing.cubic),
			useNativeDriver: false
		}).start();
	}

	render() {

		const details = <View style={[ notifications.detailed ]}>
							<Text style={[ font.regular, notifications.message ]}>
								{ this.props.message }
							</Text>
						</View>

		return (
			<TouchableOpacity 
				activeOpacity={ .7 }
				onPress={() => { this._unfold() }}
				>
				<Animated.View style={[ notifications.notification, (this.state.unfold) ? notifications.unfold : null, { marginTop: this.state.margin, marginBottom: this.state.margin} ]}>
					<View style={[ notifications.label ]}>
						<View style={[ notifications.dot, (this.state.unfold) ? notifications.stretch : null, (this.props.read || this.state.read) ? notifications.read : null ]} />
					</View>
					<View style={{ justifyContent: 'center' }}>
						<Text style={[ font.statSub, { color: '#999' }]}>ONTVANGEN { this.props.date }</Text>
						<Text style={[ font.subheading ]}>{ this.props.title }</Text>
						{ (this.state.unfold) ? details : null }
					</View>
				</Animated.View>
			</TouchableOpacity>
		)
	}

}