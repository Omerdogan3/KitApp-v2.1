import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	cardContainer: {
		flex: 1,
		marginHorizontal: 16
	},
	card: {
		backgroundColor: '#2e2e2e',
		borderRadius: 3,
		minHeight: 100,
		flexDirection: 'row',
		paddingRight: 16,
		overflow: 'hidden'
	},
	cardDetails: {
		paddingLeft: 10,
		flex: 1
	},
	cardImage: {
		height: 163,
		width: 120,
		borderTopLeftRadius: 3,
		borderBottomLeftRadius: 3
	},
	cardTitle: {
		color: 'white',
		fontSize: 22,
		fontWeight: '500',
		paddingTop: 10,
	},
	cardGenre: {
		flexDirection: 'row'
	},
	cardGenreItem: {
		fontSize: 11,
		marginRight: 5
	},
	cardDescription: {
		color: 'white',
		fontSize: 14,
		marginTop: 5
	},
	cardNumbers: {
		flexDirection: 'row',
		marginTop: 5
	},
	cardStar: {
		flexDirection: 'row'
	},
	cardStarRatings: {
		marginLeft: 5,
		fontSize: 12
	},
	cardRunningHours: {
		marginLeft: 5,
		fontSize: 12
	}
});

export default styles;