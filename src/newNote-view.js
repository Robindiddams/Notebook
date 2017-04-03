import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Icon } from 'native-base';
import Header from './header';
import styles from './styles';
import Br from './break.js'
import AutoExpandingTextInput from 'react-native-auto-expanding-textinput';

export default class NewNoteView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      titleText: '',
      bodyText: ''
    }
  }

  finishNote() {
    if (this.state.titleText != '' || this.state.bodyText != '') {
      this.props.submit(this.state.titleText, this.state.bodyText);
      this.setState({titleText: '', bodyText: ''});
      console.log('ello');
    }
    this.props.close();
  }


  render() {
      return(
        <View>
          <Header>
            <TouchableOpacity onPress={this.finishNote.bind(this)}>
              <Icon name='arrow-back' style={styles.newNoteIcon}/>
            </TouchableOpacity>
            <Text style={styles.title}>oh boy a new note</Text>
            <TouchableOpacity  onPress={() => {
              this.props.close();
            }}>
              <Icon name='md-close' style={styles.newNoteIcon} />
            </TouchableOpacity>
          </Header>
          <View style={{
            flex:1,
            padding:10,
            backgroundColor: 'transparent',
          }}>
            <AutoExpandingTextInput
              style={{
                fontSize: 20,
                height: 40,
                fontWeight: 'bold'
              }}
              value={this.state.titleText}
              placeholder="My Note"
              onSubmitEditing={() => {console.log('does this work?')}}
              returnKeyType="done"
              onChangeText={(titleText) => this.setState({titleText})}
              minHeight={40}
              maxHeight={screenHeight - styles.headerHeight}
              onChangeHeight={() => {console.log('height changed')}}

              />
            <Br/>
            <AutoExpandingTextInput
              style={{
                fontSize: 18
              }}
              value={this.state.bodyText}
              onSubmitEditing={() => {console.log('how about this?')}}
              onChangeText={(bodyText) => this.setState({bodyText})}
              placeholder='what am I about?'
              enablesReturnKeyAutomatically={true}
              returnKeyType='done'
              minHeight={40}
              maxHeight={screenHeight - styles.headerHeight}
              onChangeHeight={() => {console.log('height changed')}}
              />
          </View>
        </View>
      );
    }
}

const {height: screenHeight} = Dimensions.get('window');
