import React, { Component, PropTypes } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles/Drawer';

class Drawer extends Component {
	constructor(props) {
		super(props);

		this._goToPopularBooks = this._goToPopularBooks.bind(this);
		this._goToPopularAuthors = this._goToPopularAuthors.bind(this);
		this._goToAuthorBooks = this._goToAuthorBooks.bind(this);
		this._openSearch = this._openSearch.bind(this);
	}

	_openSearch() {
		this._toggleDrawer();
		this.props.navigator.showModal({
			screen: 'movieapp.Search',
			title: 'Arama'
		});
	}

	_goToPopularBooks() {
		this._toggleDrawer();
		this.props.navigator.showModal({
			screen: 'movieapp.PopularBooks',
			title: 'Populer Kitaplar'
		});
	}

	_goToPopularAuthors() {
		this._toggleDrawer();
		this.props.navigator.showModal({
			screen: 'movieapp.PopularAuthors',
			title: 'Populer Yazarlar'
		});
	}

	_goToAuthorBooks(){
		this._toggleDrawer();
		this.props.navigator.showModal({
			screen: 'movieapp.AuthorBooks',
			title: 'Ilber'
		});
	}

	_toggleDrawer() {
		this.props.navigator.toggleDrawer({
			to: 'closed',
			side: 'left',
			animated: true
		});
	}

	render() {
		const iconSearch = (<Icon name="md-search" size={26} color="#9F9F9F" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />);
		const iconMovies = (<Icon name="md-book" size={26} color="#9F9F9F" style={[styles.drawerListIcon, { paddingLeft: 3 }]} />);
		const iconTV = (<Icon name="md-person" size={26} color="#9F9F9F" style={styles.drawerListIcon} />);
		const infoIcon =  (<Icon name="md-information-circle" size={26} color="#9F9F9F" style={styles.drawerListIcon} />);

		return (
			<LinearGradient colors={['rgba(0, 0, 0, 0.7)', 'rgba(0,0,0, 0.9)', 'rgba(0,0,0, 1)']} style={styles.linearGradient}>
				<View style={styles.container}>
					<View style={styles.drawerList}>
						<TouchableOpacity onPress={this._openSearch}>
							<View style={styles.drawerListItem}>
								{iconSearch}
								<Text style={styles.drawerListItemText}>
									Arama
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={this._goToPopularBooks}>
							<View style={styles.drawerListItem}>
								{iconMovies}
								<Text style={styles.drawerListItemText}>
									Populer Kitaplar
								</Text>
							</View>
						</TouchableOpacity>
						<View style={styles.drawerListItem}>
							{iconTV}
							<Text style={styles.drawerListItemText} onPress={this._goToPopularAuthors}>
								Populer Yazarlar
							</Text>
						</View>
						<View style={styles.drawerListItem}>
							{infoIcon}
							<Text style={styles.drawerListItemText}>
								Hakkinda
							</Text>
						</View>
					</View>
					<Text style={styles._version}>
						{/* 'v1.0.0' */}
					</Text>
				</View>
			</LinearGradient>
		);
	}
}

Drawer.propTypes = {
	navigator: PropTypes.object
};

export default Drawer;
