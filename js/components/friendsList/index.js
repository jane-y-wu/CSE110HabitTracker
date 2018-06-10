import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  List,
  ListItem,
  InputGroup,
  Input
} from "native-base";
import {
  View,
  Alert,
  ListView,
  Text,
} from "react-native";
import firebase from 'firebase';
import styles from "./styles";
import { db } from "../../backend/db";

class FriendsList extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      })
    };
  }
  static navigationOptions = {
    header: null
  };
  listenForItems(){
    db.ref(firebase.auth().currentUser.uid + '/Friends').on('value', (snap) => {
      let friends = [];
      snap.forEach((friend) => {
        friends.push({
          First: friend.val().First,
          Last: friend.val().Last,
          uid: friend.key
        })
      });

      this.setState({dataSource: this.state.dataSource.cloneWithRows(friends)});
    });
  }
  componentDidMount(){
    this.listenForItems();
  }
  render() {
    const { props: { name, index, list } } = this;
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
            <Icon name="ios-menu" />
          </Button>
          </Left>

          <Body>
            <Title>Friends List</Title>
          </Body>

          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("FindFriend")}
            >
              <Icon style= {{fontSize: 40}}   name="ios-person-add" />
            </Button>
          </Right>
        </Header>

        <Content padder>
          <View style={styles.container}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this._renderItem.bind(this)}
            />
          </View>
        </Content>
      </Container>
    );
  }
  _renderItem(item){
      return (
        <Button
          full
          bordered
          onPress={() => this.props.navigation.navigate("FriendHabits", {friend: item.uid})}
        >
          <Text>{item.First} {item.Last}</Text>
        </Button>
      )
  }
}

export default FriendsList;
