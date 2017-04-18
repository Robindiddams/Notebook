import React, { Component } from 'react';
import { View,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Text,
	Dimensions,
	LayoutAnimation,
	AsyncStorage,
	ScrollView,
	AlertIOS,
	ActionSheetIOS,
	Alert
	} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from './header';
import styles from './styles';
import Br from './break.js'
import Notebook from './notebook';
import { Deck } from './notebook';
import AutoExpandingTextInput from 'react-native-auto-expanding-textinput';
import SwipeCards from 'react-native-swipe-cards';
import Note from './card';
import Drawer from 'react-native-drawer';
import FlipCard from './flipcard';
import Menu from './menu';

export default class SwipeDex extends Component {
	constructor(props) {
		super(props)
		// let date = new Date();
		// console.log(Date.now());
		// this.notebook = new Notebook(this.props.notebook);
		this.getNotebook();
		this.getDecks();
		this.state = {
			//globals:
			allCards: {},

			//deckswiper:
			original: [],
			cards: [],
			nextDeck: [],
			carding: false,
			
			//deck menu:
			deckMenuTitle:'',
			go:true,
			reset:true,
			save:true,
			delete:false,
			decks:[]
		}
		// this.setState({cards:this.props.notebook.cards})
	}

	getNotebook() {
		AsyncStorage.getItem(`@Notebook:notebook-${this.props.notebook}`).then(item => {
			notebook = JSON.parse(item);
			
			allCards = new Deck('All-Cards');
			deck = {
				name:'All Notes',
				notes: notebook.notes
			};
			allCards.importDeck(deck);
			
			this.setState({allCards: allCards});
			this.setDeck(allCards);
			
		}).catch(e => console.log(e));
	}

	getDecks() {
		console.log(`getting decks from @Notebook:deck-${this.props.notebook}`);
		AsyncStorage.getItem(`@Notebook:deck-${this.props.notebook}`).then(rawDecks => {
			if (!rawDecks) {
				console.log('i guess this notebooks deckslot doesn\'t exist yet');
				this.setState({decks: []});
			} else {
				console.log('i got ', rawDecks, 'when i asyncstoraged for the decks')
				parseDecks = JSON.parse(rawDecks);
				const finisheDecks = parseDecks.map(deck => {
					// import every deck
					nDeck = new Deck();
					nDeck.importDeck(deck);
					return nDeck;
				});
				this.setState({decks: finisheDecks});
			}
		}).catch(e => {
			console.log(e);
		});
	}

	saveDecks() {
		console.log('saving decks:', this.state.decks, `to @Notebook:deck-${this.props.notebook}`);
		const unpackeDecks = this.state.decks.map(deck => {
			console.log(deck);
			return deck.exportDeck();
		});
		console.log('unpacked deck:', unpackeDecks);
		AsyncStorage.setItem(`@Notebook:deck-${this.props.notebook}`, JSON.stringify(unpackeDecks)).then(() => {
			console.log('saved decks');
		}).catch(e => {
			cosole.log(e);
		});
	}

	setDeck(deck) {
		//this takes a deck and sets the title and cards
		this.setState({cards:deck.notes, original: deck.notes, deckMenuTitle: deck.name});
	}

	addDeck(deck) {
		newDecks = this.state.decks;
		newDecks.push(deck);
		this.setState({decks: newDecks});
		this.saveDecks();
	}

