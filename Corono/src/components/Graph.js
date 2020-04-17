/**

	Component: Graph

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
	View,
	ScrollView,
	Text,
	SafeAreaView
} from 'react-native';

import { Navigation } from 'react-navigation';

import Svg, { Defs, G, Rect, RadialGradient, LinearGradient, Stop, Path, Circle, Text as SVGText } from 'react-native-svg';
const AnimatedPath = Animated.createAnimatedComponent(Path);

import { Surface, Group, Shape, ART } from '@react-native-community/art';

// import * as d3 from 'd3';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as path from 'svg-path-properties';

const d3 = {
	shape
}

import {
	scaleTime,
	scaleLinear,
	scaleQuantile
} from 'd3-scale';

// set dimensions
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const height = 200;
const { width } = Dimensions.get('window');
const verticalPadding = 6;
const cursorRadius = 10;
const labelWidth = 70;

const valueOne = new Animated.Value(20);
const values = [20, 45, 65, 10, 45, 30];
const data = [
	{ x: new Date(2020, 9, 1), y: values[0] },
	{ x: new Date(2020, 9, 2), y: values[1] },
	{ x: new Date(2020, 9, 3), y: values[2] },
	{ x: new Date(2020, 9, 4), y: values[3] },
	{ x: new Date(2020, 9, 5), y: values[4] },
	{ x: new Date(2020, 9, 6), y: values[5] }
];

const scaleX = scaleTime().domain([new Date(2020, 9, 1), new Date(2020, 9, 6)]).range([0, SCREEN_WIDTH]);
const scaleY = scaleLinear().domain([0, 100]).range([height - verticalPadding, verticalPadding]);
const scaleLabel = scaleQuantile().domain([0, 300]).range(values);

const line = d3.shape.line()
	.x(d => scaleX(d.x))
	.y(d => scaleY(d.y))
	.curve(d3.shape.curveBasis)(data);

const properties = path.svgPathProperties(line);
const lineLength = properties.getTotalLength();

class Graph extends React.Component {

	cursor = React.createRef();
	label = React.createRef();
	scrollview = React.createRef();

	state = {
		x: new Animated.Value(0),
		alpha: new Animated.Value(0),
		publickey: '',
		values: [20, 100, 200, 150, 225, 250]
	}

	moveCursor = (value) => {
		const {x, y} = properties.getPointAtLength(value);
		this.cursor.current.setNativeProps({ top: y - cursorRadius, left: x - cursorRadius });
		const label = scaleLabel(scaleY.invert(y));
		this.label.current.setNativeProps({ text: `${label}` });
	}

	componentDidMount() {

		this.state.x.addListener(({value}) => this.moveCursor(value));
		this.moveCursor(0);

		InteractionManager.runAfterInteractions(() => {
			setTimeout(() => {
				this.scrollview.current.scrollToEnd({ animated: false });
				Animated.timing(this.state.alpha, {
					toValue: 1,
					duration: 500,
					easing: Easing.out(Easing.cubic),
	          		useNativeDriver: true
				}).start();
			}, 50);
			
		});

	}

	render() {

		const { x } = this.state;
		const translateX = x.interpolate({
			inputRange: [0, lineLength],
			outputRange: [0, width - labelWidth],
			extrapolate: "clamp"
		});

		return (

			<SafeAreaView style={ styles.root }>

				<View style={ styles.container }>

					<Svg {... { width, height }}>

						<Defs>
							<LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="gradient">
								<Stop stopColor="#EEE" offset="0%" />
								<Stop stopColor="#EEE" offset="50%" />
								<Stop stopColor="#FFF" offset="100%" />
							</LinearGradient>
						</Defs>

						<AnimatedPath d={ line } stroke="#FF8E41" strokeWidth={ verticalPadding } />
						<AnimatedPath d={`${line} L ${width} ${height} L 0 ${height}`} fill="url(#gradient)" />
						<Animated.View ref={ this.cursor } style={[ styles.cursor, styles.shadow, { opacity: this.state.alpha }]} />
					</Svg>

					<Animated.View style={[ styles.label, { transform: [{ translateX }], opacity: this.state.alpha }]}>
						<TextInput style={ styles.textinput } ref={ this.label } />
					</Animated.View>

					<Animated.ScrollView
						ref={ this.scrollview }
						style={ StyleSheet.absoluteFill }
						contentContainerStyle={{ width: lineLength * 2 }}
						showsHorizontalScrollIndicator = { false }
						scrollEventThrottle = { 16 }
						bounces= { false }
						onScroll={Animated.event(
							[{
								nativeEvent: {
									contentOffset: { x },
								},
							}],
							{ useNativeDriver: true }
						)}
						horizontal
					/>

				</View>
				
			</SafeAreaView>

		)
	}

}

const styles = StyleSheet.create({
	root: {
		height: height,
		backgroundColor: 'transparent'
	},
	container: {
		height,
		width
	},
	cursor: {
		width: cursorRadius * 2,
		height: cursorRadius * 2,
		borderRadius: cursorRadius,
		backgroundColor: 'white',
		borderWidth: 2,
		borderColor: '#FF8E41'
	},
	label: {
		backgroundColor: '#FF8E41',
		alignItems: 'center',
		padding: 5,
		width: labelWidth,
		borderRadius: 5,
		position: 'absolute',
		top: -45, 
		left: 0,
	},
	textinput: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white'
	},
	shadow: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.2,
		shadowRadius: 30,
	},
});

export default Graph;