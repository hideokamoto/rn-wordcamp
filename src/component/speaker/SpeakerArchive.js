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
var SpeakerExcerpt = require('./SpeakerExcerpt.js');

class SpeakerArchive extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			SpeakerArchive: new ListView.DataSource({
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

	renderSpeakerArchiveItem( item, sectionID, rowID ) {
		return (
			<SpeakerExcerpt item={item} />
		);
	}

	renderSpeakerArchiveView() {
		return (
			<ScrollView style={{ marginTop: 60}}>
				<ListView
					dataSource={this.state.SpeakerArchive}
					renderRow={this.renderSpeakerArchiveItem}
					/>
			</ScrollView>
		);
	}

	fetchCentralApi() {
		fetch( this.props.apiPath )
			.then( ( response ) => response.json())
			.then( ( responseData ) => {
				this.setState({
					SpeakerArchive: this.state.SpeakerArchive.cloneWithRows( responseData ),
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
			return this.renderSpeakerArchiveView();
		} else {
			return this.renderLoadingView();
		}
	}
}

module.exports = SpeakerArchive;
