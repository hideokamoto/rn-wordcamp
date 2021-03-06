import React, {
	Component,
	StyleSheet,
	Text
} from 'react-native';
import {
	Card
} from 'react-native-material-design';
var HTMLWebView = require('react-native-htmlview');

class SessionExcerpt extends React.Component {
	constructor( props ) {
		super( props );
	}

	_get_track( item ) {
		var tracks = [];
		if ( item.terms.wcb_track ) {
			Object.keys( item.terms.wcb_track ).forEach( ( key ) => {
				tracks[key] = <Text key={key} style={styles.instructions}>{item.terms.wcb_track[key].name}</Text>;
			}, item.terms.wcb_track );
		}
		return tracks;
	}

	_onPressed( item ) {
		this.props.navigator.push({
			title: item.title,
			component: NewsContent,
			passProps: { item: item }
		})
	}

	render() {
		var item = this.props.item;
		var track = this._get_track( item );
		var time = Number( this.props.item._wcpt_session_time + '000' );
		time = new Date(time).toLocaleString();
		return (
			<Card>
				<Card.Body>
					<Text style={styles.title}>{item.title}</Text>
				</Card.Body>
				<Text style={styles.instructions}>{time}</Text>
				{track}
				<HTMLWebView
					value={item.content}
					onLinkPress={(url) => console.log('clicked link: ', url)}
				/>
			</Card>
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
	title: {
		fontSize: 20,
		textAlign: 'left',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});

module.exports = SessionExcerpt;
