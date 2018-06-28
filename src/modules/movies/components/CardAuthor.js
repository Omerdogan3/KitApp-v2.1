/* eslint-disable new-cap */
import React, { PropTypes, Component } from 'react';
import {
	Image,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import { TMDB_IMG_URL } from '../../../constants/api';
import styles from './styles/CardAuthor';

const iconStar = <Icon name="md-star" size={16} color="#F5B642" />;

class CardAuthor extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { info, viewMovie } = this.props;
		return (
			<View style={styles.cardContainer}>
				<TouchableOpacity activeOpacity={0.9} onPress={viewMovie.bind(this, info.ISBN)}>
					<View style={styles.card}>
						<View style={styles.cardDetails}>
							<View style={styles.cardGenre}>
								<Text style={styles.cardTitle}>{info.author_name}</Text>
							</View>
							<Text style={styles.cardDescription} numberOfLines={3}>
								Toplam Ziyaret: {info.visited}
							</Text>
							<Text style={styles.cardDescription} numberOfLines={3}>
								Kitap Sayisi: {info.numberOfBooks}
							</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

CardAuthor.propTypes = {
	info: PropTypes.object.isRequired,
	viewMovie: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		moviesGenres: state.movies.genres
	};
}

export default connect(mapStateToProps, null)(CardAuthor);
