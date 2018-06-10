import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Alert,
  ListView,
  TouchableOpacity
} from "react-native";
import ProgressCircle from 'react-native-progress-circle';
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
  Separator
} from "native-base";

import styles from "./styles";
import firebase from 'firebase';
import { db } from "../../backend/db";

class Tab1 extends Component {
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
    db.ref(firebase.auth().currentUser.uid + '/Habits').on('value', (snap) => {
      let habits = [];
      snap.forEach((habit) => {
        habits.push({
          Habit: habit.key,
          priority: habit.val().priority,
          privacy: habit.val().privacy,
          counter: habit.val().counter,
          first: habit.val().firstDate,
          _key: habit.key
        })
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
        <Content padder>
          <Text style={{alignSelf: 'center'}}>
              Overall Progress
          </Text>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderItem.bind(this)}
          />
        </Content>
      </Container>
    );
  }
  _renderItem(item){
    var date1 = new Date();
    var date = date1.getDate();
    var total = date - item.first + 1;
    var ratio = (parseFloat(item.counter) / parseFloat(total)) * 100;
      return (
        <ListItem itemDivider style={{justifyContent: 'center', alignItems: 'center' }}>
          <Text>{item.Habit}            </Text>
            <ProgressCircle
              percent={ratio}
              radius={25}
              borderWidth={4}
              color="#F58329"
              shadowColor="#999"
              bgColor="#fff"
            >
              <Text style={{ fontSize: 16 }}>{item.counter}/{total}</Text>
            </ProgressCircle>
        </ListItem>
      )
  }
}

export default Tab1;
