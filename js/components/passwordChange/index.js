import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left, List, ListItem, Input, InputGroup,
  Right,
  Body
} from "native-base";
import firebase from 'firebase';
import { verifyPassChange } from '../../backend/verifyPasswordChange';
import styles from "./styles";

class PasswordChange extends Component {
  state = {
    email: "",
    oldPass: "",
    newPass: "",
    confirmPass: ""
  }
  static navigationOptions = {
    header: null
  };

  verifyInfo() {

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
            <Title>Change Password</Title>
          </Body>

        </Header>

        <Content padder>
          <Text>Email</Text>
          <InputGroup borderType='regular'>
            <Input
              placeholder='Please Enter Your Email'
              onChangeText={(email) => this.setState({email})}/>
          </InputGroup>
          <Text>Old Password</Text>
          <InputGroup borderType='regular'>
            <Input
              placeholder='Please Enter Your Old Password'
              onChangeText={(oldPass) => this.setState({oldPass})}/>
          </InputGroup>
          <Text>New Password</Text>
          <InputGroup borderType='regular'>
            <Input
              placeholder='Please Enter Your New Password'
              onChangeText={(newPass) => this.setState({newPass})}/>
          </InputGroup>
          <Text>Confirm Password</Text>
          <InputGroup borderType='regular'>
            <Input
              placeholder='Please Confirm Your New Password'
              onChangeText={(confirmPass) => this.setState({confirmPass})}/>
          </InputGroup>

          <Button
            style={styles.btn}
            onPress={() => {
              verifyPassChange(this.state);
            }}
          >
            <Text>Confirm</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default PasswordChange;
