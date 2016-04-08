import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
	Toolbar as MaterialToolbar,
} from 'react-native-material-design';

var CampList = require('./src/component/CampList.js');

class WckApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			icon: 'toys'
	  };
    }
	render() {
		return (
			<View style={styles.container}>
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
			</View>
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
