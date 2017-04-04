import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Dimensions, LayoutAnimation } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from './header';
import styles from './styles';
import Br from './break.js'
import AutoExpandingTextInput from 'react-native-auto-expanding-textinput';
import SwipeCards from 'react-native-swipe-cards';
import Note from './card';
import FlipCard from './flipcard'

export default class SwipeDex extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cards: this.props.notebook.notes,
      nextDeck: []
    }
    // this.setState({cards:this.props.notebook.cards})
  }

  handleYup (card) {

  }
  handleNope (card) {
    this.state.nextDeck.push(card);
  //  console.log(`Nope for ${card.text}`)
  }
  handleMaybe (card) {
  //  console.log(`Maybe for ${card.text}`)
  }

  noMoreCards() {
    LayoutAnimation.configureNext({
      duration: 100,
      create: {
        type: 'linear',
        property: 'opacity',
      },
      update: {
        type: 'linear',
      },
      delete: {
        type: 'linear',
        property: 'opacity',
      },
    });
    return(
      <View style={{height:300, width:300, flex:1, justifyContent:'center', alignItems: 'center'}}>
        <Text>no more cards</Text>
      </View>
    );
  }

  renderCards (cardData) {
    return(
      <FlipCard front={cardData.title} back={cardData.text}/>
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
            ref={'swipecards'}
            cards={this.state.cards}
            renderCard={this.renderCards}
            renderNoMoreCards={() => this.noMoreCards()}
            yupText='I know this!'
            nopeText='I dont know this'
            handleYup={() => this.handleYup()}
            handleNope={() => this.handleNope()}
            handleMaybe={this.handleMaybe}
            loop={false}
            onLoop={()=>{
              //figure this out
              // this.setState({cards:this.refs.swipecards.props.cards});
            }}
          />

        </View>
      );
    }
}

const {height: screenHeight} = Dimensions.get('window');
