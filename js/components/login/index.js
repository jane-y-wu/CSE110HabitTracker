import React, { Component } from "react";
import { Image, Alert } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Item,
  Input,
  Button,
  Icon,
  View,
  Text
} from "native-base";
import { Field, reduxForm } from "redux-form";
import { setUser } from "../../actions/user";
import styles from "./styles";
import { signIn } from '../../backend/signIn';
import { isLoggedIn } from '../../backend/isLoggedIn';
import { db,auth } from "../../backend/db";

//var FBLoginButton = require('./FBLoginButton');

const background = require("../../../images/logo.png");

console.ignoredYellowBox = [
    'Setting a timer'
]

const validate = values => {
  const error = {};
  error.email = "";
  error.password = "";
  var ema = values.email;
  var pw = values.password;
  if (values.email === undefined) {
    ema = "";
  }
  if (values.password === undefined) {
    pw = "";
  }
  if (ema.length < 8 && ema !== "") {
    error.email = "too short";
  }
  if (!ema.includes("@") && ema !== "") {
    error.email = "@ not included";
  }
  if (pw.length > 12) {
    error.password = "max 11 characters";
  }
  if (pw.length < 5 && pw.length > 0) {
    error.password = "Weak";
  }
  return error;
};

class Login extends Component {
  static propTypes = {
    setUser: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      last: "",
      email: "",
      password: "",
    };
    this.renderInput = this.renderInput.bind(this);
  }

  setUser(name) {
    this.props.setUser(name);
  }
  renderInput({
    input,
    label,
    type,
    meta: { touched, error, warning },
    inputProps
  }) {
    var hasError = false;
    if (error !== undefined) {
      hasError = true;
    }
    return (
      <Item error={hasError}>
        <Icon active name={input.name === "email" ? "person" : "unlock"} />
        <Input
          placeholder={input.name === "email" ? "EMAIL" : "PASSWORD"}
          {...input}
        />
        {hasError
          ? <Item style={{ borderColor: "transparent" }}>
              <Icon active style={{ color: "red", marginTop: 5 }} name="bug" />
              <Text style={{ fontSize: 15, color: "red" }}>{error}</Text>
            </Item>
          : <Text />}
      </Item>
    );
  }
  onClickLogIn(){
    signIn(this.state.email, this.state.password)
    .then((user) => {
        // Logged in successfully
        this.props.navigation.navigate("Home");
    })
    .catch((err) => {
        var code = err.code;
        switch (code) {
          case "auth/wrong-password":
            code = "Wrong Password"; break;
          case "auth/invalid-email":
            code = "Invalid Email"; break;
          case "auth/user-not-found":
            code = "User Not Found"; break;
          default: code = "Invalid Information";
        }
        Alert.alert(code);
    });
  }
  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Content style={styles.content}>
            <Image source={background} style={styles.shadow}>
              <View style={styles.bg}>
                <Item>
                  <Icon name='ios-person' style={{fontSize: 30}} />
                  <Input
                    autoCorrect={false}
                    placeholder="EMAIL"
                    value={this.setState.email}
                    onChangeText={(email) => this.setState({email})}
                  />
                </Item>
                <Item>
                  <Icon name="ios-unlock-outline" style={{fontSize: 30}}/>
                  <Input
                    secureTextEntry={true}
                    autoCorrect={false}
                    placeholder="PASSWORD"
                    value={this.setState.email}
                    onChangeText={(password) => this.setState({password})}
                  />
                </Item>
                <Text
                  style={{marginTop: 20}}
                  onPress={() => this.props.navigation.navigate("PasswordRecovery")}
                  >
                  Forgot Password?</Text>
                <Button
                  style={styles.btn}
                  onPress={() => this.onClickLogIn()}
                >
                  <Text>Login</Text>
                </Button>
                <Button
                  style={styles.btn2}
                  onPress={() => this.props.navigation.navigate("Signup")}
                >
                  <Text style={{color: 'black'}}>Signup</Text>
                </Button>
                <Button
                  style={styles.btn}
                  onPress={() => {
                    this.onClickLogIn();
                  }}
                >
                  <Text>Home</Text>
                </Button>
              </View>
            </Image>
          </Content>
        </View>
      </Container>
    );
  }
}
const LoginSwag = reduxForm(
  {
    form: "test",
    validate
  },
  function bindActions(dispatch) {
    return {
      setUser: name => dispatch(setUser(name))
    };
  }
)(Login);
LoginSwag.navigationOptions = {
  header: null
};
export default LoginSwag;
