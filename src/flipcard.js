import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Note from './card';
import styles from './styles';

export default class FlipCard extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state ={
      cardText:this.props.front,
    }

  }

  componentWillReceiveProps(props) {
    this.setState({cardText:props.front});
  }


  render() {
      return(
        <Note style={{height: 300, width: 300}}>
          <View style={{
            flex:1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={styles.bigTitle}>{this.state.cardText}</Text>
          </View>
        </Note>
      );
    }

}
