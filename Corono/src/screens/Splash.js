/**

	Screen: Spash

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
  View,
  ScrollView,
  Text,
} from 'react-native';

import Svg, { Rect, RadialGradient, LinearGradient, Stop, Path, Circle, Text as SVGText } from 'react-native-svg';

// blockchain + encryption
import { sha256 } from 'react-native-sha256';
import { Keypair } from '@pigzbe/react-native-stellar-sdk';
import AsyncStorage from '@react-native-community/async-storage';

// import styles
import { viewport, font, buttons } from '../stylesheets/master';

// set dimensions
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Splash extends React.Component {

	componentDidMount() {

		// sha256('hello').then(hash => {
		// 	console.log(hash);
		// });

		this._checkAccount();

	}

	_checkAccount = async () => {

		try {
			const publickey = await AsyncStorage.getItem('@publickey');
			if(publickey !== null) {
				this.props.navigation.navigate('Dashboard');
			}
		} catch (e) {
			console.log(e);
		}

	}

	_createAccount = async () => {

		const keypair = await Keypair.randomAsync();
		const publickey = keypair.publicKey();
		const privatekey = keypair.secret();
		console.log(publickey);

		try {
			await AsyncStorage.setItem('@publickey', publickey);
			await AsyncStorage.setItem('@privatekey', privatekey);

			this.props.navigation.navigate('Dashboard');
		} catch (e) {
			console.log(e);
		}

	}

	render() {
		return (

			<View style={[ viewport.container ]}>

				<View style={{ position: 'relative', flex: 3, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'flex-start' }}>

					<View style={{ position: 'absolute', bottom: 0, left: 60, width: 29, height: 58, backgroundColor: '#000', zIndex: 0, transform: [{ translateX: -14 }] }}>
						<Image style={{ width: 29, height: 58 }} source={{ uri: 'https://corono.s3-eu-west-1.amazonaws.com/branding/Rijksoverheid.png' }} />
					</View>
					
					<View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
						<Svg width="100%" height="100%" viewBox="0 0 100 100">

							<RadialGradient id="grad" x1="0%" y1="30%" x2="0%" y2="100%">
								<Stop offset="0%" stopColor='#FF8E41' stopOpacity="1" />
								<Stop offset="75%" stopColor='#FE812C' stopOpacity="1" />
								<Stop offset="100%" stopColor='#ED8415' stopOpacity="1" />
								{/*
								<Stop offset="0%" stopColor='#FFB50D' stopOpacity="1" />
								<Stop offset="75%" stopColor='#FF9500' stopOpacity="1" />
								<Stop offset="100%" stopColor='#ED8415' stopOpacity="1" />
								*/}
							</RadialGradient>

							<Circle cx="50" cy="20" r="100" fill="url(#grad)" />
						</Svg>
					</View>

					<View style={{ padding: 40 }}>
						<Text style={[ font.heading, font.white ]}>Corono</Text>
						<Text style={[ font.bodyText, font.white ]}>
							Een open-source mobiele applicatie die de gemeenschap inzicht geeft in het risico op besmetting in contact met de omgeving.
						</Text>
					</View>

				</View>

				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', padding: 40 }}>
					
					<TouchableOpacity onPress={() => { this._createAccount(); }}>
						<View style={[ buttons.btn ]}>
							<Text style={[ buttons.btnText ]}>
								Ik doe mee
							</Text>
						</View>
					</TouchableOpacity>
					<Text style={[ font.caption ]}>
						The Corono app is ontwikkeld met privacy als uitgangspunt. Lees meer over hoe jouw data wordt opgeslagen en gebruikt.
					</Text>

				</View>
				
			</View>

		)
	}

}

export default Splash;