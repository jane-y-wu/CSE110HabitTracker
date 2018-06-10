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
  Left,
  Right,
  Body,
  List,
  ListItem,
} from "native-base";
import {
  View,
  Alert,
  ListView,
} from "react-native";
import firebase from 'firebase';
import styles from "./styles";
import { db } from "../../backend/db";

class Habit extends Component {
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
            <Title>Habits</Title>
          </Body>

          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("HabitAdd")}
            >
              <Icon name="ios-add" />
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
          <Button
            style={styles.btn}
            onPress={() => this.props.navigation.navigate("SummaryChart")}
          >
            <Text>Summary Chart</Text>
          </Button>
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

export default Habit;
