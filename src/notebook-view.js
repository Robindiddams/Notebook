import React, { Component } from 'react';
import { ListView, ScrollView, TouchableOpacity, TextInput, View, Dimensions, LayoutAnimation, StyleSheet } from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Header,
  Title,
  Button,
  Left,
  Right,
  Icon,
  Item,
  Input,
  Footer,
  Form
 } from 'native-base';
import NewNote from './newNote';
import Notebook from './notebook';
import Swipeout from 'react-native-swipe-out';
import AutoExpandingTextInput from 'react-native-auto-expanding-textinput';
import Br from './break';

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class NotebookView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows(this.props.notebook.notes),
      search: '',
      titleText: '',
      bodyText: ''
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

  deleteNote(note) {
    this.props.notebook.rm(note);
    // this.setState({dataSource: this.state.dataSource.cloneWithRows(this.props.notebook.notes)})
    this.setState({dataSource: ds.cloneWithRows(this.props.notebook.notes)});
  }

  showNoteDialogue(){
    this.listView.scrollTo({x: 0, y: 0, animated: true})
    this.setState({makeNote: true});
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
        <Card>
          <CardItem bordered>
            <Content>
              <Body>
                  <Title>{note.title}</Title>
                </Body>
            </Content>
          </CardItem>
          <CardItem>
            <Content>
              <Body>
                <Text>{note.text}</Text>
              </Body>
            </Content>
          </CardItem>
        </Card>
    </Swipeout>
    );
  }

  closeNewNote() {
    this.setState({makeNote: false});
    console.log('closing note');
  }


  render() {

    let searchStr = 'Search ' + this.props.notebook.name

    return (
      <Container>

      {/*
        The header
          2 buttons and a title
      */}

        <Header>
          <Left>
            <Button transparent onPress={() => {this.props.setPage('home')}}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.notebook.name}</Title>
          </Body>
          <Right>
            <Button transparent ref='beans' onPress={() => {console.log('menu')}}>
              <Icon name='ios-menu-outline' />
            </Button>
          </Right>
        </Header>


        {/*
          The Body
            Search bar, new note dialogue, list view, new note button
        */}

        <Content>


          {/*
            Search Bar
          */}

          <View style={{
            padding: 5,
            paddingBottom: 0
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
                this.setState({search: text});
                this.setState({dataSource: ds.cloneWithRows(this.props.notebook.search(text))})
              }}/>
            </View>
          </View>


          {/*
            New Note Creation area
          */}

          {this.state.makeNote ? <View style={{
            shadowOffset: {
              width: 0,
              height: 3
            },
            shadowOpacity: 0.5,
            padding: 10
          }}>
            <View style={{ backgroundColor:'#ffffff'}}>
              <View style={{flex:1, flexDirection: 'row', paddingLeft: 10, paddingRight: 10, justifyContent:'space-between'}}>
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


          {/*
            List View
          */}

          <ListView
            ref={ref => this.listView = ref}
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={this.renderRows.bind(this)}
          />


          {/*
            "new note" button
          */}

          <Body>
            <Button transparent onPress={() => {
              console.log('do newcard');
              this.showNoteDialogue();
            }}>
              <Text>new note</Text>
            </Button>
          </Body>
        </Content>


        {/*
          Footer
            deckswiper button and new note button
        */}

        <Footer>
        <Left>
        <Button transparent onPress={() => {
          console.log('do flashcards');
        }}>
          <Icon name="ios-photos-outline" />
        </Button>
        </Left>
        <Right>
          <Button transparent onPress={() => {
            console.log('do newcard');
            this.showNoteDialogue();
          }}>
            <Icon name="ios-create-outline" />
          </Button>
        </Right>
        </Footer>
      </Container>
    );
  }
}
const {height: screenHeight} = Dimensions.get('window')
const {width: screenWidth} = Dimensions.get('window')
const styles = {
  //button color '#007AFF'
    search: {
      flex: 1,
      backgroundColor: '#ffffff',
      padding: 3,
      paddingBottom: 0
    },
    searchBar: {
      backgroundColor: '#F5F5F5',
      borderColor: 'transparent',
      padding: 0,
      height:40
    },
    searchIcon: {
      fontSize: 20,
      // padding: 0,
      // paddingLeft: 10,
      // paddingTop: 3,
      backgroundColor: 'transparent'
    },
    newNoteIcon: {
      color: '#007AFF'
    }
};
