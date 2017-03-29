import React, { Component } from 'react';
import { ListView, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body, Header, Title, Button, Left, Right, Icon } from 'native-base';
import Notebook from './notebook';
import NotebookView from './notebook-view';

export default class App extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      header: {
        title: 'ノート'
      },
      notebooks: [],
      page: 'home',
      viewingNoteBook: null
    };


    //TODO: save and load notebooks from local storage

    //create some notebooks
    tempjournal = new Notebook('robin');
    tempjournal2 = new Notebook();
    //push it into array
    this.state.notebooks.push(tempjournal);
    this.state.notebooks.push(tempjournal2);
    //add some notes to it
    this.state.notebooks[0].addNote('note1', 'note 1\'s text');
    this.state.notebooks[0].addNote('note2', 'note 2\'s text');
    this.state.notebooks[0].addNote('note3', 'note 3\'s text');

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
    this.setState({dataSource: this.state.dataSource.cloneWithRows(this.state.notebooks)});
  }



  renderRows(notebook) {
    return(
      <View style={{flex:1, flexDirection:'row'}}>
              <Title style={{padding:10, paddingTop:15}}>{notebook.name}</Title>
              <Right>
              <TouchableOpacity style={{flex:1, padding: 10}} onPress={() => {
                this.setState({viewingNoteBook: notebook});
                this.setPage('notebook');
              }}>
                <View style={{backgroundColor:'transparent'}}>
                  <Icon name="arrow-forward" style={{color:'#007AFF'}}/>
                </View>
              </TouchableOpacity>
              </Right>
      </View>
    );
  }

  aStraightFlatLine() {
    return(
      <View>

      </View>
    );
  }

  setPage(page) {
    this.setState({page: page});
  }

  render() {
    if (this.state.page == 'home') {
      return (
        <Container>
          <Header>
            <Body>
              <Title>{this.state.header.title}</Title>
            </Body>
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
        </Container>
      );
    } else if (this.state.page == 'notebook') {
      return (
        <Container>
          <NotebookView setPage={this.setPage.bind(this)} notebook={this.state.viewingNoteBook}/>
        </Container>
      );
    } else {
      return (
        <Container>
          <Body>
            <Title>THIS IS AN ERROR</Title>
          </Body>
        </Container>
      );
    }
  }
}
