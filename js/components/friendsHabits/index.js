import React, { Component } from "react";
import { connect } from "react-redux";
import ProfileSetting from "../profileSetting";
import FriendsList from "../friendsList";
import DrawBar from "../DrawBar";
import Home from "../home";
import { DrawerNavigator, NavigationActions } from "react-navigation";
import {
  View,
  Alert,
  ListView,
  TouchableOpacity,
  Text
} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";
import { Grid, Row } from "react-native-easy-grid";

import { setIndex } from "../../actions/list";
import { openDrawer } from "../../actions/drawer";

import firebase from 'firebase';
import styles from "./styles";
import { db } from "../../backend/db";

class FriendHabits extends Component {
  static navigationOptions = {
    header: null
  };
  static propTypes = {
    name: React.PropTypes.string,
    setIndex: React.PropTypes.func,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func
  };

  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }

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
    db.ref(this.props.navigation.getParam('friend', '0') + '/Habits').on('value', (snap) => {
      let habits = [];
      snap.forEach((habit) => {
        if(habit.val().privacy === false){
          habits.push({
            Habit: habit.key,
            priority: habit.val().priority,
            _key: habit.key
          });
        };
      });

      this.setState({dataSource: this.state.dataSource.cloneWithRows(habits)});
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
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>

          <Body>
            <Title>Friends Habits</Title>
          </Body>

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
          onPress={() => Alert.alert(item.Habit)}
        >
          <Text>{item.Habit}</Text>
        </Button>
      )
  }
}

export default FriendHabits;
