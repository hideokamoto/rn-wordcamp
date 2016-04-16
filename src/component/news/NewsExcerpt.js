import React, {
	Component,
	StyleSheet,
	Text
} from 'react-native';
import {
	Card
} from 'react-native-material-design';


class NewsExcerpt extends React.Component {
	constructor( props ) {
		super( props );
	}

	_get_category( item ) {
		var category = '';
		if ( item.terms.category ) {
			Object.keys( item.terms.category ).forEach( ( key ) => {
				category += item.terms.category[key].name;
			}, item.terms.category );
		}
		return category;
	}

	render() {
		var item = this.props.item;
		var category = this._get_category( item );
		return (
			<Card>
				<Card.Body>
					<Text style={styles.title}>{item.title}</Text>
				</Card.Body>
				<Text style={styles.instructions}>{category}</Text>
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

module.exports = NewsExcerpt;
