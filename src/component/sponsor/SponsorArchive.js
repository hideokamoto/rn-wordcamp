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
var SponsorExcerpt = require('./SponsorExcerpt.js');

class SponsorArchive extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			SponsorArchive: new ListView.DataSource({
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

	renderSponsorArchiveItem( item, sectionID, rowID ) {
		return (
			<SponsorExcerpt item={item} />
		);
	}

	renderSponsorArchiveView() {
		return (
			<ScrollView style={{ marginTop: 60}}>
				<ListView
					dataSource={this.state.SponsorArchive}
					renderRow={this.renderSponsorArchiveItem}
					/>
			</ScrollView>
		);
	}

	fetchCentralApi() {
		fetch( this.props.apiPath )
			.then( ( response ) => response.json())
			.then( ( responseData ) => {
				console.log(responseData);
				this.setState({
					SponsorArchive: this.state.SponsorArchive.cloneWithRows( responseData ),
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
			return this.renderSponsorArchiveView();
		} else {
			return this.renderLoadingView();
		}
	}
}

module.exports = SponsorArchive;
