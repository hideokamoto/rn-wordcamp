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

class NewsArchive extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			NewsArchive: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			}),
			isLoaded: false
		};
	}
	parseStartDate( postData ) {
		for( var j = 0; j < postData.length; j++){
			var post_meta = postData[j].post_meta;
			for (var i = 0; i < post_meta.length; i++) {
				if(post_meta[i].key === "Start Date (YYYY-mm-dd)"){
					postData[j]['startDate'] = post_meta[i].value;
				}
			}
		}
		return postData;
	}
	sortByStartDate(postData) {
		var postData = this.parseStartDate(postData);
		var key = "startDate";

		//ASC
		var num_a = 1;
		var num_b = -1;

		//DESC
		num_a = -1;
		num_b = 1;

		var data = postData.sort(function(a, b){
			var x = a[key];
			var y = b[key];
			if (x > y) return num_a;
			if (x < y) return num_b;
			return 0;
		});
		return data;
	}

	renderLoadingView() {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		)
	}

	renderNewsArchiveItem( item, sectionID, rowID ) {
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

	renderNewsArchiveView() {
		return (
			<ScrollView style={{ marginTop: 60}}>
				<ListView
					dataSource={this.state.NewsArchive}
					renderRow={this.renderNewsArchiveItem}
					/>
			</ScrollView>
		);
	}

	fetchCentralApi() {
		var api = "https://central.wordcamp.org/wp-json/posts?type=wordcamp&filter[posts_per_page]=30";
		fetch( api )
			.then( ( response ) => response.json())
			.then( ( responseData ) => {
				var data = this.sortByStartDate( responseData );
				var data = responseData;
				this.setState({
					NewsArchive: this.state.NewsArchive.cloneWithRows( data ),
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
			return this.renderNewsArchiveView();
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

module.exports = NewsArchive;
