import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from './header';

export default class Menu extends Component {
	static defaultProps = {
		title:'menu'
	};

	constructor(props) {
		super(props)

	}


	render() {
			return(
				<View>
					<Header>
						<TouchableOpacity onPress={() => {
							this.props.close();
						}}>
							<Icon name='ios-arrow-back-outline' style={styles.iconBigger}/>
						</TouchableOpacity>
						<Text style={[styles.headerTitle]}>{this.props.title}</Text>
						<Text></Text>
					</Header>
				{this.props.children}
				</View>
			);
		}

}
