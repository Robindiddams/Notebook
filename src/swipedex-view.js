import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Dimensions, LayoutAnimation, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from './header';
import styles from './styles';
import Br from './break.js'
import Notebook from './notebook';
import AutoExpandingTextInput from 'react-native-auto-expanding-textinput';
import SwipeCards from 'react-native-swipe-cards';
import Note from './card';
import FlipCard from './flipcard'

export default class SwipeDex extends Component {
  constructor(props) {
    super(props)

    // this.notebook = new Notebook(this.props.notebook);
    AsyncStorage.getItem(`@Notebook:notebook-${this.props.notebook}`).then(item => {
      console.log(item);
      notebook = JSON.parse(item);
      console.log(notebook.notes);
      this.setState({original:notebook.notes, cards: this.shuffle(notebook.notes)});
      console.log(this.state);
    }).catch(e => console.log(e))

    this.state = {
      original: [],
      cards: [],
      nextDeck: [],
      carding: false
    }
    // this.setState({cards:this.props.notebook.cards})
  }

  getCards() {

  }

  shuffle(array) {
    if (array.length > 2) {
      console.log('shuffleing:', array);

      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    } else {
      return array;
    }
  }

  handleYup (card) {

  }
  handleNope (card) {
    console.log(card);
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
      <FlipCard ref={'flipcard'} front={cardData.title} back={cardData.text}/>
    );
  }


  render() {
      return(
        <View style={{height:screenHeight - styles.headerHeight}}>
        {/*
          */}
          <Header>
            <TouchableOpacity onPress={() => {
              this.props.close();
            }}>
              <Icon name='ios-arrow-back-outline' style={styles.iconBigger}/>
            </TouchableOpacity>
            <Text style={[styles.headerTitle, {paddingLeft:10}]}>its the swipedex</Text>
            <TouchableOpacity  onPress={() => {
              console.log('thing');
            }}>
              <Icon name='ios-menu-outline' style={styles.icon} />
            </TouchableOpacity>
          </Header>
          <View style={{
            flex:1,
            alignItems: 'center',
          }}>
            {this.state.carding ?
              <SwipeCards
                ref={'swipecards'}
                cards={this.state.cards}
                renderCard={(card) => this.renderCards(card)}
                renderNoMoreCards={() => this.noMoreCards()}
                yupText='I know this!'
                nopeText='I dont know this'
                handleYup={() => this.handleYup()}
                handleNope={(card) => this.handleNope(card)}
                handleMaybe={this.handleMaybe}
                loop={true}
                onClickHandler={(card) =>{
                  if (this.refs.swipecards.refs.flipcard.state.cardText == this.refs.swipecards.refs.flipcard.props.front) {
                    this.refs.swipecards.refs.flipcard.setState({cardText: this.refs.swipecards.refs.flipcard.props.back});
                  } else {
                    this.refs.swipecards.refs.flipcard.setState({cardText: this.refs.swipecards.refs.flipcard.props.front});
                  }
                }}
                cardRemoved={card => {
                  if (card === this.state.cards.length - 1) {
                    this.setState({cards:this.shuffle(this.state.nextDeck)});
                    this.setState({nextDeck:[]});
                    this.setState({carding: false});
                  }
                }}
              /> : <View style={styles.swipedexMenu}>
                  <View style={{
                      flex:1,
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <Text>Ready to test yourself?</Text>
                      <Text>This deck has {this.state.cards.length ? this.state.cards.length : 0} cards in it</Text>
                    </View>
                    <View style={{
                      flex:1,
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}>
                      <TouchableOpacity style={styles.bubbleButton} onPress={() => {
                        this.setState({carding:true})
                      }}>
                        <Text style={{color:styles.buttonColor}}>Yes! Lets Go!</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.bubbleButton} onPress={() => {
                        this.setState({cards: this.shuffle(this.state.original)})
                        console.log('hello?');
                        this.setState({carding:true})
                      }}>
                        <Text style={{color:styles.buttonColor}}>Reset the deck</Text>
                      </TouchableOpacity>
                    </View>
              </View>
            }
          </View>
        </View>
      );
    }
}

const {height: screenHeight} = Dimensions.get('window');
