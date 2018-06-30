import React, { Component, PropTypes } from 'react';
import {
	Text,
  View,
  TouchableOpacity,
  WebView
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';

import styles from './styles/PricesTab';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as moviesActions from '../movies.actions';

import ProgressBar from '../../_global/ProgressBar';

class PricesTab extends Component {
  constructor(props) {
		super(props);

		this.state = {
      isLoading: true
  	};
  }

render(){
    const {prices, getTabHeight} = this.props;

    return (
      <View style={styles.container} onLayout={getTabHeight.bind(this,'PRICE', 920)}>
        <View style={styles.overview}>
          {this.props.isLoading === true ?
              <Text style={styles.overviewText} >Yukleniyor </Text> 
              : 
              <View>

                <Text style={styles.title}>
                  {prices[0].title}
                </Text>

                {
                  prices[0].nobelkitap === "" || 0 ? null :
                  <View style={styles.card}>
                    <View style={styles.labelRow} >
                      <Text style={styles.label}>NobelKitap: {prices[0].nobelkitap}</Text>
                        <TouchableOpacity activeOpacity={0.6} onPress={() =>
                          <WebView
                          source={{ uri: prices[1].nobelLink}}
                          style={{ marginTop: 0 }}
                          scalesPageToFit
                          javaScriptEnabled
                          domStorageEnabled
                          startInLoadingState
                          mixedContentMode="always"
                        
                        />
                        }>

                          <View style={styles.viewButton}>
                            <Text style={styles.viewButtonText}>Goruntule</Text>
                          </View>
                        </TouchableOpacity>
                    </View>
                  </View>
                }
                
                {
                  prices[0].atlaskitap === "" || 0 ? null : 
                  <View style={styles.card}>
                    <View style={styles.labelRow}>
                      <Text style={styles.label}>AtlasKitap: {prices[0].atlaskitap}</Text> 
                        <TouchableOpacity activeOpacity={0.6} onPress={() => console.log(prices[1].atlasLink)}>
                          <View style={styles.viewButton}>
                            <Text style={styles.viewButtonText}>Goruntule</Text>
                          </View>
                        </TouchableOpacity>
                    </View>
                  </View>
                }
                {
                  prices[0].kitapkoala === "" || 0 ? null : 
                  <View style={styles.card}>
                    <View style={styles.labelRow}>
                      <Text style={styles.label}>Kitapkoala: {prices[0].kitapkoala}</Text> 
                        <TouchableOpacity activeOpacity={0.6} onPress={() => console.log(prices[1].koalaLink)}>
                          <View style={styles.viewButton}>
                            <Text style={styles.viewButtonText}>Goruntule</Text>
                          </View>
                        </TouchableOpacity>
                    </View>
                  </View>
                }
                {
                  prices[0].hepsiBuradaPrice === "" || 0 ? null :
                  <View style={styles.card}>
                    <View style={styles.labelRow}>
                      <Text style={styles.label}>HepsiBurada: {prices[0].hepsiBuradaPrice}</Text> 
                        <TouchableOpacity activeOpacity={0.6} onPress={() => console.log(prices[1].hepsiBuradaLink)}>
                          <View style={styles.viewButton}>
                            <Text style={styles.viewButtonText}>Goruntule</Text>
                          </View>
                        </TouchableOpacity>
                    </View>
                  </View>
                }
                {
                  prices[0].babilPrice === "" || 0 ? null : 
                  <View style={styles.card}>
                    <View style={styles.labelRow}>
                      <Text style={styles.label}>Babil: {prices[0].babilPrice}</Text> 
                        <TouchableOpacity activeOpacity={0.6} onPress={() => console.log(prices[1].babilLink)}>
                          <View style={styles.viewButton}>
                            <Text style={styles.viewButtonText}>Goruntule</Text>
                          </View>
                        </TouchableOpacity>
                    </View>
                  </View>
                }
                {
                  prices[0].pandoraPrice === "" || 0 ? null : 
                  <View style={styles.card}>
                    <View style={styles.labelRow}>
                      <Text style={styles.label}>Pandora: {prices[0].pandoraPrice}</Text>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => console.log(prices[1].pandoraLink)}>
                          <View style={styles.viewButton}>
                            <Text style={styles.viewButtonText}>Goruntule</Text>
                          </View>
                        </TouchableOpacity>
                    </View>
                  </View> 
                }
                {
                  prices[0].idefixPrice === "" || 0 ? null : 
                  <View style={styles.card}>
                    <View style={styles.labelRow}>
                      <Text style={styles.label}>Idefix: {prices[0].idefixPrice}</Text> 
                        <TouchableOpacity activeOpacity={0.6} onPress={() => console.log(prices[1].idefixLink)}>
                          <View style={styles.viewButton}>
                            <Text style={styles.viewButtonText}>Goruntule</Text>
                          </View>
                        </TouchableOpacity>
                    </View>
                  </View> 
                }
                {
                  prices[0].drPrice === "" || 0 ? null : 
                  <View style={styles.card}>
                    <View style={styles.labelRow}>
                      <Text style={styles.label}>D&R: {prices[0].drPrice}</Text> 
                        <TouchableOpacity activeOpacity={0.6} onPress={() => console.log(prices[1].drLink)}>
                          <View style={styles.viewButton}>
                            <Text style={styles.viewButtonText}>Goruntule</Text>
                          </View>
                        </TouchableOpacity>
                    </View>
                  </View> 
                }
              </View> 
          }

        </View>

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
