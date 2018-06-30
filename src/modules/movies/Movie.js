import React, { Component, PropTypes } from 'react';
import {
	Image,
	Linking,
	RefreshControl,
	ScrollView,
	Text,
	ToastAndroid,
	View,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Swiper from 'react-native-swiper';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as moviesActions from './movies.actions';
import Casts from './tabs/Casts';
import DefaultTabBar from '../_global/scrollableTabView/DefaultTabBar';
import Info from './tabs/Info';
import PricesTab from './tabs/PricesTab';
import ProgressBar from '../_global/ProgressBar';
import styles from './styles/Movie';
import { TMDB_IMG_URL, YOUTUBE_API_KEY, YOUTUBE_URL } from '../../constants/api';

class Movie extends Component {
	constructor(props) {
		super(props);

		this.state = {
			castsTabHeight: null,
			heightAnim: null,
			priceTabHeight: null,
			isLoadingPrices: true,
			isLoadingAuthor: true,
			authorTabHeight: null,
			infoTabHeight: null,
			isLoading: true,
			isRefreshing: false,
			trailersTabHeight: null,
			tab: 0,
			numberOfBooks: 0 
		};

		this._getTabHeight = this._getTabHeight.bind(this);
		this._onChangeTab = this._onChangeTab.bind(this);
		this._onRefresh = this._onRefresh.bind(this);
		this._viewMovie = this._viewMovie.bind(this);
		this._onScroll = this._onScroll.bind(this);
		this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
	}

	componentWillMount() {
		this._retrieveDetails();
		this._retrievePrices();
		this._retrieveAuthorBooks();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.details) this.setState({ isLoading: false });
	}

	componentDidUpdate(prevProps) {
		if (this.props.prices !== prevProps.prices) { 
      this.setState({ isLoadingPrices: false });
    }else if(this.props.authorBooks !==prevProps.authorBooks){
			this.setState({isLoadingAuthor: false})
		}
	}

	_retrieveDetails(isRefreshed) {
		this.props.actions.retrieveBookDetails(this.props.movieId);
		this._retrievePrices();
		if (isRefreshed && this.setState({ isRefreshing: false }));
	}

	_retrievePrices(){
		this.props.actions.retrieveBookPrices(this.props.movieId);
	}

	_retrieveAuthorBooks(){
		this.props.actions.retrieveAuthorBooks(this.props.movieId);
	}

	_onRefresh() {
		this.setState({ isRefreshing: true });
		this._retrieveDetails('isRefreshed');
	}

	_onScroll(event) {
		const contentOffsetY = event.nativeEvent.contentOffset.y.toFixed();
		if (contentOffsetY > 150) {
			this._toggleNavbar('hidden');
		} else {
			this._toggleNavbar('shown');
		}
	}

	_toggleNavbar(status) {
		this.props.navigator.toggleNavBar({
			to: status,
			animated: true
		});
	}

	_onChangeTab({ i, ref }) {
		this.setState({ tab: i });
	}

	_viewMovie(movieId) {
		this.props.navigator.push({
			screen: 'movieapp.Movie',
			passProps: {
				movieId
			}
		});
	}


	_getTabHeight(tabName, height) {
		if(tabName === 'PRICE') this.setState({priceTabHeight: height})
		if(tabName === 'AUTHOR') this.setState({authorTabHeight: height})
	}


	_onNavigatorEvent(event) {
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'close') {
				this.props.navigator.dismissModal();
			}
		}
	}

	render() {
		const iconStar = <Icon name="md-star" size={16} color="#F5B642" />;
		const { details,authorBooks } = this.props;
		const info = details;
		const authorBook = authorBooks;

		let height;
		if (this.state.tab === 0) height = this.state.infoTabHeight;
		if (this.state.tab === 1) height = this.state.priceTabHeight;
		if (this.state.tab === 2) height = this.state.authorTabHeight;

		return (
			this.state.isLoading ? <View style={styles.progressBar}><ProgressBar/></View> :

			<ScrollView
					style={styles.container}
					onScroll={this._onScroll.bind(this)}
					scrollEventThrottle={100}
					onContentSizeChange={this._onContentSizeChange}
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
					}>
				<View style={{ height }}>
					<Swiper
						style={styles.swiper}
						autoplay
						autoplayTimeout={4}
						showsPagination={false}
						height={248}
						loop
						index={5}>
						{
								<View>
									<Image source={{ uri: info.results[0].image_link }} style={styles.imageBackdrop} />
									<LinearGradient start={{x: 0.0, y: 0}} end={{x: 0, y: 0.8}} colors={['rgba(0, 0, 0, 0.2)', 'rgba(0,0,0, 0.5)', 'rgba(0,0,0, 1)']} style={styles.linearGradient} />
								</View>
						}
					</Swiper>
					
					<View style={styles.cardContainer}>
						<Image source={{ uri: info.results[0].image_link }} style={styles.cardImage} />
						<View style={styles.cardDetails}>
							<Text style={styles.cardTitle}>{info.results[0].title}</Text>
							<Text style={styles.cardTagline}>{info.results[0].author_name}</Text>
							<View style={styles.cardGenre}>
								{
										<Text style={styles.cardGenreItem}>{info.results[0].category_name}</Text>
								}
							</View>
							<View style={styles.cardNumbers}>
								<View style={styles.cardStar}>
									{iconStar}
									<Text style={styles.cardStarRatings}>{info.results[0].stars}</Text>
								</View>
								<Text style={styles.cardRunningHours} />
							</View>
						</View>
					</View>

					<View style={styles.contentContainer}>
						<ScrollableTabView
							onChangeTab={this._onChangeTab}
							renderTabBar={() => (
								<DefaultTabBar
									textStyle={styles.textStyle}
									underlineStyle={styles.underlineStyle}
									style={styles.tabBar}
								/>
							)}>

							<Info tabLabel="BILGI" info={info} />
							<PricesTab tabLabel="FIYAT" isLoading={this.state.isLoadingPrices} getTabHeight={this._getTabHeight}/>
							<Casts tabLabel={"YAZAR "+ authorBooks.length} isLoading={this.state.isLoadingAuthor} viewMovie={this._viewMovie} getTabHeight={this._getTabHeight}/>
						</ScrollableTabView>
					</View>
				</View>
			</ScrollView>
		);
	}
}

Movie.navigatorStyle = {
	navBarTransparent: true,
	drawUnderNavBar: true,
	navBarTranslucent: true,
	statusBarHidden: true,
	navBarTextColor: 'white',
	navBarButtonColor: 'white'
};

Movie.propTypes = {
	actions: PropTypes.object.isRequired,
	details: PropTypes.object.isRequired,
	navigator: PropTypes.object,
	movieId: PropTypes.number.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		details: state.movies.details,
		authorBooks: state.movies.authorBooks,
		prices: state.movies.prices
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(moviesActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
