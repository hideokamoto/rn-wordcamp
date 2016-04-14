import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
	TabBarIOS,
  ScrollView
} from 'react-native';
var Icon = require('react-native-vector-icons/MaterialIcons');
import {
	Toolbar as MaterialToolbar,
} from 'react-native-material-design';

var CampList = require('./src/component/CampList.js');

class NewsList extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		return (
			<View>
				<Text>News</Text>
			</View>
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

	_renderContent() {
		if ( 'news' === this.state.selectedTab ) {
			return (
				<NewsList />
			)
		}
		return (
			<View>
				<Text>aa</Text>
			</View>
		)
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
					{this._renderContent()}
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
					{this._renderContent()}
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
					{this._renderContent()}
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
					{this._renderContent()}
				</Icon.TabBarItem>
			</TabBarIOS>
		)
	}
}

class WckAppInner extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			icon: 'toys'
		};
	}
	render() {
		return (
			<ScrollView>
				<MaterialToolbar
					title='WordCamp Central'
					icon={this.state.icon}
					onIconPress={ () => {
						if ( 'toys' == this.state.icon ) {
							var icon = { icon: 'refresh' }
						} else {
							var icon = { icon: 'toys' }
						}
						this.setState(icon);
					}}
					rightIconStyle={{
						margin: 10
					}}/>
				<CampList/>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
});

AppRegistry.registerComponent('WckApp', () => WckApp);
