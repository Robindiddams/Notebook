import React, { Component } from 'react';
import { ListView, TouchableOpacity, View, StyleSheet } from 'react-native';
import Notebook from './notebook';

export default class Br extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View style={{
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E'}} />
    );
  }
}
