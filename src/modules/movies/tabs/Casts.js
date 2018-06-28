import React, { Component, PropTypes } from 'react';
import {
	Text,
	View,
	Image,
	ListView
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';

import styles from './styles/Info';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as moviesActions from '../movies.actions';

import ProgressBar from '../../_global/ProgressBar';

import { Navigation } from 'react-native-navigation';

import CardThree from '../components/CardThree';

class Casts extends Component {
  constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			isRefreshing: false
		};



	}

	_onNavigatorEvent(event) {
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'close') {
				this.props.navigator.dismissModal();
			}
		}
	}

render(){
		const {authorBooks, getTabHeight} = this.props;
		let computedHeight = (163) * authorBooks.length; 
		computedHeight += 447 + 40;

    return (
			
			<View style={styles.container} onLayout={getTabHeight.bind(this,'AUTHOR', computedHeight)}>
			{console.log(computedHeight, authorBooks.length)}
			{ 
				authorBooks.map((item,index)=>(
					<CardThree key={item.ISBN} info={item} viewMovie={this.props.viewMovie} />
				))
			}

			
			</View>

		
    );
  };
};

Casts.propTypes = {
	actions: PropTypes.object.isRequired,
	navigator: PropTypes.object
};


function mapStateToProps(state, ownProps) {
	return {
		authorBooks: state.movies.authorBooks
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(moviesActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Casts);