	deleteDeck(deck) {
		Alert.alert(
			'Are you sure you want to delete this Deck?',
			null,
			[
				{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
				{text: 'Yes', onPress: () => {
					newDecks = this.state.decks;
					newDecks.splice(deck, 1);
					this.setState({decks: newDecks});
					this.saveDecks();
				}},
			],
			{ cancelable: true }
		);
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

	updateTheButtons() {
		if(this.state.nextDeck.length === 0) {
			console.log('nextDeck',this.refs);
			this.setState({go:false, save:false});
		} else {
			this.setState({go:true, save:true});
		}
	}

	handleYup (card) {
	}

	handleNope (card) {
		this.state.nextDeck.push(card);
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

	closeDrawer() {
		this._drawer.close();
	}


	render() {

		var BUTTONS = [
			'Use this Deck',
			// 'Edit',
			'Delete',
			'Cancel',
		];
		var DESTRUCTIVE_INDEX = BUTTONS.indexOf('Delete');
		var CANCEL_INDEX = BUTTONS.indexOf('Cancel');


		const renderedDecks =  this.state.decks.map(d => {
			return <View key={d.name} style={[styles.card, styles.deckSelect, {padding:0}]}>
					<TouchableOpacity
						style={{backgroundColor:'transparent'}}
						onPress={() => {
							this.setDeck(d);
						}}
						delayLongPress={1000}
						onLongPress={() => {
							ActionSheetIOS.showActionSheetWithOptions({
								options: BUTTONS,
								cancelButtonIndex: CANCEL_INDEX,
								destructiveButtonIndex: DESTRUCTIVE_INDEX,
							},
							(buttonIndex) => {
								buttonIndex === BUTTONS.indexOf('Use this Deck') ? this.setDeck(d) : null;
								{/*buttonIndex === BUTTONS.indexOf('Edit') ? null : null;*/}
								buttonIndex === BUTTONS.indexOf('Delete') ? this.deleteDeck(d) : null;
							});
						}}>
						<View style={[styles.card, styles.innerDeckSelect]}>
							<Text>{d.name}</Text>
							<Text style={{color:'#a0a0a0', fontSize:10}}>{d.notes.length} Notes</Text>
						</View>
					</TouchableOpacity>
				</View>
		});

		renderedDecks.unshift(<View key={'All-Cards'} style={[styles.card, styles.deckSelect, {padding:0}]}>
			<TouchableOpacity onPress={() => {
					this.setDeck(this.state.allCards);
				}}>
				<View style={[styles.card, styles.innerDeckSelect]}>
					<Text>All Notes</Text>
					<Text style={{color:'#a0a0a0', fontSize:10}}>{this.state.allCards.notes ? this.state.allCards.notes.length + ' Notes' : null}</Text>
				</View>
			</TouchableOpacity>
		</View>);

		//so this is for making a new deck, i guess it requires a picker
		/*renderedDecks.unshift(<TouchableOpacity key={'Create-New-Deck'} style={[styles.deckSelect, styles.newDeckSelect]}>
				<Icon name='md-add' style={{color:'#F5F5F5', fontSize:40,}} />
			</TouchableOpacity>);*/

			return(
				<Drawer
					ref={(ref) => this._drawer = ref}
					tweenDuration={250}
					tweenHandler={(ratio) => ({
						main: { opacity:(2-ratio)/2 }
					})}
					content={
							<Menu title='Deck Options' close={this.closeDrawer.bind(this)}>
								<View style={[styles.li, { flexDirection: 'column', padding: 10}]}>
									<Icon name='ios-information-circle-outline' style={styles.iconBigger}/>
									<Text>
										The Deck view has 2 parts, the menu and the decks. The menu shows what Deck is youre using, and how many cards are in it. When you swipe through a deck you can swipe left to see it again and right to not see it again.
										When you finish a deck the menu will update and you can swipe throught the Notes you selected to see again, save the Notes into a new Deck, or reset the Deck to its original state.
										The menu has 3 options: 'Test me!' runs through the current Deck, 'Reset the Deck' sets the current deck back to its original state, 'Save the Deck' lets you create a deck out of the current deck.
										Tap a Deck to set it as the current Deck. Long Press it (for one second) and you will be given a menu that allows you to delete it.
									</Text>
								</View>
							</Menu>
						}
					side='right'
				>
				{/*
					*/}
					<Header>
						<TouchableOpacity onPress={() => {
							if (this.state.carding) {
								this.updateTheButtons();
								this.setState({cards:this.shuffle(this.state.nextDeck), nextDeck:[], carding: false});
							} else {
							this.props.close();
							}
						}}>
							<Icon name='ios-arrow-back-outline' style={styles.iconBigger}/>
						</TouchableOpacity>
						<Text style={[styles.headerTitle, {paddingLeft:10}]}>Decks</Text>
						<TouchableOpacity  onPress={() => {
							this._drawer.open();
						}}>
							<Icon name='ios-menu-outline' style={styles.icon} />
						</TouchableOpacity>
					</Header>
					<View style={{
						flex:1,
						alignItems: 'center',
					}}>
						{this.state.carding ? <View>
							<SwipeCards
								ref={'swipecards'}
								cards={this.state.cards}
								renderCard={(card) => this.renderCards(card)}
								renderNoMoreCards={() => this.noMoreCards()}
								yupText='I know this!'
								nopeText='show me this again'
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
										console.log('reached end');
										this.updateTheButtons();
										this.setState({cards:this.shuffle(this.state.nextDeck), nextDeck:[], carding: false});
									}
								}}
							/>
							</View>: 
							<ScrollView style={{flex:1, flexDirection:'column', padding: 10}} ref={'scrollview'}>
								<View style={styles.swipedexMenu}>
									<View style={{
										flex:1,
										flexDirection: 'column',
										justifyContent: 'center',
										alignItems: 'center',
										marginLeft:5,
										marginRight:5,
									}}>
										<Text>Deck: {this.state.cards.length < this.state.original.length ? 'Subset of ' : null}{this.state.deckMenuTitle}</Text>
										<Text>Notes: {this.state.cards.length ? this.state.cards.length : 0}</Text>
									</View>
									<View style={{
										flex:1,
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}>
										{this.state.go ?
											<TouchableOpacity style={styles.bubbleButton} onPress={() => {
												this.setState({carding:true})
											}}>
												<Text  style={{color:styles.buttonColor}}>Test me!</Text>
											</TouchableOpacity> :
											<View style={styles.bubbleButton}>
												<Text style={{color:'#F5F5F5'}}>Test me!</Text>
											</View>
										}
										<TouchableOpacity style={styles.bubbleButton} onPress={() => {
											this.setState({cards: this.shuffle(this.state.original), go: true, save:true});
											{/*this.setState({carding:true})*/}
										}}>
											<Text style={{color:styles.buttonColor}}>Reset the deck</Text>
										</TouchableOpacity>
									</View>
									<View style={{
										flex:1,
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}>
										{this.state.save ?
											<TouchableOpacity style={styles.bubbleButton} onPress={() => {
												AlertIOS.prompt(
													'Name the new Deck:',
													`This deck has ${this.state.cards.length} cards in it`,
													text => {
														newDeck = new Deck(text, this.state.cards)
														this.refs.scrollview.scrollTo({x: 0, y: 0, animated: true})
														this.addDeck(newDeck);
													}
												);
											}}>
												<Text style={{color:styles.buttonColor}}>Save the Deck</Text>
											</TouchableOpacity> :
											<View style={styles.bubbleButton}>
												<Text  style={{color:'#F5F5F5'}}>Save the Deck</Text>
											</View>
										}
									</View>
								</View>
								<View style={{marginTop: 20, flex:1, flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
									<Text style={{color: '#8E8E8E'}}>Decks</Text>
								</View>
								<Br/>
								<View style={{
									flex:1, 
									flexDirection: 'row', 
									flexWrap:'wrap',
									marginTop: 10,
									//backgroundColor:'#f5f5f5', 
									width: 310,}}
								>
									{renderedDecks}
								</View>
							</ScrollView>
						}
					</View>
				</Drawer>
			);
		}
}

const {height: screenHeight} = Dimensions.get('window');
