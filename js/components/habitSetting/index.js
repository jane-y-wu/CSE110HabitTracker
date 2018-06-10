import React, { Component } from "react";
import { Alert, Dimensions } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  CheckBox,
  Text,
  Button,
  InputGroup,
  Input, List, ListItem,
  Icon,
  Left,
  Right,
  Body,
  Switch,
  Picker
} from "native-base";
import styles from "./styles";
import firebase from 'firebase';
import { db } from '../../backend/db';

class HabitSetting extends Component {
  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    this.state = {
      name: params.habitName,
      description: params.habitDescription,
      priority: params.habitPriority,
      privacy: params.habitPrivacy,
      checked: false
    };
  }

  static navigationOptions = {
    header: null
  };

  setDate(habit) {
    var date1 = new Date();
    var day = date1.getDate();
    db.ref(firebase.auth().currentUser.uid + '/Habits/' + habit.name + '/Dates/' + day).set({
      track:true
    })
    db.ref(firebase.auth().currentUser.uid + '/Habits/' + habit.name + '/counter/').once('value', (snapshot)=>{
        currCount = snapshot.val();
        currCount += 1;
        db.ref(firebase.auth().currentUser.uid + '/Habits/' + habit.name).update({counter: currCount});
    });
  }

  editHabit(habit){
    db.ref(firebase.auth().currentUser.uid +'/Habits/' + habit.name).update({
      description: habit.description,
      priority: habit.priority,
      privacy: habit.privacy
    })
  }

  deleteHabit(habit){
      db.ref(firebase.auth().currentUser.uid +'/Habits').child(habit.name).remove(()=>{
          this.props.navigation.navigate("Home")
      })
  }

  completeHabit(habit){
      Alert.alert("Congrats!")

      db.ref(firebase.auth().currentUser.uid +'/Habits').child(habit.name).remove(()=>{
          this.props.navigation.navigate("Home")
      })
  }

  render() {

  var date1 = new Date();
  var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";
  var week = new Array();
  week[0] = "Sunday";
  week[1] = "Monday";
  week[2] = "Tuesday";
  week[3] = "Wednesday";
  week[4] = "Thursday";
  week[5] = "Friday";
  week[6] = "Saturday";
  var day = week[date1.getDay()];
  var n = month[date1.getMonth()];
  var date = date1.getDate();
  var dateVal = n + " " + date + ", " + day;

    return (
      <Container>
        <Header style={styles.header}>
          <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon name="ios-arrow-back" />
          </Button>
          </Left>
          <Body>
            <Title style={styles.title}>Habit Settings</Title>
          </Body>
          <Right>
          <Text style={styles.save} onPress={() => {
            this.editHabit(this.state);
            if(this.state.checked){
                this.setDate(this.state);
            }
            this.props.navigation.goBack();
          }}>
            Save</Text>
          </Right>
        </Header>
        <Text style={styles.habit}> {this.state.name}</Text>

        <Content padder>
          <List>
          <ListItem itemDivider>
            <Text>Description: </Text>
            <Input
              placeholder={this.props.navigation.getParam("habitDescription", "lol")}
              onChangeText={(desc) => this.setState({description: desc})} />
          </ListItem>
          <ListItem itemDivider>
            <Text>Priority: </Text>
            <Picker
              selectedValue={this.state.priority}
              style={{ height: 25, width: 200 }}
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
          <Title style={{color: 'black', marginTop: 30}}>Check Off</Title>
          <ListItem>
            <CheckBox checked={this.state.checked}
              onPress={ () => {
                this.setState({ checked: !this.state.checked });
              }}
            />
            <Body>
              <Text>{dateVal}</Text>
            </Body>
          </ListItem>
          <ListItem itemDivider>
            <Text
                style={{color: 'red'}}
                onPress={() => this.deleteHabit(this.state)}>Delete</Text>
          </ListItem>

          <ListItem itemDivider>
              <Text
                  style={{color: '#F58329'}}
                  onPress={() => this.completeHabit(this.state)}>Complete</Text>
          </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
export default HabitSetting;
