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
var NewsExcerpt = require('./NewsExcerpt.js');

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

	renderLoadingView() {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		)
	}

	renderNewsArchiveItem( item, sectionID, rowID ) {
		return (
			<NewsExcerpt item={item} />
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
		fetch( this.props.apiPath )
			.then( ( response ) => response.json())
			.then( ( responseData ) => {
				this.setState({
					NewsArchive: this.state.NewsArchive.cloneWithRows( responseData ),
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

module.exports = NewsArchive;
