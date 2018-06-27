import React, { PropTypes } from 'react';
import {
	Image,
	Text,
	TouchableOpacity,
	View
} from 'react-native';

import styles from './styles/CardTwo';

const CardTwo = ({ info, viewMovie }) => (
	<TouchableOpacity activeOpacity={0.8} onPress={viewMovie.bind(this, info.ISBN)}>
		<View style={styles.cardContainer}>
			<Image source={{ uri: info.image_link }} style={styles.cardImage} />
			<View style={styles.cardTitleContainer}>
				<Text style={styles.cardTitle} numberOfLines={2}>
					{info.title}
				</Text>
			</View>
		</View>
	</TouchableOpacity>
);

CardTwo.propTypes = {
	info: PropTypes.object.isRequired,
	viewMovie: PropTypes.func.isRequired
};

export default CardTwo;
