import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Splash from './src/screens/Splash';
import Dashboard from './src/screens/Dashboard';
import Settings from './src/screens/Settings';
import Stats from './src/screens/Stats';
import Heatmap from './src/screens/Heatmap';

const Project = createStackNavigator(
	{
		Splash: { screen: Splash },
		Dashboard: { screen: Dashboard },
		Settings: { screen: Settings },
		Stats: { screen: Stats },
		Heatmap: { screen: Heatmap },
	},
	{
		initialRouteName: 'Splash',
		headerMode: 'none'
	}
)

export default createAppContainer(Project);