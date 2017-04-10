import React, { Component } from 'react';
import { ListView, TouchableOpacity, View, StyleSheet, Text, AsyncStorage, AlertIOS, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Notebook from './notebook';
import Header from './header';
import Footer from './footer';
import NotebookView from './notebook-view';
import styles from './styles';
import SwipeDex from './swipedex-view';
import Swipeout from 'react-native-swipe-out';


export default class App extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      header: {
        title: 'ノート'
      },
      page: 'home',
      viewingNoteBook: null
    };


    // notebooks = ['robin', 'no name'];
    // AsyncStorage.setItem('@Notebook:notebooks', JSON.stringify(notebooks))
// ,,,,,,,,,,,,,,,,
    // //TODO: save and load notebooks from local storage
    // AsyncStorage.setItem('@Notebook:notebooks', '[]').then(()=> {
    //   console.log('pushed');
    // });
    //   console.log('no errors pushing data');
    //   //create some notebooks
    //   tempjournal = new Notebook('robin');
    //   tempjournal2 = new Notebook();
    //   //push it into array
    //   notebooks.push(tempjournal);
    //   notebooks.push(tempjournal2);
    //   //add some notes to it
    //   notebooks[0].addNote('note1', 'note 1\'s text');
    //   notebooks[0].addNote('note2', 'note 2\'s text');
    //   notebooks[0].addNote('note3', 'note 3\'s text');
    //   notebooks[0].addNote('a', 'note 3\'s text');
    //   notebooks[0].addNote('as', 'note 3\'s text');
    //   notebooks[0].addNote('asd', 'note 3\'s text');
    //   notebooks[0].addNote('asdf', 'note 3\'s text');
    //   AsyncStorage.setItem('@Notebook:notebooks', JSON.stringify(notebooks)).then(()=> {console.log('no errors pushing data');}).catch(e => {
    //     console.log(e);
    //   });
    // }).catch(e => {
    //   console.log(e);
    // });


  }

  componentWillMount() {
    // let params = {
    //   method: 'GET',
    //   headers: {
    //     'Accept': 'text/html,application/xhtml+xml,application/xml'
    //   }
    // };
    // fetch('http://localhost:8000/someaccountSHA/', params).then(resp => {
    //   console.log(resp);
    //   return resp.text();
    // }).then(json => {
    //   console.log(json);
    // }).catch(err => {
    //   console.log(err);
    // })

    // this.buildCardset();
      AsyncStorage.getItem('@Notebook:notebooks').then((notebooks) => {
        console.log('no errors recieveing:', notebooks);
        notebooks = JSON.parse(notebooks);
        console.log('parsed to:', notebooks);
        this.setState({dataSource: this.state.dataSource.cloneWithRows(notebooks)});
      }).catch((e) => {
        console.log(e);
      });
  }

  createNotebook(name) {
    AsyncStorage.getItem('@Notebook:notebooks').then(notebooks => {
      notebooks = JSON.parse(notebooks);
      console.log(notebooks);
      notebooks.push(name);
      this.setState({dataSource: this.state.dataSource.cloneWithRows(notebooks)});
      AsyncStorage.setItem('@Notebook:notebooks', JSON.stringify(notebooks));
    }).catch(e => console.log(e));
  }

  deleteNotebook(name) {
    Alert.alert(
      `Are you sure you want to delete "${name}"?`,
      'This cannot be undone',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => {
          AsyncStorage.getItem('@Notebook:notebooks').then(notebooks => {
            notebooks = JSON.parse(notebooks);
            console.log(notebooks);
            notebooks.splice(notebooks.indexOf(name), 1);
            this.setState({dataSource: this.state.dataSource.cloneWithRows(notebooks)});
            AsyncStorage.setItem('@Notebook:notebooks', JSON.stringify(notebooks));
            AsyncStorage.setItem(`@Notebook:notebook-${name}`, '');
          }).catch(e => console.log(e));
        }},
      ],
      { cancelable: false }
    );
  }


  renderRows(notebook) {
    let swipeBtns = [{
      text: 'Delete',
      color: '#ffffff',
      backgroundColor: '#F93308',
      underlayColor: '#ffffff',
      onPress: () => { this.deleteNotebook(notebook) }
    }];

    return(
      <Swipeout right={swipeBtns}
        autoClose={true}
        backgroundColor= 'transparent'>
        <View style={{flex:1, flexDirection:'row', justifyContent: 'space-between'}}>
          <Text style={{padding:10, paddingTop:15}}>{notebook}</Text>
          <TouchableOpacity style={{padding: 10}} onPress={() => {
            this.setState({viewingNoteBook: notebook});
            this.setPage('notebook');
          }}>
            <Icon name="ios-arrow-forward-outline" style={styles.newNoteIcon}/>
          </TouchableOpacity>
        </View>
    </Swipeout>
    );
  }


  setPage(page) {
    this.setState({page: page});
  }

  render() {
    if (this.state.page == 'home') {
      return (
        <View>
          <Header style={{justifyContent:'center'}}>
            <Text>{this.state.header.title}</Text>
          </Header>
          <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={this.renderRows.bind(this)}
            renderSeparator={(sectionId, rowId) => <View key={rowId} style={{
              flex: 1,
              height: StyleSheet.hairlineWidth,
              backgroundColor: '#8E8E8E'}} />}
          />
          <Footer>
            <TouchableOpacity  onPress={() => {
              console.log('refresh');
            }}>
              <Icon name="ios-refresh" style={styles.newNoteIcon}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              console.log('new');
              AlertIOS.prompt(
                'Enter a value',
                null,
                text => {
                  console.log("You entered "+text);
                  this.createNotebook(text);
                }
              );
              }}>
              <Icon name="ios-create-outline" style={styles.newNoteIcon} />
            </TouchableOpacity>
          </Footer>
        </View>
      );
    } else if (this.state.page == 'notebook') {
      return (
          <NotebookView setPage={this.setPage.bind(this)} notebook={this.state.viewingNoteBook}/>
      );
    }
  }
}
