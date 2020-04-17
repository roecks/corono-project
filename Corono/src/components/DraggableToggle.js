/**

	Component: DraggableToggle

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
import AsyncStorage from '@react-native-community/async-storage';

// import styles
import { font, sliders } from '../stylesheets/master';

// set dimensions
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const circleRadius = 30;

export default class DraggableToggle extends Component {

	state = {

		barWidth: 0,
		progressWidth: new Animated.Value(0),
		alpha: new Animated.Value(0),
		emojiUrl: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/face-with-uneven-eyes-and-wavy-mouth_1f974.png',

	}

	constructor() {
		
		super();

		this._translateX = new Animated.Value(0);
		this._lastOffset = { x: 0 };

		this._onGestureEvent = Animated.event(
			[{
				nativeEvent: { 
					translationX: this._translateX
				}
			}], 
			{
				useNativeDriver: true
			}
		);

	}

	componentDidMount = () => {
		InteractionManager.runAfterInteractions(() => {
			setTimeout(() => { 
				this._setEmojis();
				this._moveEmojis() 
			}, 100);
		});
	}

	_measure = (event) => {
		this.setState({ barWidth: event.nativeEvent.layout.width });
	}

	_setEmojis = () => {

		if(this.props.title === 'hoofdpijnen') this.setState({ emojiUrl: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/face-with-head-bandage_1f915.png' });
		if(this.props.title === 'verkouden') this.setState({ emojiUrl: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/sneezing-face_1f927.png' });
		if(this.props.title === 'benauwd') this.setState({ emojiUrl: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/face-with-medical-mask_1f637.png' });
		if(this.props.title === 'misselijk') this.setState({ emojiUrl: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/nauseated-face_1f922.png' });
		if(this.props.title === 'koorts') this.setState({ emojiUrl: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/overheated-face_1f975.png' });
		if(this.props.title === 'diarree') this.setState({ emojiUrl: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/face-with-uneven-eyes-and-wavy-mouth_1f974.png' });

		Animated.timing(this.state.alpha, {
			toValue: 1,
			duration: 600,
			easing: Easing.out(Easing.cubic),
			useNativeDriver: true
		}).start();
	}

	_onHandlerStateChange = event => {
		if(event.nativeEvent.oldState === State.ACTIVE) {

			this._lastOffset.x += event.nativeEvent.translationX;
			this._translateX.setOffset(this._lastOffset.x);
			this._translateX.setValue(0);

			const score = (this._lastOffset.x / this.state.barWidth * 100).toFixed(0);
			this._setScore(score);

			this._animProgress(this._lastOffset.x);
		}
	}

	_moveEmojis = async () => {

		try{

			let symptoms = await AsyncStorage.getItem('symptoms');
			symptoms = JSON.parse(symptoms);

			const x = symptoms[this.props.item] / 100 * this.state.barWidth;
			this._lastOffset.x = x;
			this._translateX.setOffset(x);
			this._translateX.setValue(0);

			this._animProgress(this._lastOffset.x);

		} catch(e) {
			console.log(e);
		}

	}

	_animProgress = (toWidth) => {
		console.log('width: '+ toWidth);
		Animated.timing(this.state.progressWidth, {
			toValue: toWidth,
			duration: 600,
			easing: Easing.out(Easing.cubic),
			useNativeDriver: false
		}).start();
	}

	_setScore = async (score) => {

		const key = this.props.item;
		const symptoms = { [key]: Number(score) };

		try{
			await AsyncStorage.mergeItem('symptoms', JSON.stringify(symptoms));
		} catch(e) {
			console.log(e);
		}

		console.log('stored');
		this._calcCovid();

		try{
			const check = await AsyncStorage.getItem('symptoms');
		} catch(e) {
			console.log(e);
		}

	}

	_calcCovid = async () => {

		let symptoms = await AsyncStorage.getItem('symptoms');
		symptoms = JSON.parse(symptoms);
		console.log(symptoms['headache']);

		let totalScore = 0;
		const h = symptoms['headache'];
		const c = symptoms['cold'];
		const s = symptoms['stuffy'];
		const n = symptoms['nauseous'];
		const f = symptoms['fever'];
		const d = symptoms['diarrhea'];
		totalScore = h + c + s + n + f + d;
		console.log(totalScore);

		let covid = (totalScore / 6).toFixed(0);
		
		try {
			await AsyncStorage.setItem('covid', covid);
			console.log(covid);
			this._checkCovid();
		} catch(e) {
			console.log(e);
		}
		
	}

	_checkCovid = async () => {
		try {
			const covid = await AsyncStorage.getItem('covid');
			console.log(covid);
		} catch(e) {
			console.log(e);
		}
	}

	render() {
		return (
			<View style={[ sliders.holder ]}>

				<View style={[ sliders.title ]}>
					<Text style={[ font.statSub, { color: '#000' }]}>{ this.props.title }</Text>
				</View>

				<Animated.View  style={ sliders.bar } onLayout={(event) => { this._measure(event) }}>
					<Animated.View style={[ sliders.progress, { width: this.state.progressWidth }]}></Animated.View>
					<PanGestureHandler onGestureEvent={  this._onGestureEvent } onHandlerStateChange={ this._onHandlerStateChange } hitSlop={{ left: 0, width: 100 }}>
						<Animated.View style={[ sliders.icon, { opacity: this.state.alpha, transform: [{ translateX: this._translateX }] }]}>
							<Image style={{ width: 24, height: 24 }} source={{ uri: this.state.emojiUrl }} />
						</Animated.View>
					</PanGestureHandler>
				</Animated.View>

			</View>
		)
	}

}