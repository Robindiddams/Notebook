import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import styles from './styles'
export default class Header extends Component {
  constructor(props) {
    super(props)
  }


  render() {
      return(
        <View style={{height:styles.headerHeight, backgroundColor: '#F5F5F5'}}>
          <View style={{flex:1,
              flexDirection: 'row',
              paddingTop:25,
              paddingLeft: 10,
              paddingRight: 10,
              justifyContent:'space-between',
              // borderColor: '#000000',
              // borderWidth: 0.5,
              borderBottomColor: '#bbb',
              borderBottomWidth: StyleSheet.hairlineWidth
            }}>
            {this.props.children}
          </View>
        </View>
      );
    }

}
