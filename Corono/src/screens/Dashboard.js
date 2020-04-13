/**

	Screen: Dashboard

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

// import styles
import { viewport, font, buttons, nav, stats } from '../stylesheets/master';

// set dimensions
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Dashboard extends React.Component {

	state = {
		toggle: false,
		togglePos: new Animated.Value(0),
		toggleColor: new Animated.Value(0),
		syncAlpha: new Animated.Value(1),
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

	_toggle = () => {

		this.setState(prevState => ({
		  toggle: !prevState.toggle
		}));

		Animated.parallel([
	        Animated.timing(this.state.togglePos, {
	          toValue: (this.state.toggle) ? 0 : 80 - 36,
	          duration: 300,
	          easing: Easing.out(Easing.cubic),
	          useNativeDriver: true
	        }),
	        Animated.timing(this.state.syncAlpha, {
	          toValue: (this.state.toggle) ? 1 : 0,
	          duration: 300,
	          easing: Easing.out(Easing.cubic),
	          useNativeDriver: true
	        }),
	        Animated.timing(this.state.toggleColor, {
	          toValue: (this.state.toggle) ? 0 : 1,
	          duration: 600,
	          delay: 300,
	          easing: Easing.out(Easing.cubic),
	          useNativeDriver: false
	        }),
      	]).start();

	}

	_clearUI = async () => {
		await AsyncStorage.clear();
		this.props.navigation.navigate('Splash');
	}

	render() {

		const interpolateColor = this.state.toggleColor.interpolate({
			inputRange: [0, 1],
			outputRange: ['#EEEEEE', '#2A333E']
		})

		return (

			<View style={[ viewport.container ]}>

				<View style={{ position: 'relative', flex: 2, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' }}>
					
					<View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
						<Svg width="100%" height="100%" viewBox="0 0 100 100">

							<RadialGradient id="grad" x1="0%" y1="30%" x2="0%" y2="100%">
								<Stop offset="0%" stopColor='#FF8E41' stopOpacity="1" />
								<Stop offset="75%" stopColor='#FE812C' stopOpacity="1" />
								<Stop offset="100%" stopColor='#ED8415' stopOpacity="1" />
							</RadialGradient>

							<Circle cx="50" cy="10" r="100" fill="url(#grad)" />
						</Svg>
					</View>

					<View style={{ padding: 0, flex: 1, alignItems: 'center', flexDirection: 'row' }}>
						<View style={[ stats.clmn, { alignItems: 'flex-end', borderRightWidth: 1, borderColor: 'rgba(255, 255, 255, .2)', paddingBottom: 100 }]}>
							<Text style={ font.statTitle }>34%</Text>
							<Text style={ font.statSub }>encounter score</Text>
						</View>
						<View style={[ stats.clmn, { marginTop: 0 }]}>
							<Text style={ font.statSub }>high risk encounters</Text>
							<Text style={ font.statTitleSmall }>5%</Text>
							<TouchableOpacity style={{ marginTop: 15 }} onPress={() => { this.props.navigation.navigate('Stats') }}>
								<Image style={ buttons.icon } source={{uri: 'https://corono.s3-eu-west-1.amazonaws.com/icons/Stats.png'}} />
							</TouchableOpacity>
						</View>
					</View>

				</View>

				<View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 40 }}>
					
					<View>
						<TouchableOpacity onPress={() => { this._clearUI() }}>
							<Animated.View style={[ buttons.btn, { opacity: this.state.syncAlpha }]}>
								<Text style={ buttons.btnText }>synchroniseer</Text>
							</Animated.View>
						</TouchableOpacity>

						<Text style={[ font.caption, { paddingRight: 40, paddingLeft: 40, textAlign: 'center'} ]}>Je kan er ook voor kiezen om je locatiegegevens in real-time te delen ...</Text>

						<Animated.View style={[ buttons.toggleHolder, { backgroundColor: interpolateColor }]}>
							<TouchableHighlight onPress={ () => { this._toggle() }}>
								<Animated.View style={[ buttons.toggle, { transform: [{ translateX: this.state.togglePos }]} ]}></Animated.View>
							</TouchableHighlight>
						</Animated.View>

					</View>

				</View>

				<View style={[ nav.bar, nav.barRight ]}>
					<View style={[ nav.inner ]}>
						<TouchableOpacity style={[ nav.tab ]} onPress={ () => { this.props.navigation.navigate('Settings') }}>
							<View>
								<Image style={ buttons.icon } source={{uri: 'https://corono.s3-eu-west-1.amazonaws.com/icons/Settings.png'}} />
							</View>
						</TouchableOpacity>
					</View>
				</View>
				
			</View>

		)
	}

}

export default Dashboard;