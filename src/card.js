import React, { Component } from 'react';
import { ListView, TouchableOpacity, View, StyleSheet, TextInput, Dimensions, LayoutAnimation } from 'react-native';
import Notebook from './notebook';
import AutoExpandingTextInput from 'react-native-auto-expanding-textinput';
import Br from './break';

export default class Note extends Component {
  constructor(props) {
    super(props)

    this.state = {
      titleText: 'new note',
      bodyText: ''
    }
  }

  componentWillMount() {
    LayoutAnimation.spring();
  }


  _onChangeHeight(before, after) {
    console.log('before: ' + before + ' after: ' + after);
  }


  render() {
      return(
        <View style={{
          backgroundColor: 'transparent',
          paddingTop: 4,
          paddingBottom: 8,

          padding:5,
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowOpacity: 0.3
        }}>
          <View style={{

            flex: 1,
            padding: 10,
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor:'#ffffff',
            // flexDirection: 'column',
            // justifyContent:'center',
            alignItems:'center'
          }}>
            {this.props.children}
          </View>
        </View>
      );
    }

}


const {height: screenHeight} = Dimensions.get('window')
const {width: screenWidth} = Dimensions.get('window')
