

import {
  Dimensions,
  StyleSheet
} from 'react-native';

// set dimensions
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const viewport = StyleSheet.create({
  container: {
	  	position: 'relative',
	    flex: 1,
	    justifyContent: 'center',
	    alignItems: 'stretch',
	    // backgroundColor: '#D5FF44'
	    backgroundColor: '#FFF'
  },
  header: {
	  	position: 'relative', 
	  	flex: 2, 
	  	backgroundColor: '#FFF', 
	  	justifyContent: 'center', 
	  	alignItems: 'center'
  },
  scale: {
  		overflow: 'hidden'
  },
  modal: {
		position: 'relative', 
		margin: 0, 
		marginTop: 110, 
		zIndex: 1000,
		
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.2,
		shadowRadius: 30,
	}
});

const font = StyleSheet.create({
	heading: {
		fontSize: 56,
		color: '#000000',
		fontWeight: 'bold'
	},
	subheading: {
		fontSize: 16,
		color: '#000000',
		fontWeight: 'bold'
	},
	regular: {
		fontSize: 12,
		color: '#000000'
	},
	bodyText: {
		fontSize: 12,
		color: '#000000',
		paddingTop: 20,
		lineHeight: 20
	},
	caption: {
		fontSize: 10,
		color: '#999',
		lineHeight: 20
	},

	white: {
		color: '#FFF'
	},

	statTitle: {
		fontSize: 45,
		fontWeight: 'bold',
		color: '#FFF'
	},
	statTitleSmall: {
		fontSize: 40,
		fontWeight: 'bold',
		color: '#FFF'
	},
	statSub: {
		fontSize: 9,
		textTransform: 'uppercase',
		color: '#FFF',
		fontWeight: 'bold'
	},

	key: {
		fontSize: 11,
		paddingTop: 5,
		color: '#FFF'
	}
});

const buttons = StyleSheet.create({
	btn: {
		marginTop: 20,
		marginBottom: 20,
		borderRadius: 20,
		padding: 40,
		paddingTop: 12,
		paddingBottom: 12,
		backgroundColor: '#2A333E'
	},
	btnText: {
		color: '#FFFFFF',
		fontWeight: 'bold',
		textAlign: 'center'
	},
	icon: {
		width: 20, 
		height: 20,
		opacity: 1,
	},
	smaller: {
		width: 14, 
		height: 14,
		opacity: 1,
	},
	active: {
		opacity: 1
	},
	wide: {
		position: 'relative',
		top: -1,
		width: 25,
	},

	stats: {
		position: 'absolute', 
		top: -40, 
		width: 50, 
		height: 50, 
		borderRadius: 25, 
		backgroundColor: '#FFF', 
		alignItems: 'center', 
		justifyContent: 'center'
	},

	toggleHolder: {
		position: 'relative',
		marginTop: 15,
		marginLeft: 'auto',
		marginRight: 'auto',
		width: 80,
		height: 36,
		borderRadius: 18,
		backgroundColor: '#EEE'
	},
	toggle: {
		position: 'absolute',
		top: -1, left: -1,
		width: 38, height: 38,
		borderRadius: 20,
		backgroundColor: '#FFF',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.2,
		shadowRadius: 30,
	}
});

const nav = StyleSheet.create({
	notificationIcon: {
		position: 'absolute', 
		top: 50, 
		right: 30, 
		width: 40, 
		height: 40, 
		backgroundColor: '#FF8E41', 
		zIndex: 1001, 
		borderRadius: 10,
		borderBottomLeftRadius: 0,
		justifyContent: 'center',
		alignItems: 'center',

		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.2,
		shadowRadius: 30,
	},
	bar: {
		position: 'absolute',
		bottom: 30,
		width: '15%', 
		height: 50,
		backgroundColor: '#FFF',
		borderRadius: 10,

		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.25,
		shadowRadius: 40,
		elevation: 1,
		zIndex: 100,
	},
	barRight: {
		right: 30,
		borderTopLeftRadius: 0,
	},
	barLeft: {
		left: 30,
		borderTopRightRadius: 0
	},
	inner: {
		flex: 1,
		flexDirection: 'row'
	},
	tab: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

const stats = StyleSheet.create({
	clmn: {
		padding: 20,
		width: '70%',
		alignItems: 'center'
	},
	toggles: {
		width: 210,
		height: 30,
		borderRadius: 15,
		backgroundColor: '#EEE',
		flexDirection: 'row'
	},
	toggle: {
		width: 70,
		height: 30,
		justifyContent: 'center',
		alignItems: 'center'
	},
	toggleText: {
		fontSize: 12,
		color: '#000000',
		opacity: .4
	},
	active: {
		opacity: 1,
		fontWeight: 'bold'
	}
});

const sliders = StyleSheet.create({
	holder: {
		marginBottom: 30
	},
	title: {
		marginBottom: 20
	},
	bar: {
		position: 'relative',
		width: '100%',
		height: 10,
		borderRadius: 5,
		backgroundColor: '#EEE'
	},
	progress: {
		width: '20%',
		height: 10,
		borderRadius: 5,
		backgroundColor: '#2A333E'
	},
	icon: {
		position: 'absolute',
		top: -7, left: -7,
		width: 24,
		height: 24,
		borderRadius: 12,

		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.2,
		shadowRadius: 15,
	}
});

const maps = StyleSheet.create({
	holder: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		zIndex: 1000
	},
	wrapper: {
		position: 'absolute', 
		top: 0, 
		left: 0, 
		width: '100%', 
		height: '100%', 
		backgroundColor: '#000', 
		justifyContent: 'flex-end', 
		alignItems: 'center', 
		zIndex: 1000
	},
	map: {
		width: '100%', 
		height: '100%', 
		position: 'absolute', 
		top: 0, 
		left: 0
	},
	close: {
		width: 50, 
		height: 50, 
		backgroundColor: 'white', 
		borderRadius: 7, 
		marginBottom: '40%',
		justifyContent: 'center',
		alignItems: 'center',

		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.2,
		shadowRadius: 15,
	},
	closeBtn: {
		width: 20,
		height: 20
	}
});

const notifications = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		padding: 20,
		backgroundColor: '#F9F9F9',
		borderRadius: 20
	},
	notification: {
		width: '100%',
		flexDirection: 'row',
		paddingTop: 20,
		paddingBottom: 20,
		marginBottom: 10,
		borderRadius: 10,
		backgroundColor: 'white',
	},
	unfold: {		
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.1,
		shadowRadius: 15,
	},
	label: {
		width: '14%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	dot: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: 'orange'
	},
	read: {
		backgroundColor: '#EEE'
	},
	stretch: {
		height: 50,
		backgroundColor: '#EEE'
	},
	message: {
		lineHeight: 16
	},
	detailed: {
		marginTop: 10,
		width: '90%'
	}
});

export { viewport, font, buttons, nav, stats, sliders, maps, notifications }