import React, { Component } from 'react';
import { ListView, ScrollView, TouchableOpacity, TextInput, View, Dimensions, LayoutAnimation, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Note from './card';
import Notebook from './notebook';
import Swipeout from 'react-native-swipe-out';
import AutoExpandingTextInput from 'react-native-auto-expanding-textinput';
import Br from './break';
import Drawer from 'react-native-drawer';
import Header from './header';
import Footer from './footer'
import NewNote from './newNote-view';
import styles from './styles';
// console.log(styless);

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class NotebookView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows(this.props.notebook.notes),
      search: '',
      titleText: '',
      bodyText: '',
      makeNote: false
    };

  }

  componentWillMount() {
    console.log('Hello');

    // this.setState({dataSource: this.state.dataSource.cloneWithRows(this.props.notebook.notes)})
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
  }

  deleteNote(note) {
    this.props.notebook.rm(note);
    // this.setState({dataSource: this.state.dataSource.cloneWithRows(this.props.notebook.notes)})
    this.setState({dataSource: ds.cloneWithRows(this.props.notebook.notes)});
  }

  showNoteDialogue(){
    this.listView.scrollTo({x: 0, y: 0, animated: true})
    this._drawer.open()
    console.log(this._drawer);
    console.log('openning drawer');
    // this.setState({makeNote: true});
  }

  closeNewNote(){
    // this.listView.scrollTo({x: 0, y: 0, animated: true})
    this._drawer.close();
    console.log('closing drawer');
    // this.setState({makeNote: true});
  }

  addNote(title, text) {
    this.props.notebook.addNote(title, text);
    this.setState({dataSource: ds.cloneWithRows(this.props.notebook.notes)});
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
          <Text style={styles.title}>{note.title}</Text>
          <Br/>
          <Text>{note.text}</Text>
        </Note>
    </Swipeout>
    );

  }




  render() {

    let searchStr = 'Search ' + this.props.notebook.name

    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        content={<NewNote close={this.closeNewNote.bind(this)} submit={this.addNote.bind(this)}/>}
        side='right'
        >

      {/*
        The header
          2 buttons and a title
      */}

        <Header>
          <TouchableOpacity  onPress={() => {this.props.setPage('home')}}>
            <Icon name='ios-arrow-back-outline' style={styles.newNoteIcon}/>
          </TouchableOpacity>
          <Text>{this.props.notebook.name}</Text>
          <TouchableOpacity onPress={() => {console.log('menu')}}>
            <Icon name='ios-menu-outline' style={styles.newNoteIcon} />
          </TouchableOpacity>
        </Header>

        {/*
          Search Bar
        */}

        <View style={{
          padding: 5,
          height:30,
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
              this.setState({dataSource: ds.cloneWithRows(this.props.notebook.search(text))})
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
            this.props.setPage('swipedex');
          }}>
            <Icon name="ios-photos-outline" style={styles.newNoteIcon}/>
          </TouchableOpacity>
          <TouchableOpacity ref='beans'   onPress={() => {
            console.log('new');
            this.showNoteDialogue();
            }}>
          <Icon name="ios-create-outline" style={styles.newNoteIcon} />
          </TouchableOpacity>
        </Footer>
      </Drawer>
    );
  }
}


const {height: screenHeight} = Dimensions.get('window')
const {width: screenWidth} = Dimensions.get('window')
