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

	_get_category( item ) {
		var track = '';
		if ( item.terms.wcb_track ) {
			Object.keys( item.terms.wcb_track ).forEach( ( key ) => {
				track += item.terms.wcb_track[key].name;
			}, item.terms.wcb_track );
		}
		return track;
	}

	_get_track( item ) {
		var category = '';
		if ( item.terms.category ) {
			Object.keys( item.terms.category ).forEach( ( key ) => {
				category += item.terms.category[key].name;
			}, item.terms.category );
		}
		return category;
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
		var category = this._get_category( item );
		var track = this._get_track( item );
		var time = Number( this.props.item._wcpt_session_time + '000' );
		time = new Date(time).toLocaleString();
		return (
			<Card>
				<Card.Body>
					<Text style={styles.title}>{item.title}</Text>
				</Card.Body>
				<Text style={styles.instructions}>{time}</Text>
				<Text style={styles.instructions}>{category}</Text>
				<Text style={styles.instructions}>{track}</Text>
				<HTMLWebView
					value={item.excerpt}
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
