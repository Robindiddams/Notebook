import { StyleSheet } from 'react-native';


const btColor = '#007AFF'
const delColor = '#F93308'
const styles = {
	buttonColor: btColor,
	deleteColor:delColor,
	headerHeight:60,
	footerHeight:50,
	title: {
		fontWeight:'bold',
	},
	bigTitle: {
		fontWeight:'bold',
		fontSize:20
	},
	headerTitle: {
		fontSize:20
	},
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
		backgroundColor: 'transparent'
	},
	icon: {
		color: btColor,
		fontSize:28,
		paddingLeft: 5,
		paddingRight: 5
	},
	iconBigger: {
		color: btColor,
		fontSize:31,
		paddingLeft: 5,
		paddingRight: 5
	},
	bubbleButton: {
		justifyContent:'center',
		// borderColor:btColor,
		borderColor:'transparent',
		// backgroundColor:btColor,
		borderWidth: 2,
		borderRadius: 15,
		height: 50,
		padding: 5
	},
	swipedexMenu: {
		flex:1,
		flexDirection: 'column',
		height:150,
		width:300,
		padding:20,
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowOpacity: 0.3
	},
	card: {
		padding: 10,
		backgroundColor:'#ffffff',
		paddingBottom:0,
		alignItems:'center',
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowOpacity: 0.3
	},
	deckSelect: {
		height:140,
		width: 140, 
		margin:5,
	},
	innerDeckSelect: {
		height:140,
		width: 140, 
		margin:0,
		top:-5,
		left: -5,
		justifyContent:'center',
		alignItems:'center'
	},
	newDeckSelect:{
		borderWidth: 5,
		borderColor: '#F5F5F5',
		justifyContent: 'center',
		alignItems:'center',
		left:-5
	},
	li: {
		flexDirection:'row',
		justifyContent: 'space-between',
		alignItems:'center',
		// height: 50,
		borderBottomWidth: StyleSheet.hairlineWidth
	}
};

export default styles;
