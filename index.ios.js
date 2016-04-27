import React, {
	AppRegistry,
	Component,
	StyleSheet,
	Text,
	View,
	TabBarIOS,
	NavigatorIOS
} from 'react-native';
import {
	Toolbar as MaterialToolbar,
} from 'react-native-material-design';

var Icon = require('react-native-vector-icons/MaterialIcons');
var NewsArchive = require('./src/component/news/NewsArchive.js');
var SessionArchive = require('./src/component/session/SessionArchive.js');
var SpeakerArchive = require('./src/component/speaker/SpeakerArchive.js');
var SponsorArchive = require('./src/component/sponsor/SponsorArchive.js');
var Access = require('./src/component/access/Access.js');
var api_endpoint = 'https://2015.kansai.wordcamp.org/';

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
		} else if ( 'session' == this.props.type ) {
			return SessionArchive;
		} else if ( 'speaker' == this.props.type ) {
			return SpeakerArchive;
		} else if ( 'sponsor' == this.props.type ) {
			return SponsorArchive;
		} else if ( 'access' == this.props.type ) {
			return Access;
		} else {
			return Test;
		}
	}

	_get_api_base() {
		return api_endpoint + 'wp-json/';
	}

	_get_api_path() {
		var endpoint = this._get_api_base();
		if ( 'news' == this.props.type ) {
			return endpoint + 'posts';
		} else if ( 'session' == this.props.type ) {
			return endpoint + 'posts?type=wcb_session&filter[posts_per_page]=100';
		} else if ( 'speaker' == this.props.type ) {
			return endpoint + 'posts?type=wcb_speaker&filter[posts_per_page]=100';
		} else if ( 'sponsor' == this.props.type ) {
			return endpoint + 'posts?type=wcb_sponsor&filter[posts_per_page]=100';
		}
	}

	_get_title() {
		var title = 'WordCamp US 2015';
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
						apiPath: this._get_api_path()
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
				<Icon.TabBarItem
					title="Access"
					iconName='map'
					selected={ this.state.selectedTab === 'access' }
					onPress={() => {
						this.setState({
							selectedTab: 'access',
						})
					}}
				>
					<Row type='access'/>
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
