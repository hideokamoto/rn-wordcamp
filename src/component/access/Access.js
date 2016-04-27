import React, {
	Component,
	StyleSheet,
	Text,
	Image,
	View,
	ScrollView
} from 'react-native';
import {
	Card
} from 'react-native-material-design';


class Access extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		return (
			<ScrollView style={{ marginTop: 0}}>
				<Card>
					<Card.Body>
						<Text style={styles.title}>Osaka University Toyonaka Campus</Text>
						<Image
							style={styles.map}
							source={{uri: 'http://www.osaka-u.ac.jp/en/access/files/toyonaka.png'}} />
						<Text style={styles.title}>Train</Text>
						<Text style={styles.description}>15min~25min east on foot from Ishibashi, Hankyu Takarazuka Line.</Text>
						<Text style={styles.title}>Monorail</Text>
						<Text style={styles.description}>10min~15min west on foot from Shibahara.</Text>
						<Text style={styles.title}>From Shin-Osaka Station</Text>
						<Text style={styles.description}>Subway Midosuji Line to Senri-Chuo, → Monorail, exit at Shibahara. (1 hr.)</Text>
						<Text style={styles.title}>From Osaka Airport</Text>
						<Text style={styles.description}>Monorail to Shibahara. (30min)</Text>
					</Card.Body>
				</Card>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	map: {
		height: 570,
		margin: 0,
	},
	title: {
		fontSize: 20,
		textAlign: 'left',
		margin: 10,
	},
	description: {
		marginLeft: 10,
		fontSize: 12,
	}
});

module.exports = Access;
