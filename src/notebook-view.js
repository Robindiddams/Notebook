import React, { Component } from 'react';
import { ListView, TouchableOpacity, TextInput, View, Dimensions, LayoutAnimation } from 'react-native';
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

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class NotebookView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows(this.props.notebook.notes),
      search: ''
    };

  }

  componentWillMount() {
    console.log('Hello');

    // this.setState({dataSource: this.state.dataSource.cloneWithRows(this.props.notebook.notes)})
  }
  componentWillUpdate(){
    // LayoutAnimation.spring();

  }

  deleteNote(note) {
    this.props.notebook.rm(note);
    // this.setState({dataSource: this.state.dataSource.cloneWithRows(this.props.notebook.notes)})
    this.setState({dataSource: ds.cloneWithRows(this.props.notebook.notes)});
  }

  showNoteDialogue(){
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
              <TouchableOpacity onPress={() => {
                console.log('hello');
              }}>
              </TouchableOpacity>
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
          {this.state.makeNote ? <NewNote closeNewNote={this.closeNewNote.bind(this)}/> : null}
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
        <Content>
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
                // <Button transparent onPress={() => {
                //   this.setState({search: ''})
                //   this.setState({dataSource: ds.cloneWithRows(this.props.notebook.notes)})
                // }}>
                // <Icon active name="ios-close-circle-outline" />
                // </Button>
              }}/>
            </View>
          </View>

          <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={this.renderRows.bind(this)}
          />
          <Body>
            <Button transparent onPress={() => {
              console.log('do newcard');
              this.showNoteDialogue();
            }}>
              <Text>new note</Text>
            </Button>
          </Body>
        </Content>
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
};
