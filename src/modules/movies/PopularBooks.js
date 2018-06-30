import React, { PropTypes, Component } from 'react';
import {
	Platform,
	View,
	ListView,
	RefreshControl
} from 'react-native';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { TMDB_URL, TMDB_API_KEY } from '../../constants/api';
import * as moviesActions from './movies.actions';
import CardThree from './components/CardThree';
import ProgressBar from '../_global/ProgressBar';
import styles from './styles/MoviesList';
import { iconsMap } from '../../utils/AppIcons';

class PopularBooks extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			isRefreshing: false,
			currentPage: 0,
			list: [],
			newData: []
		};

		this._viewMovie = this._viewMovie.bind(this);
		this._onRefresh = this._onRefresh.bind(this);
		this._retrieveNextPage = this._retrieveNextPage.bind(this);
		this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
	}

	componentWillMount() {
		this._retrieveMoviesList();
	}

	componentDidUpdate(prevProps) {
		if (this.props.popularBooks.results !== prevProps.popularBooks.results) {
			this.setState({
				newData: this.props.popularBooks.results
			})
		}
	}
	

	_retrieveMoviesList(isRefreshed) {
		this.props.actions.retrievePopularBooks(this.state.currentPage)
			.then(() => {
				const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
				const dataSource = ds.cloneWithRows(this.props.popularBooks.results);
				this.setState({
					list: this.props.popularBooks.results,
					dataSource,
					isLoading: false
				});
			});
		if (isRefreshed && this.setState({ isRefreshing: false }));
	}

	_retrieveNextPage() {
		this.setState({
			currentPage: this.state.currentPage + 1
		});

		let page;
		if (this.state.currentPage === 0) {
			page = 1;
			this.setState({ currentPage: 1 });
		} else {
			page = this.state.currentPage + 1;
		}

		axios.get(`https://kitappapi.herokuapp.com/popular/${page}`)
			.then((res) => {
				const data = this.props.popularBooks.results;
				const newData = res.data.results;
				
				newData.map((item,index)=> data.push(item));
				
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(this.state.list)
				});
			}).catch(err => {
				console.log('next page', err); // eslint-disable-line
		});
	}
	

	_viewMovie(movieId) {
		this.props.navigator.showModal({
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

	_onRefresh() {
		this.setState({ isRefreshing: true });
		this._retrieveMoviesList('isRefreshed');
	}

	_onNavigatorEvent(event) {
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'close') {
				this.props.navigator.dismissModal();
			}
		}
	}

	render() {
		return (
			this.state.isLoading ? <View style={styles.progressBar}><ProgressBar /></View> :
			<ListView
				style={styles.container}
				enableEmptySections
				onEndReached={this._retrieveNextPage}
				dataSource={this.state.dataSource}
				renderRow={rowData => <CardThree info={rowData} viewMovie={this._viewMovie} />}
				renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.seperator} />}
				renderFooter={() => <View style={{ height: 50 }}><ProgressBar /></View>}
				refreshControl={
					<RefreshControl
						refreshing={this.state.isRefreshing}
						onRefresh={this._onRefresh}
						colors={['#EA0000']}
						tintColor="white"
						title="loading..."
						titleColor="white"
						progressBackgroundColor="white"
					/>
				}
			/>
		);
	}
}

PopularBooks.propTypes = {
	actions: PropTypes.object.isRequired,
	popularBooks: PropTypes.object.isRequired,
	navigator: PropTypes.object
};

let navigatorStyle = {};

if (Platform.OS === 'ios') {
	navigatorStyle = {
		navBarTranslucent: true,
		drawUnderNavBar: true
	};
} else {
	navigatorStyle = {
		navBarBackgroundColor: '#0a0a0a'
	};
}

PopularBooks.navigatorStyle = {
	...navigatorStyle,
	statusBarColor: 'black',
	statusBarTextColorScheme: 'light',
	navBarTextColor: 'white',
	navBarButtonColor: 'white'
};

function mapStateToProps(state, ownProps) {
	return {
		popularBooks: state.movies.popularBooks
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(moviesActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PopularBooks);
