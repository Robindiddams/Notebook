import React, { Component } from 'react';
import { ListView, ScrollView, TouchableOpacity, TextInput, View, Dimensions, LayoutAnimation, StyleSheet, Text, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Note from './card';
import Notebook from './notebook';
import Swipeout from 'react-native-swipe-out';
import AutoExpandingTextInput from 'react-native-auto-expanding-textinput';
import Br from './break';
import Drawer from 'react-native-drawer';
import Header from './header';
import Menu from './menu';
import Footer from './footer'
import NewNote from './newNote-view';
import styles from './styles';
import SwipeDex from './swipedex-view';
// console.log(styless);

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class NotebookView extends Component {
	constructor(props) {
		super(props);

		//create a notebook object from the notebook data
		this.masternotebook = new Notebook(this.props.notebook);
		AsyncStorage.getItem(`@Notebook:notebook-${this.props.notebook}`).then(notebook => {
			if (!notebook) {
				AsyncStorage.setItem(`@Notebook:notebook-${this.props.notebook}`, JSON.stringify(this.masternotebook.exportNotebook())).then(() => {
					console.log(this.props.notebook, 'not found, created it');
				});
			} else {
				console.log('importing', notebook);
				notebook = JSON.parse(notebook)
				this.masternotebook.importNotebook(notebook);
				this.setState({dataSource: ds.cloneWithRows(this.masternotebook.notes)});

			}
		}).catch(e => {console.log(e);});

		this.state = {
			dataSource: ds.cloneWithRows(this.masternotebook.notes),
			search: '',
			titleText: '',
			bodyText: '',
			makeNote: false,
			drawer: 'newNote'
		};
	}

	componentWillMount() {
		console.log('mounted', this.masternotebook);
	}


	componentWillUpdate(){
		// LayoutAnimation.spring();
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


	}
	componentWillUnmount () {
		console.log('unmounting');
		this.saveNotebook();
	}

	saveNotebook() {
		AsyncStorage.setItem(`@Notebook:notebook-${this.props.notebook}`, JSON.stringify(this.masternotebook.exportNotebook())).then(() => {
			console.log('done');
		});
	}

	deleteNote(note) {
		this.masternotebook.rm(note);
		this.setState({dataSource: ds.cloneWithRows(this.masternotebook.notes)});
	}

	showNoteDialogue(){
		this.listView.scrollTo({x: 0, y: 0, animated: true})
		this.setState({drawer:'newNote'})
		this._drawer.open()
		// console.log(this._drawer);
		console.log('openning drawer');
	}

	showSwipedex(){
		this.listView.scrollTo({x: 0, y: 0, animated: true})
		this.setState({drawer:'swipedex'})
		this._drawer.open()
		console.log('openning drawer');
	}

	closeDrawer(){
		this.saveNotebook();
		this._drawer.close();
		if (this.state.drawer === 'newNote') {
			this.setState({drawer: 'swipedex'});
		}
		console.log('closing drawer');
	}

	addNote(title, text) {
		this.masternotebook.addNote(title, text);
		this.setState({dataSource: ds.cloneWithRows(this.masternotebook.notes)});
	}


	renderRows(note) {

		let swipeBtns = [{
			text: 'Delete',
			color: '#F93308',
			backgroundColor: 'transparent',
			underlayColor: '#ffffff',
			onPress: () => { this.deleteNote(note) }
		}];


		return(
			<Swipeout right={swipeBtns}
				autoClose={true}
				backgroundColor= 'transparent'>
				<Note>
					<Text style={styles.title}>{note && note.title}</Text>
					<Br/>
					<Text>{note && note.text}</Text>
				</Note>
		</Swipeout>
		);
			

	}

	render() {

		let searchStr = 'Search ' + this.masternotebook.name

		return (
			<Drawer
				ref={(ref) => this._drawer = ref}
				tweenDuration={150}
				content={
					this.state.drawer === 'newNote' ? <NewNote close={this.closeDrawer.bind(this)} submit={this.addNote.bind(this)}/> :
					this.state.drawer === 'swipedex' ? <SwipeDex close={this.closeDrawer.bind(this)} notebook={this.props.notebook} /> :
					<Menu title='Notebook Options' close={this.closeDrawer.bind(this)}>
					</Menu>
					}
				side='right'
				>

			{/*
				The header
					2 buttons and a title
			*/}
				<Header>
					<TouchableOpacity  onPress={() => {this.props.setPage('home')}}>
						<Icon name='ios-arrow-back-outline' style={styles.iconBigger}/>
					</TouchableOpacity>
					<Text style={[styles.headerTitle, {paddingLeft:10}]}>{this.masternotebook.name}</Text>
					<TouchableOpacity onPress={() => {
						this.setState({drawer: 'menu'});
						this._drawer.open();
						}}>
						<Icon name='ios-menu-outline' style={styles.icon} />
					</TouchableOpacity>
				</Header>

				{/*
					Search Bar
				*/}

				<View style={{
					padding: 5,
					height:35,
					backgroundColor: 'transparent'
				}}>
					<View style={{
						backgroundColor: '#F5F5F5',
						flex: 1,
						flexDirection:'row',
						alignItems:'center',
						padding: 3,
						borderRadius: 5
					}}>
					<Icon name='ios-search-outline' style={styles.searchIcon}/>
					<TextInput placeholder={searchStr}
						style={{
							flex:1,
							paddingLeft:5
						}}
						clearButtonMode='always'
						autoCorrect={false}
						autoCapitalize='none'
						returnKeyType='done'
						returnKeyLabel='done'
						value={this.state.search}
						onChangeText={(text) => {
							this.listView.scrollTo({x: 0, y: 0, animated: true})
							this.setState({search: text});
							this.setState({dataSource: ds.cloneWithRows(this.masternotebook.search(text))})
						}}/>
					</View>
				</View>

				{/*
					List View
				*/}

				<ListView
					style={{
						height:530
					}}
					ref={ref => this.listView = ref}
					onScroll={() => {}}
					enableEmptySections={true}
					dataSource={this.state.dataSource}
					renderRow={this.renderRows.bind(this)}
				/>

				{/*
					Footer
						deckswiper button and new note button
				*/}

				<Footer>
					<TouchableOpacity  onPress={() => {
						console.log('do flashcards');
						this.showSwipedex();
					}}>
						<Icon name="ios-photos-outline" style={styles.icon}/>
					</TouchableOpacity>
					<TouchableOpacity ref='beans'   onPress={() => {
						console.log('new');
						this.showNoteDialogue();
						}}>
					<Icon name="ios-create-outline" style={styles.icon} />
					</TouchableOpacity>
				</Footer>
			</Drawer>
		);
	}
}


const {height: screenHeight} = Dimensions.get('window')
const {width: screenWidth} = Dimensions.get('window')
