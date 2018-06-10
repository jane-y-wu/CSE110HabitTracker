import React, { Component } from "react";
import { connect } from "react-redux";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import {
  Container,
  Arrow,
  Card,
  CardItem,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body
} from "native-base";
import { db } from "../../backend/db";
import firebase from 'firebase';
import styles from "./styles";
import { Alert, View } from "react-native";
class Tab2 extends Component {
  constructor(props){
    super(props);
    this.state = {
      daysHabits: [],
      dateStr: ""
    }
  }
  static navigationOptions = {
    header: null
  };
  
  getDaysHabits(parsedDay){
    var daysHabits = [];
    db.ref(firebase.auth().currentUser.uid + '/Habits').once('value', (snap) =>{
      snap.forEach((habit)=>{
        habitName = habit.key
        habitRef = habit.child("Dates");
        habitRef.forEach((date)=>{
          if(date.key == parsedDay){
            daysHabits.push(habitName);
          }
        });
      });
    });
    return daysHabits;
  }

  getParsedDay(day){
    var parsedDay = ""
    switch(day){
      case '2018-06-01':
          parsedDay = "1";
          break;
      case '2018-06-02':
          parsedDay = "2";
          break;
      case '2018-06-03':
          parsedDay = "3";
          break;
      case '2018-06-04':
          parsedDay = "4";
          break;
      case '2018-06-05':
          parsedDay = "5";
          break;
      case '2018-06-06':
          parsedDay = "6";
          break;
      case '2018-06-07':
          parsedDay = "7"
          break;
      case '2018-06-08':
          parsedDay = "8"
          break;
      case '2018-06-09':
          parsedDay = "9"
          break;
      case '2018-06-10':
          parsedDay = "10";
    }
    this.setState({dateStr: day});
    //this.state.dateStr = day;
    this.state.daysHabits = this.getDaysHabits(parsedDay);
  }
  render() {
    const { props: { name, index, list } } = this;
    return (
      <Container>
        <Card>
          <CardItem>
            <Body>
              <Calendar
                // Initially visible month. Default = Date()
                current={'2018-06-10'}
                
                // Handler which gets executed on day press. Default = undefined
                onDayPress={(day) => this.getParsedDay(day.dateString)}
                // Handler which gets executed on day long press. Default = undefined
                onDayLongPress={(day) => {console.log('selected day', day)}}
                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'MMM yyyy'}
                // Handler which gets executed when visible month changes in calendar. Default = undefined
                onMonthChange={(month) => {console.log('month changed', month)}}
                // Do not show days of other months in month page. Default = false
                hideExtraDays={true}
                // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                // day from another month that is visible in calendar page. Default = false
                disableMonthChange={true}
                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                firstDay={1}
                // Hide day names. Default = false
                hideDayNames={true}
                // Show week numbers to the left. Default = false
                showWeekNumbers={false}
                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                onPressArrowLeft={substractMonth => substractMonth()}
                // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                onPressArrowRight={addMonth => addMonth()}

                markedDates={{
                }}
                />
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <Body style={{justifyContent: 'center'}, {alignItems: 'center'}}>
              <Text style={{fontSize: 18}}>
                Habits completed on {this.state.dateStr}:
              </Text>
              <View>
                { this.state.daysHabits.map((item, key)=>(
                    <Text style={{fontSize:16}} key={key}> &#10003; { item } </Text>)
                )}
              </View>
            </Body>
          </CardItem>
        </Card>
      </Container>
    );
  }
}

export default Tab2;
