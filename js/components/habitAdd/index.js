import React, { Component } from "react";
import { connect } from "react-redux";
import { Image, TouchableOpacity, Picker, Alert } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  InputGroup,
  Input, List, ListItem,
  Icon,
  Left,
  Right,
  Body,
  Switch
} from "native-base";

import firebase from 'firebase';
import { db } from '../../backend/db';

import styles from "./styles";


class HabitAdd extends Component {
  state = { name: '',
            description: '',
            priority: 'High',
            privacy: false};

  static navigationOptions = {
    header: null
  };

  addHabit(habit){
    var date1 = new Date();
    var day = date1.getDate();
    db.ref(firebase.auth().currentUser.uid +'/Habits/' + habit.name).set({
      description: habit.description,
      priority: habit.priority,
      privacy: habit.privacy,
      firstDate: day,
      counter: 0
    })
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
            <Title>Add a Habit</Title>
          </Body>

        </Header>

        <Content padder>
          <List>
            <ListItem itemDivider>
              <Text>Name: </Text>
              <Input
                placeholder='running, reading, time management, ...'
                onChangeText={(name) => this.setState({name})} />
            </ListItem>
            <ListItem itemDivider>
              <Text>Description: </Text>
              <Input
                placeholder='"Description of your habit"'
                onChangeText={(description) => this.setState({description})} />
            </ListItem>
            <ListItem itemDivider>
              <Text>Priority: </Text>
              <Picker
                selectedValue={this.state.priority}
                style={{ height: 50, width: 200 }}
                onValueChange={(itemValue) => this.setState({priority: itemValue})}>
                <Picker.Item label="Every Day" value="High" />
                <Picker.Item label="Every Other Day" value="Medium" />
                <Picker.Item label="Every Week" value="Low" />
              </Picker>
            </ListItem>

            <ListItem itemDivider>
              <Text>Private</Text>
              <Right>
                  <Switch
                    value={ this.state.privacy }
                    onValueChange={(value) => this.setState({privacy: value})}
                  />
              </Right>
            </ListItem>
          </List>

          <Button
            style={styles.btn}
            onPress={() => {
              this.addHabit(this.state);
              this.props.navigation.goBack();
            }}
          >
            <Text>Add</Text>
          </Button>

        </Content>
      </Container>
    );
  }
}

export default HabitAdd;
