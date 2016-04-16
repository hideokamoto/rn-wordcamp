import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
	TabBarIOS,
	ScrollView,
	NavigatorIOS
} from 'react-native';
var Icon = require('react-native-vector-icons/MaterialIcons');
import {
	Toolbar as MaterialToolbar,
} from 'react-native-material-design';

var NewsArchive = require('./src/component/NewsArchive.js');

class Test extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		return (
			<View>
				<Text>aa</Text>
			</View>
		)
	}
}

class Row extends React.Component {
	constructor( props ) {
		super( props );
	}

	_get_component() {
		if ( 'news' == this.props.type ) {
			return NewsArchive;
		} else {
			return Test;
		}
	}

	_get_title() {
		var title = 'WordCamp Kansai 2015';
		return title;
	}

	render () {
		return (
			<NavigatorIOS
				style={styles.navigator}
				initialRoute={{
					component: this._get_component(),
					title: this._get_title(),
					passProps: {
						apiPath: this.props.apiPath
					}
			}}/>
		)
	}
}

class WckApp extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			selectedTab: "news"
		};
	}

	render() {
		return (
			<TabBarIOS
				tintColor="white"
				barTintColor="darkslateblue">
				<Icon.TabBarItem
					title="news"
					iconName='home'
					selected={ this.state.selectedTab === 'news' }
					onPress={() => {
						this.setState({
							selectedTab: 'news',
						})
					}}
				>
					<Row type='news'/>
				</Icon.TabBarItem>
				<Icon.TabBarItem
					title="session"
					iconName='speaker-notes'
					selected={ this.state.selectedTab === 'session' }
					onPress={() => {
						this.setState({
							selectedTab: 'session',
						})
					}}
				>
					<Row type='session'/>
				</Icon.TabBarItem>
				<Icon.TabBarItem
					title="speaker"
					iconName='supervisor-account'
					selected={ this.state.selectedTab === 'speaker' }
					onPress={() => {
						this.setState({
							selectedTab: 'speaker',
						})
					}}
				>
					<Row type='speaker'/>
				</Icon.TabBarItem>
				<Icon.TabBarItem
					title="sponsor"
					iconName='redeem'
					selected={ this.state.selectedTab === 'sponsor' }
					onPress={() => {
						this.setState({
							selectedTab: 'sponsor',
						})
					}}
				>
					<Row type='sponsor'/>
				</Icon.TabBarItem>
			</TabBarIOS>
		)
	}
}

const styles = StyleSheet.create({
	navigator: {
		flex: 1
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
});

AppRegistry.registerComponent('WckApp', () => WckApp);
