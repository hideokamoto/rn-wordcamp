import React, {
	Component,
	StyleSheet,
	Text,
	View,
	ListView,
	ScrollView
} from 'react-native';
import {
	Toolbar as MaterialToolbar,
	Card
} from 'react-native-material-design';

class CampList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			campList: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			}),
			isLoaded: false
		};
	}
	renderLoadingView() {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		)
	}

	renderCampListItem( item, sectionID, rowID ) {
		return (
			<Card>
				<Text style={styles.welcome}>
					{item.title}
				</Text>
				<Text style={styles.instructions}>
					To get started, edit index.ios.js
				</Text>
				<Text style={styles.instructions}>
					Press Cmd+R to reload,{'\n'}
					Cmd+D or shake for dev menu
				</Text>
			</Card>
		);
	}

	renderCampListView() {
		return (
			<View style={{ marginTop: 60}}>
				<ListView
					dataSource={this.state.campList}
					renderRow={this.renderCampListItem}
					/>
			</View>
		);
	}

	fetchCentralApi() {
		var api = "https://central.wordcamp.org/wp-json/posts?type=wordcamp&filter[posts_per_page]=30";
		fetch( api )
			.then( ( response ) => response.json())
			.then( ( responseData ) => {
				this.setState({
					campList: this.state.campList.cloneWithRows( responseData ),
					isLoaded: true,
				});
			})
			.done();
	}

	componentDidMount() {
		this.fetchCentralApi();
	}

	render() {
		if ( this.state.isLoaded ) {
			return this.renderCampListView();
		} else {
			return this.renderLoadingView();
		}
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

module.exports = CampList;
