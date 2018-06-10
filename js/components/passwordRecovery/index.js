import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from 'firebase';
import { Alert } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Item,
  Input,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body
} from "native-base";
import styles from "./styles";

class PasswordRecovery extends Component {

  state = { email: ''};
  static navigationOptions = {
    header: null
  };


  handleButtonPress(data){
        var emailAddress = this.state.email;
        firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
          // Email sent.
          Alert.alert("Password Succesfully Reset");
        }).catch(function(error) {
          // An error happened.
        });
  }
  render() {
    const { props: { name, index, list } } = this;
    //String emailAddress = "user@example.com";

    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>

          <Body>
            <Title>Password Recovery</Title>
          </Body>

        </Header>

        <Content padder>
          <Item rounded style={styles.forms}>
            <Input placeholder='Email' onChangeText={(email) => this.setState({email})} />
          </Item>
          <Button
            style={styles.btn}
            onPress={() =>{
            this.handleButtonPress();
            this.props.navigation.navigate("Login");
            }
            }
          >
            <Text>Reset Password</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default PasswordRecovery;
