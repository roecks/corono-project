/**

	Screen: Settings

**/

import React, {Component, useRef} from 'react';
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
  PanResponder,
  StatusBar
} from 'react-native';

import Svg, { Rect, RadialGradient, LinearGradient, Stop, Path, Circle, Text as SVGText } from 'react-native-svg';
import { PanGestureHandler } from  'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import DraggableToggle from '../components/DraggableToggle';

// import styles
import { viewport, font, buttons, nav, stats, sliders } from '../stylesheets/master';

// set dimensions
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Settings extends React.Component {

	state = {
		publickey: ''
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


	render() {

		return (

			<View style={[ viewport.container ]}>

				<View style={{ position: 'relative', flex: 2, backgroundColor: '#FFF', justifyContent: 'flex-end', alignItems: 'stretch' }}>
					
					<View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
						<Svg width="100%" height="100%" viewBox="0 0 100 100">

							<RadialGradient id="grad" x1="0%" y1="30%" x2="0%" y2="100%">
								<Stop offset="0%" stopColor='#FF8E41' stopOpacity="1" />
								<Stop offset="75%" stopColor='#FE812C' stopOpacity="1" />
								<Stop offset="100%" stopColor='#ED8415' stopOpacity="1" />
							</RadialGradient>

							<Circle cx="50" cy="-50" r="150" fill="url(#grad)" />
						</Svg>
					</View>

					<View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', padding: 50, paddingTop: 80 }}>

						<View style={{ marginBottom: 20 }}>
							<Text style={ font.statSub }>Public key</Text>
							<Text style={ font.key }>{ this.state.publickey }</Text>
						</View>
						<View>
							<Text style={ font.statSub }>Private key</Text>
							<Image style={[ buttons.icon, buttons.active, { marginTop: 5 }]} source={{ uri: 'https://corono.s3-eu-west-1.amazonaws.com/icons/Eye.png'}} />
						</View>


					</View>

				</View>

				<View style={{ flex: 4, justifyContent: 'flex-start', alignItems: 'stretch', padding: 50, paddingTop: 30 }}>
					
					<DraggableToggle title='hoofdpijnen' />
					<DraggableToggle title='verkouden' />
					<DraggableToggle title='benauwd' />
					<DraggableToggle title='misselijk' />
					<DraggableToggle title='koorts' />
					<DraggableToggle title='diarree' />

				</View>

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

export default Settings;