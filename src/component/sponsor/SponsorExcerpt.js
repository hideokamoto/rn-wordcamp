import React, {
	Component,
	StyleSheet,
	Text
} from 'react-native';
import {
	Card
} from 'react-native-material-design';
var HTMLWebView = require('react-native-htmlview');

class SponsorExcerpt extends React.Component {
	constructor( props ) {
		super( props );
	}

	_get_level( item ) {
		var track = '';
		if ( item.terms.wcb_sponsor_level ) {
			Object.keys( item.terms.wcb_sponsor_level ).forEach( ( key ) => {
				track += item.terms.wcb_sponsor_level[key].name;
			}, item.terms.wcb_sponsor_level );
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
		var level = this._get_level( item );
		return (
			<Card>
				<Card.Body>
					<Text style={styles.title}>{item.title}</Text>
					<Text style={styles.instructions}>{level}</Text>
				</Card.Body>
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
		textAlign: 'left',
		color: '#333333',
		marginBottom: 5,
	},
});

module.exports = SponsorExcerpt;
