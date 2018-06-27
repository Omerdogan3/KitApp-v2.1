import React, { Component, PropTypes } from 'react';
import {
	Text,
	View
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';

import styles from './styles/Info';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as moviesActions from '../movies.actions';

import ProgressBar from '../../_global/ProgressBar';

class PricesTab extends Component {
  constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			isRefreshing: false
		};
  }

render(){
    const {prices, getTabHeight} = this.props;

    return (
      <View style={styles.container} onLayout={getTabHeight.bind(this,'PRICE', 700)}>
        <View style={styles.overview}>
          <Text style={styles.label}>
            {prices.title}
          </Text>
          
          {Object.values(prices) === 0 ?
              <Text style={styles.overviewText} >Yukleniyor </Text> 
              : 
              <View>
                {prices.nobelkitap === "" || 0 ? null : <Text style={styles.label}>NobelKitap: {prices.nobelkitap}</Text>}
                {prices.atlaskitap === "" || 0 ? null : <Text style={styles.label}>AtlasKitap: {prices.atlaskitap}</Text> }
                {prices.kitapkoala === "" || 0 ? null : <Text style={styles.label}>Kitapkoala: {prices.kitapkoala}</Text> }
                {prices.hepsiBuradaPrice === "" || 0 ? null : <Text style={styles.label}>HepsiBurada: {prices.hepsiBuradaPrice}</Text> }
                {prices.babilPrice === "" || 0 ? null : <Text style={styles.label}>Babil: {prices.babilPrice}</Text> }
                {prices.pandoraPrice === "" || 0 ? null : <Text style={styles.label}>Pandora: {prices.pandoraPrice}</Text> }
                {prices.idefixPrice === "" || 0 ? null : <Text style={styles.label}>Idefix: {prices.idefixPrice}</Text> }
                {prices.drPrice === "" || 0 ? null : <Text style={styles.label}>D&R: {prices.drPrice}</Text> }
              </View> 
          }

        </View>


        {/*
					<View style={styles.container} onLayout={getTabHeight.bind(this,'PRICE', 700)}>

				
				{
					authorBooks.map((item,index)=>(
						<View key={index} style={styles.castContainer}>
							<Image source={{ uri: item.image_link}} style={styles.castImage} />
							<View style={styles.characterContainer}>
								<Text style={styles.label}>{item.title}</Text>
							</View>
						</View>
          ))
        }
        </View>
			*/}
      </View>
    );
  };
};


function mapStateToProps(state, ownProps) {
	return {
		prices: state.movies.prices
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(moviesActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PricesTab);
