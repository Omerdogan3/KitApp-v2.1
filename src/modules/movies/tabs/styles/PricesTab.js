import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
		paddingTop: 20,
		paddingHorizontal: 16,
		paddingBottom: 25
  },

  card: {
		backgroundColor: 'white',
		borderRadius: 3,
		minHeight: 35,
		flexDirection: 'row',
    overflow: 'hidden',
		marginBottom: 5,
  },

  label: {
		color: 'black',
		fontSize: 18,
		fontWeight: '500',
		flex:1,
  },

  title: {
		color: 'white',
		fontSize: 22,
    fontWeight: '500',
		justifyContent: 'center',
		marginBottom: 5
	},
	
	button: {
		flex: 1
	},

  labelRow: {
		flexDirection: 'row',
    padding: 5,
		flexWrap: 'nowrap',
		flex: 1
	},

  viewButton: {
		justifyContent: 'center',
    padding: 10,
		borderRadius: 3,
		backgroundColor: '#EA0000',
		width: 100,
		height: 30,
    marginLeft: 5,
  },

  viewButtonText: {
		color: 'white'
	},


  
  
	overview: {
		marginBottom: 15
	},
	overviewText: {
		color: '#d2d2d2',
		fontSize: 14,
		paddingTop: 10,
		lineHeight: 22
	},

  
	value: {
		color: '#d2d2d2',
		fontSize: 14
	}

});

export default styles;