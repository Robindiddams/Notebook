import React, { Component } from 'react';
import { ListView, TouchableOpacity, View, StyleSheet, TextInput, Dimensions, LayoutAnimation } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body, Header, Title, Button, Left, Right, Icon,  } from 'native-base';
import Notebook from './notebook';
import AutoExpandingTextInput from 'react-native-auto-expanding-textinput';
import Br from './break';

export default class NewNote extends Component {
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
          flex:1,
          position:'absolute',
          // height: screenHeight,
          justifyContent: 'center',
          top:0,
          left:0,
          // backgroundColor: 'rgba(0,0,0,0.5)',
          backgroundColor: 'rgba(0,0,0,0)',
          width: screenWidth,
          borderWidth: 0,
          zIndex:1,
          padding: 25,
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowOpacity: 1.0
        }}>
          <View style={{paddingLeft: 10, paddingRight: 10, backgroundColor:'#ffffff'}}>
            <TouchableOpacity transparent onPress={() => {this.props.closeNewNote()}}>
              <Icon name='ios-close-outline' />
            </TouchableOpacity>
            <AutoExpandingTextInput
            style={{
              fontSize: 20
            }}
            placeholder="My Note"
            enablesReturnKeyAutomatically={true}
            returnKeyType="done"
            minHeight={40}
            maxHeight={screenHeight - 25}
            onChangeText={(titleText) => this.setState({titleText})}
            onChangeHeight={this._onChangeHeight}/>
            <Br/>
            <AutoExpandingTextInput
            style={{
              fontSize: 20
            }}
            onChangeText={(bodyText) => this.setState({bodyText})}
            placeholder="height increases with content"
            enablesReturnKeyAutomatically={true}
            returnKeyType="done"
            minHeight={40}
            maxHeight={screenHeight - 25}
            onChangeHeight={this._onChangeHeight}/>
          </View>

        </View>
      );
    }

}


const {height: screenHeight} = Dimensions.get('window')
const {width: screenWidth} = Dimensions.get('window')
