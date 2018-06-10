import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Item,
  Input,
  Icon,
  Left,
  Right,
  Body,
  View
} from "native-base";
import { Field, reduxForm } from "redux-form";
import { setUser } from "../../actions/user";
import firebase from "firebase";
import { db } from "../../backend/db";
import { createUser } from "../../backend/createUser";
import { signIn } from "../../backend/signIn";
import {isLoggedIn} from "../../backend/isLoggedIn";
import styles from "./styles";

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

class Signup extends Component {
  static navigationOptions = {
    header: null
  };
  static propTypes = {
    setUser: React.PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      first: "",
      last: "",
      email: "",
      password: "",
    };
    this.renderInput = this.renderInput.bind(this);
  }

  handleButtonPress(data){
    createUser(this.state.email, this.state.password, this.state.first, this.state.last)
    .then((user) => {
        // Log in now
              db.ref(isLoggedIn()).set({
                  First: this.state.first,
                  Last: this.state.last

              });
              return signIn(this.state.email, this.state.password);
          })
    .catch((err) => {
        // Error
        Alert.alert(err.toString());
    });
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

        <Input
          placeholder={input.name === "email" ? "Email" : "Password"}
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

  render() {
    const { props: { name, index, list } } = this;
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>

          <Body>
            <Title>Sign Up</Title>
          </Body>

        </Header>

        <Content padder>
        <View style={styles.content}>
          <Item style={styles.forms}>
            <Input placeholder="email" onChangeText={(email) => this.setState({email})} />
          </Item>
          <Item style={styles.forms}>
            <Input placeholder="password" onChangeText={(password) => this.setState({password})} />
          </Item>
          <Item style={styles.forms}>
            <Input placeholder='First Name' onChangeText={(first) => this.setState({first})} />
          </Item>
          <Item style={styles.forms}>
            <Input placeholder='Last Name' onChangeText={(last) => this.setState({last})} />
          </Item>
        </View>
        <Button
          style={styles.btn}
          onPress={() => {
            this.handleButtonPress();
            this.props.navigation.navigate("Login");
          }}
        >
          <Text>Sign Up</Text>
        </Button>
        </Content>
      </Container>
    );
  }
}

const SignupSwag = reduxForm(
  {
    form: "test",
    validate
  },
  function bindActions(dispatch) {
    return {
      setUser: name => dispatch(setUser(name))
    };
  }
)(Signup);
SignupSwag.navigationOptions = {
  header: null
};

export default SignupSwag;
