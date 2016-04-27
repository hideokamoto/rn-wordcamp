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
var SessionExcerpt = require('./SessionExcerpt.js');

class SessionArchive extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			SessionArchive: new ListView.DataSource({
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

	renderSessionArchiveItem( item, sectionID, rowID ) {
		return (
			<SessionExcerpt item={item} />
		);
	}

	renderSessionArchiveView() {
		return (
			<ScrollView style={{ marginTop: 60}}>
				<ListView
					dataSource={this.state.SessionArchive}
					renderRow={this.renderSessionArchiveItem}
					/>
			</ScrollView>
		);
	}

	fetchCentralApi() {
		fetch( this.props.apiPath )
			.then( ( response ) => response.json())
			.then( ( responseData ) => {
				responseData = this.parseApi( responseData );
				this.setState({
					SessionArchive: this.state.SessionArchive.cloneWithRows( responseData ),
					isLoaded: true,
				});
			})
			.done();
	}

	parseApi( responseData ) {
		this.sortBySessionTime( responseData );
		return responseData;
	}

	parseSessinoTime( postData ) {
		for( var j = 0; j < postData.length; j++){
			var post_meta = postData[j].post_meta;
			for (var i = 0; i < post_meta.length; i++) {
				var key = post_meta[i].key;
				postData[j][key] = post_meta[i].value;
			}
		}
		return postData;
	}

	sortBySessionTime( responseData ) {
		var postData = this.parseSessinoTime( responseData );
		var key = "_wcpt_session_time";

		//ASC
		var num_a = 1;
		var num_b = -1;

		var data = postData.sort(function(a, b){
			var x = a[key];
			var y = b[key];
			if (x > y) return num_a;
			if (x < y) return num_b;
			return 0;
		});
		return data;;
	}

	componentDidMount() {
		this.fetchCentralApi();
	}

	render() {
		if ( this.state.isLoaded ) {
			return this.renderSessionArchiveView();
		} else {
			return this.renderLoadingView();
		}
	}
}

module.exports = SessionArchive;
