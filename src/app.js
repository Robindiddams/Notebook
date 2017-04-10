import React, { Component } from 'react';
import { ListView, TouchableOpacity, Dimensions, View, StyleSheet, LayoutAnimation, Text, AsyncStorage, AlertIOS, Alert } from 'react-native';
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
        if (!notebooks) {
          AsyncStorage.setItem('@Notebook:notebooks', '[]');
        } else {
          console.log('no errors recieveing:', notebooks);
          notebooks = JSON.parse(notebooks);
          console.log('parsed to:', notebooks);
          this.setState({dataSource: this.state.dataSource.cloneWithRows(notebooks)});
        }
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

    // <Swipeout right={swipeBtns}
    // autoClose={true}
    // backgroundColor= 'transparent'>
    return(
        <TouchableOpacity style={{padding: 10}} onPress={() => {
          console.log('click');
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
          this.setState({viewingNoteBook: notebook});
          this.setPage('notebook');
        }}>
          <View style={{flex:1, flexDirection:'row', justifyContent: 'space-between', }}>
            <Text style={{padding:10, paddingTop:12}}>{notebook}</Text>
            <Icon name="ios-arrow-forward-outline" style={[styles.iconBigger, {paddingTop:5}]}/>
          </View>
        </TouchableOpacity>
    );
    // </Swipeout>
  }


  setPage(page) {
    this.setState({page: page});
  }

  render() {
    if (this.state.page == 'home') {
      return (
        <View>
          <Header style={{justifyContent:'center'}}>
            <Text style={styles.headerTitle}>{this.state.header.title}</Text>
          </Header>
          <ListView
            style={{
              height:screenHeight - styles.footerHeight - styles.headerHeight
            }}
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={this.renderRows.bind(this)}
            renderSeparator={(sectionId, rowId) => <View key={rowId} style={{
              flex: 1,
              height: StyleSheet.hairlineWidth,
              backgroundColor: '#8E8E8E'}} />}
          />
          <Footer style={{justifyContent:'center', }}>
          {/*
            <TouchableOpacity  onPress={() => {
              console.log('refresh');
            }}>
              <Icon name="ios-refresh" style={styles.iconBigger}/>
            </TouchableOpacity>
            */}
            <TouchableOpacity style={{paddingLeft:10, paddingRight:10}} onPress={() => {
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
              <Icon name="ios-add-outline" style={styles.icon} />
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

const {height: screenHeight} = Dimensions.get('window');
