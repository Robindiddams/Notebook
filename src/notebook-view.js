import React, { Component } from 'react';
import { ListView, ScrollView, TouchableOpacity, TextInput, View, Dimensions, LayoutAnimation, StyleSheet, Text } from 'react-native';
import { Icon } from 'native-base';
import Note from './card';
import Notebook from './notebook';
import Swipeout from 'react-native-swipe-out';
import AutoExpandingTextInput from 'react-native-auto-expanding-textinput';
import Br from './break';
import Drawer from 'react-native-drawer';
import Header from './header';
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
            <Icon name='arrow-back' style={styles.newNoteIcon}/>
          </TouchableOpacity>
          <Text style={styles.title}>{this.props.notebook.name}</Text>
          <TouchableOpacity onPress={() => {console.log('menu')}}>
            <Icon name='ios-menu-outline' style={styles.newNoteIcon} />
          </TouchableOpacity>
        </Header>

        {/*
          The Body
            Search bar, new note dialogue, list view, new note button
        */}

        <View >

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
            <Icon name='search' style={styles.searchIcon}/>
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
            New Note Creation area
          */}
          {/*

          {this.state.makeNote ? <View style={{
            shadowOffset: {
              width: 0,
              height: 3
            },
            shadowOpacity: 0.5,
            padding: 10
          }}>
            <View style={{ backgroundColor:'#ffffff'}}>
              <View style={{
                  flex:1,
                  flexDirection: 'row',
                  paddingLeft: 10,
                  paddingRight: 10,
                  justifyContent:'space-between'
                }}>
                <TouchableOpacity onPress={() => {this.setState({makeNote: false})}}>
                  <Icon name='ios-close-outline' style={styles.newNoteIcon}/>
                </TouchableOpacity>
                <Text style={{paddingTop: 5}}>Oh boy a new note</Text>
                <TouchableOpacity onPress={() => {
                  this.setState({makeNote: false});
                  this.addNote(this.state.titleText, this.state.bodyText);
                }}>
                  <Icon name='ios-checkmark-outline' style={styles.newNoteIcon}/>
                </TouchableOpacity>
              </View>
              <Br/>
              <View style={{paddingLeft: 10, paddingRight: 10}}>
                <TextInput
                  style={{
                    fontSize: 20,
                    height: 40
                  }}
                  placeholder="My Note"
                  onSubmitEditing={() => {console.log('does this work?')}}
                  returnKeyType="done"
                  onChangeText={(titleText) => this.setState({titleText})}/>
                <Br/>
                <AutoExpandingTextInput
                  style={{
                    fontSize: 20,
                    paddingLeft: 0
                  }}
                  onSubmitEditing={() => {console.log('how about this?')}}
                  onChangeText={(bodyText) => this.setState({bodyText})}
                  placeholder='what am I about?'
                  enablesReturnKeyAutomatically={true}
                  returnKeyType='done'
                  minHeight={40}
                  maxHeight={screenHeight - 25}
                  onChangeHeight={() => {console.log('height changed')}}/>
              </View>
            </View>
          </View> : null}
          */}


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
            "new note" button


          <Body>
            <Button transparent onPress={() => {
              console.log('do newcard');
              this.showNoteDialogue();
            }}>
              <Text>new note</Text>
            </Button>
          </Body>
          */}
        </View>

        {/*
          Footer
            deckswiper button and new note button

        */}

        <View style={{height:styles.footerHeight, backgroundColor: '#F5F5F5'}}>
          <View style={{flex:1,
              flexDirection: 'row',
              paddingTop:10,
              paddingLeft: 10,
              paddingRight: 10,
              justifyContent:'space-between',
              borderTopColor: '#bbb',
              borderTopWidth: StyleSheet.hairlineWidth
            }}>
            <TouchableOpacity  onPress={() => {console.log('do flashcards')}}>
              <Icon name="ios-photos-outline" style={styles.newNoteIcon}/>

            </TouchableOpacity>
            <TouchableOpacity ref='beans'   onPress={() => {
              console.log('new');
              this.showNoteDialogue();
              }}>
            <Icon name="ios-create-outline" style={styles.newNoteIcon} />
            </TouchableOpacity>
          </View>
        </View>

      </Drawer>

    );
  }
}


const {height: screenHeight} = Dimensions.get('window')
const {width: screenWidth} = Dimensions.get('window')
