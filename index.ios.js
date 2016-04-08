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
				<Sample/>
			</View>
		)
	}
}

class Sample extends Component {
  render() {
    return (
      <View>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('WckApp', () => WckApp);
