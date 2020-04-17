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
import Modal from 'react-native-modal';

import Svg, { G, Rect, RadialGradient, LinearGradient, Stop, Path, Circle, Text as SVGText } from 'react-native-svg';
import AsyncStorage from '@react-native-community/async-storage';

import { Surface, Group, Shape, ART } from '@react-native-community/art';
import * as d3 from 'd3';

const today = [
  { name: 'actual', kms: 34 },
  { name: 'over', kms: 66 },
]

const yesterday = [
  { name: 'actual', kms: 89 },
  { name: 'over', kms: 11 },
]

const todaySizes = [200, 140];
const yesterdaySizes = [200, 120];

const todayAngles = d3.pie().value(d => d.kms)(today);
const yesterdayAngles = d3.pie().value(d => d.kms)(yesterday);

const todayPath = d3.arc()
  .outerRadius(todaySizes[1])
  .innerRadius(todaySizes[1] - 8)
  .padAngle(.03);

const yesterdayPath = d3.arc()
  .outerRadius(yesterdaySizes[1])
  .innerRadius(yesterdaySizes[1] - 4)
  .padAngle(.03);

const colorsToday = ['rgba(255, 255, 255, 1)', 'rgba(0, 0, 0, 0)'];
const colorsYesterday = ['rgba(0, 0, 0, .2)', 'rgba(0, 0, 0, 0)'];

import Notifications from './Notifications';

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
		isModalVisible: false,
		scale: new Animated.Value(1),
		headerRadius: new Animated.Value(0),
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

	_showModal() {

		let toScale = (this.state.isModalVisible) ? 1 : .95;
		let toRadius = (this.state.isModalVisible) ? 0 : 1;

		Animated.parallel([
			Animated.timing(this.state.scale, {
				toValue: toScale,
				duration: 400,
				easing: Easing.out(Easing.cubic),
				useNativeDriver: true
			}),
			Animated.timing(this.state.headerRadius, {
				toValue: toRadius,
				duration: 1000,
				easing: Easing.out(Easing.cubic),
				useNativeDriver: true
			}),
		]).start();

		this.setState({isModalVisible: !this.state.isModalVisible});

	}

	render() {

		const interpolateColor = this.state.toggleColor.interpolate({
			inputRange: [0, 1],
			outputRange: ['#EEEEEE', '#2A333E']
		})

		const interpolateRadius = this.state.headerRadius.interpolate({
			inputRange: [0, 1],
			outputRange: [0, 30]
		})

		return (

			<View style={[ viewport.container ]}>

				<TouchableOpacity style={[ nav.notificationIcon ]} onPress={() => { this._showModal() }}>
					<Text style={[ font.regular, font.white, { fontWeight: 'bold' }]}>3</Text>
				</TouchableOpacity>
				<Modal 
					isVisible={ this.state.isModalVisible }
					hasBackdrop={ false }
					style={[ viewport.modal ]}
					coverScreen={ false }
					useNativeDriver={ true }
					>
					<View style={{ flex: 1, backgroundColor: '#F9F9F9', borderRadius: 30 }}>
						<Notifications />
					</View>
				</Modal>

				<Animated.View style={[ (this.state.isModalVisible) ? viewport.scale : null, viewport.header, { transform: [{ scale: this.state.scale }], borderRadius: interpolateRadius }]}>
					
					<View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>


						<Svg width="100%" height="100%" viewBox="0 0 100 100">

							<RadialGradient id="grad" x1="0%" y1="30%" x2="0%" y2="100%">
								<Stop offset="0%" stopColor='#FF8E41' stopOpacity="1" />
								<Stop offset="75%" stopColor='#FE812C' stopOpacity="1" />
								<Stop offset="100%" stopColor='#ED8415' stopOpacity="1" />
							</RadialGradient>

							<Circle cx="50" cy="10" r="100" fill="url(#grad)" />

						</Svg>

						<Surface width={ SCREEN_WIDTH } height={ SCREEN_WIDTH } style={{ position: 'absolute', top: '3%', left: 0, transform: [{ rotate: '180deg' }] }}>
					        
					        <Group x={ todaySizes[1] + (SCREEN_WIDTH - todaySizes[1] * 2) / 2 } y={ todaySizes[1] }>
					          {
							      todayAngles.map(section => (
							        <Shape
							          key={ section.index }
							          d={ todayPath(section) }
							          fill={ '#FFF' }
							          strokeWidth={ 0 }
							          fill={ colorsToday[section.index] }
							        />
							      ))
							    }  
					        </Group>

					        <Group x={ yesterdaySizes[1] + (SCREEN_WIDTH - yesterdaySizes[1] * 2) / 2 } y={ yesterdaySizes[1] + 20 }>
					          {
							      yesterdayAngles.map(section => (
							        <Shape
							          key={ section.index }
							          d={ yesterdayPath(section) }
							          fill={ '#FFF' }
							          strokeWidth={ 0 }
							          fill={ colorsYesterday[section.index] }
							        />
							      ))
							    }  
					        </Group>

					      </Surface>

					</View>

					<View style={{ padding: 0, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<View style={[ stats.clmn, { paddingTop: 30} ]}>
							<Text style={ font.statSub }>total kms today</Text>
							<Text style={[ font.statTitle ]}>34.265</Text>
							<Text style={ font.statSub }>89.458 kms yesterday</Text>
						</View>
					</View>

				</Animated.View>

				<View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 40 }}>

					<TouchableOpacity activeOpacity={ 1 } onPress={() => { this.props.navigation.navigate('Stats') }} style={[ buttons.stats ]}>
						<Image style={ buttons.icon, buttons.smaller } source={{uri: 'https://corono.s3-eu-west-1.amazonaws.com/icons/Stats.png'}} />
					</TouchableOpacity>
					
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