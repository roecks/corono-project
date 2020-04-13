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

// import styles
import { font, sliders } from '../stylesheets/master';

// set dimensions
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const circleRadius = 30;

export default class DraggableToggle extends Component {

	state = {
		progressWidth: new Animated.Value(0),
		alpha: new Animated.Value(0),
		emojiUrl: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/face-with-uneven-eyes-and-wavy-mouth_1f974.png'
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
			this._setEmojis();
		});
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

			Animated.timing(this.state.progressWidth, {
				toValue: this._lastOffset.x,
				duration: 600,
				easing: Easing.out(Easing.cubic),
				useNativeDriver: false
			}).start();

		}
	}

	render() {
		return (
			<View style={[ sliders.holder ]}>

				<View style={[ sliders.title ]}>
					<Text style={[ font.statSub, { color: '#000' }]}>{ this.props.title }</Text>
				</View>

				<Animated.View  style={ sliders.bar }>
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