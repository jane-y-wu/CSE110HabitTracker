
const React = require('react-native');

const { StyleSheet, Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;

export default{
  container: {
    backgroundColor: '#FBFAFA',
  },
  header: {
    backgroundColor: '#F58329',
  },

  content: {
    marginTop: 30
  },

  forms: {
    marginTop: 10,
    alignSelf: 'center',
    justifyContent: "center",
    alignItems: "center"
  },

  shadow: {
    flex: 1,
    width: null,
    height: null,
  },

  bg: {
    flex: 1,
    marginTop: deviceHeight / 1.75,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
  },

  input: {
    marginBottom: 20,
  },

  btn: {
    marginTop: 40,
    alignSelf: 'center',
    backgroundColor: '#F58329',
  },
};
