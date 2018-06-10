import React, { Component } from "react";
import { connect } from "react-redux";
import { Image, TouchableOpacity } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body,
  List,
  ListItem,
  Input,
  View,
  Item,
  Toast
} from "native-base";

import {addFriend} from "../../backend/addFriend.js";
import styles from "./styles";
import firebase from 'firebase';

class FindFriend extends Component {
  state = { friendID: ''};
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      showToast: false
    }
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
            <Title>Find Friends</Title>
          </Body>
        </Header>

        <Content padder>
          <TouchableOpacity
            style={{
              height: 200,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
          <Image
            style={{ height: 100, width: 100, borderRadius: 50, justifyContent: "center",
            alignItems: "center"}}
            source={require("../../../images/friends.png")}
          />
          </TouchableOpacity>

          <List>
            <View style={styles.content}>
              <Item style={styles.forms}>
                <Input placeholder="Input your friend's ID!" onChangeText={(friendID) => this.setState({friendID})} />
              </Item>
            </View>
          </List>

          <Button
            style={styles.btn}
            onPress={() => {

            addFriend(this.state.friendID);
          }}
          >
          <Text>Add</Text>
          </Button>

          <Button style={styles.btn} onPress={()=> Toast.show({
              supportedOrientations: ['portrait','landscape'],
              text: <Text style={{color: 'white'}}>{firebase.auth().currentUser.uid}</Text>,
              position: 'bottom',
              buttonText: 'Hide'
            })}>
            <Text>Show UserID</Text>
          </Button>

        </Content>
      </Container>
    );
  }
}

export default FindFriend;
