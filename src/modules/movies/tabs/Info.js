import React, { PropTypes } from 'react';
import {
	Text,
	View
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';

import styles from './styles/Info';

const Info = ({ info }) => {
	return (
		<View style={styles.container}>
			<View style={styles.overview}>
				<Text style={styles.label}>
					Aciklama
				</Text>
				<Text style={styles.overviewText}>
					{info.results[0].introduction}
				</Text>
			</View>
			<View style={styles.labelRow}>
				<Text style={styles.label}>Yayinevi</Text>
				<Text style={styles.value}>{info.results[0].publisher_name}</Text>
			</View>
			<View style={styles.labelRow}>
				<Text style={styles.label}>Kategori</Text>
				<Text style={styles.value}>{info.results[0].category_name}</Text>
			</View>
			<View style={styles.labelRow}>
				<Text style={styles.label}>Yazar</Text>
				<Text style={styles.value}>{info.results[0].author_name}</Text>
			</View>
			<View style={styles.labelRow}>
				<Text style={styles.label}>Ziyaret Sayisi</Text>
				<Text style={styles.value}>{info.results[0].visited}</Text>
			</View>
		</View>
	);
};

Info.propTypes = {
	info: PropTypes.object.isRequired
};

export default Info;
