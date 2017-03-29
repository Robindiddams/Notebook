/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry} from 'react-native';

import App from './src/app';
console.disableYellowBox = true;

export default class Notebook extends Component {
  render() {
    return (
      <App/>
    );
  }
}


AppRegistry.registerComponent('Notebook', () => Notebook);
