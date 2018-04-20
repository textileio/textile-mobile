import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  image: {
    flexGrow: 1,
    alignSelf: 'center',
    margin: 20
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Biotif-Medium',
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 44,
    backgroundColor: Colors.brandBlue,
    borderColor: '#48BBEC',
    // marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
})
