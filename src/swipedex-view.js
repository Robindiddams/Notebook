import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from './header';
import styles from './styles';
import Br from './break.js'
import AutoExpandingTextInput from 'react-native-auto-expanding-textinput';
import SwipeCards from 'react-native-swipe-cards';
import Note from './card';

export default class SwipeDex extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cards: this.props.notebook.notes
    }
    console.log(this.state.cards);
    // this.setState({cards:this.props.notebook.cards})
  }

  handleYup (card) {
   console.log(`Yup for ${card.text}`)
  }
  handleNope (card) {
   console.log(`Nope for ${card.text}`)
  }
  handleMaybe (card) {
   console.log(`Maybe for ${card.text}`)
  }

  renderCards (cardData) {

    // return(
    //   <View style={{
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     width: 300,
    //     height: 300,
    //     backgroundColor:'#000000'
    //   }}>
    //   <Text>cardData.title</Text>
    //   </View>
    // );
    return(
      <Note style={{height: 200, width: 200}}>
      <Text style={styles.title}>{cardData.title}</Text>
      <Br/>
      <Text>{cardData.text}</Text>
      </Note>
    );
  }


  render() {
      return(
        <View style={{height:screenHeight - styles.headerHeight}}>
        {/*
          */}
          <Header>
            <TouchableOpacity onPress={() => {
              this.props.setPage('notebook')
            }}>
              <Icon name='ios-arrow-back-outline' style={styles.newNoteIcon}/>
            </TouchableOpacity>
            <Text style={styles.title}>its the swipedex</Text>
            <TouchableOpacity  onPress={() => {
              console.log('thing');
            }}>
              <Icon name='md-close' style={styles.newNoteIcon} />
            </TouchableOpacity>
          </Header>
          <SwipeCards
            cards={this.state.cards}
            renderCard={this.renderCards}
            renderNoMoreCards={() => <View><Text>no more cards</Text></View>}

            handleYup={this.handleYup}
            handleNope={this.handleNope}
            handleMaybe={this.handleMaybe}
            hasMaybeAction
          />

        </View>
      );
    }
}

const {height: screenHeight} = Dimensions.get('window');
