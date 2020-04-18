/**

	Component: Graph
	Data: 
		- Risk scores array : [1, 2, 3, 4, 5, 6] (6 days ago til today)
		- Risk score objects in array for each of the last 6 days { date: ...new Date(y, m, d), y: ...risk score}

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


// risk score data
const values = [20, 35, 65, 10, 45, 30];
const data = [
	{ x: new Date(2020, 9, 1), y: values[0] },
	{ x: new Date(2020, 9, 2), y: values[1] },
	{ x: new Date(2020, 9, 3), y: values[2] },
	{ x: new Date(2020, 9, 4), y: values[3] },
	{ x: new Date(2020, 9, 5), y: values[4] },
	{ x: new Date(2020, 9, 6), y: values[5] }
];

// set dimensions
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const height = 200;
const { width } = Dimensions.get('window');
const verticalPadding = 6;
const cursorRadius = 10;
const labelWidth = 60;

const scaleX = scaleTime().domain([new Date(2020, 9, 1), new Date(2020, 9, 6)]).range([0, SCREEN_WIDTH]);
const scaleY = scaleLinear().domain([0, 100]).range([height - verticalPadding, verticalPadding]);
const scaleLabel = scaleQuantile().domain([0, 100]).range(values);

const line = d3.shape.line()
	.x(d => scaleX(d.x))
	.y(d => scaleY(d.y))
	.curve(d3.shape.curveNatural)(data);

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
		const label = scaleY.invert(y).toFixed(0);
		this.label.current.setNativeProps({ text: `${label}` });
	}

	componentDidMount() {

		this.state.x.addListener(({value}) => this.moveCursor(value));
		this.moveCursor(0);

		InteractionManager.runAfterInteractions(() => {
			setTimeout(() => {
				this.scrollview.current.scrollTo({ x: SCREEN_WIDTH * 1.1, animated: false });
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

		// scale hairlines
		const hairlines = [1, 1, .8, .6, .6, .4, .2, .2];
		// const hairlines = [1, 1];

		return (

			<SafeAreaView style={ styles.root }>

				<View style={ styles.container }>

					<View style={ styles.scale }>
	                	<Text style={ styles.scaleText }>100</Text>
	                	<View style={ styles.hairline } />
	                	<View style={ styles.hairline } />
	                	

	                	{ 
	                		hairlines.map((alpha, key) => {

	                			return(<View key={ key } style={[ styles.hairline, { opacity: alpha } ]} />)

	                		})
	                	}

	              	</View>

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
		bottom: -40, 
		left: 0,
	},
	textinput: {
		fontSize: 16,
		fontWeight: 'bold',
		color: 'white'
	},
	shadow: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.2,
		shadowRadius: 30,
	},
	scale: { 
		position: 'absolute', top: 0, left: 20, alignItems: 'center'
	},
	scaleText: {
		fontSize: 12,
		fontWeight: 'bold',
		color: 'white'
	},
	hairlines: {
		marginTop: 10
	},
	hairline: {
		marginTop: 5,
		width: 10,
		height: 1,
		backgroundColor: 'white'
	}
});

export default Graph;