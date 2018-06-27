import React, { PropTypes } from 'react';
import {
	Image,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles/CardOne';
import { TMDB_IMG_URL } from '../../../constants/api';

const iconStar = (<Icon name="md-star" size={16} color="#F5B642" />);

const CardOne = ({ info, viewMovie }) => (
	<View>
		<Image source={{ uri: info.image_link }} />
		<LinearGradient colors={['rgba(0, 0, 0, 0.5)', 'rgba(0,0,0, 0.7)', 'rgba(0,0,0, 0.8)']} style={styles.linearGradient} />
		<View style={styles.cardContainer}>
			<Image source={{ uri: info.image_link  }} style={styles.cardImage} />
			<View style={styles.cardDetails}>
				<Text style={styles.cardTitle} numberOfLines={2}>
					{info.title}
				</Text>
				<View style={styles.cardGenre}>
					<Text style={styles.cardGenreItem}>{info.visited}</Text>
				</View>
				<View style={styles.cardNumbers}>
					<View style={styles.cardStar}>
						<Text style={styles.cardDescription}>YayinEvi: {info.publisher_name}</Text>
					</View>
					<Text style={styles.cardRunningHours} />
				</View>
				<Text style={styles.cardStarRatings} numberOfLines={3}>
					Yazar: {info.author_name}
				</Text>
				<TouchableOpacity activeOpacity={0.9} onPress={viewMovie.bind(this, info.ISBN)}>
					<View style={styles.viewButton}>
						<Text style={styles.viewButtonText}>Goruntule</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	</View>
);

CardOne.propTypes = {
	info: PropTypes.object.isRequired,
	viewMovie: PropTypes.func.isRequired
};

export default CardOne;
