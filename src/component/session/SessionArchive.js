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
			<View>
				<Text>Loading...</Text>
			</View>
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
				console.log(responseData);
				this.setState({
					SessionArchive: this.state.SessionArchive.cloneWithRows( responseData ),
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
			return this.renderSessionArchiveView();
		} else {
			return this.renderLoadingView();
		}
	}
}

module.exports = SessionArchive;
