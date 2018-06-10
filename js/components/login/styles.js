const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

export default {
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,

  },
  content: {
    backgroundColor: '#FFFFFF',
  },
  shadow: {
    flex: 1,
    width: null,
    height: null,
  },
  bg: {
    flex: 1,
    marginTop: deviceHeight / 2.25,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    height: deviceHeight / 1.75,
  },
  input: {
    marginBottom: 20,
  },
  btn: {
    marginTop: 60,
    backgroundColor: '#F58329',
    alignSelf: 'center',
  },
  btn2: {
    marginTop: 20,
    borderWidth: 3,
    borderColor: '#F58329',
    backgroundColor: 'white',
    alignSelf: 'center',
  },
};
