import React, { PropTypes, Component } from 'react';
import {
	View,
	ListView,
	TextInput
} from 'react-native';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { TMDB_URL, TMDB_API_KEY } from '../../constants/api';
import * as moviesActions from './movies.actions';
import CardThree from './components/CardThree';
import styles from './styles/Search';
import { iconsMap } from '../../utils/AppIcons';

class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			currentPage: 1,
			searchResults: {
				results: []
			},
			query: null
		};

		this._viewMovie = this._viewMovie.bind(this);
		this._handleTextInput = this._handleTextInput.bind(this);
		this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
	}

	_handleTextInput(event) {
		const query = event.nativeEvent.text;
		this.setState({ query });
		if (!query) this.setState({ query: '' });

		setTimeout(() => {
			if (query.length) {
				this.props.actions.retrieveBooksSearchResults(this.state.query, 1)
				.then(() => {
					const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
					const dataSource = ds.cloneWithRows(this.props.searchResults);
					this.setState({
						dataSource,
						isLoading: false
					});
				});
			}
		}, 100);
	}

	// _retrieveNextPage() {
	// 	if (this.state.currentPage !== this.props.searchResults.total_pages) {
	// 		this.setState({
	// 			currentPage: this.state.currentPage + 1
	// 		});

	// 		let page;
	// 		if (this.state.currentPage === 1) {
	// 			page = 2;
	// 			this.setState({ currentPage: 2 });
	// 		} else {
	// 			page = this.state.currentPage + 1;
	// 		}

	// 		axios.get(`${TMDB_URL}/search/movie/?api_key=${TMDB_API_KEY}&query=${this.state.query}&page=${page}`)
	// 			.then(res => {
	// 				const data = this.state.searchResults.results;
	// 				const newData = res.data.results;

	// 				newData.map((item, index) => data.push(item));

	// 				this.setState({
	// 					dataSource: this.state.dataSource.cloneWithRows(this.state.searchResults.results)
	// 				});
	// 			}).catch(err => {
	// 				// console.log('next page', err); // eslint-disable-line
	// 			});
	// 	}
	// }

	_viewMovie(movieId) {
		this.props.navigator.push({
			screen: 'movieapp.Movie',
			passProps: {
				movieId
			},
			backButtonHidden: true,
			navigatorButtons: {
				rightButtons: [
					{
						id: 'close',
						icon: iconsMap['ios-arrow-round-down']
					}
				]
			}
		});
	}

	_onNavigatorEvent(event) {
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'close') {
				this.props.navigator.dismissModal();
			}
		}
	}

	_renderListView() {
		let listView;
		if (this.state.query) {
			listView = (
				<ListView
					enableEmptySections
					onEndReachedThreshold={1200}
					dataSource={this.state.dataSource}
					renderRow={rowData => <CardThree info={rowData} viewMovie={this._viewMovie} />}
					renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.seperator} />}
				/>
			);
		} else {
			listView = <View />;
		}

		return listView;
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.searchbox}>
					<View style={styles.searchboxBorder}>
						<TextInput
							style={styles.textInput}
							autoFocus
							placeholder="Kitap veya yazar adi"
							returnKeyType={'search'}
							value={this.state.query}
							onChange={this._handleTextInput}
							underlineColorAndroid="transparent"
						/>
					</View>
				</View>
				{ !this.state.isLoading && this._renderListView() }
			</View>

		);
	}
}

Search.propTypes = {
	actions: PropTypes.object.isRequired,
	searchResults: PropTypes.object.isRequired,
	navigator: PropTypes.object
};

Search.navigatorStyle = {
	statusBarColor: 'black',
	statusBarTextColorScheme: 'light',
	navBarBackgroundColor: '#0a0a0a',
	navBarTextColor: 'white',
	navBarButtonColor: 'white'
};

function mapStateToProps(state, ownProps) {
	return {
		searchResults: state.movies.searchResults
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(moviesActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
