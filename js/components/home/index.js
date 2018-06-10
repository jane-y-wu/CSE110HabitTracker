import React, { Component } from "react";
import { connect } from "react-redux";
import ProfileSetting from "../profileSetting";
import FindFriend from "../findFriend";
import FriendsList from "../friendsList";
import DrawBar from "../DrawBar";
import { DrawerNavigator, NavigationActions } from "react-navigation";
import {
  View,
  Alert,
  ListView,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  CheckBox
} from "native-base";
import { Grid, Row } from "react-native-easy-grid";

import { setIndex } from "../../actions/list";
import { openDrawer } from "../../actions/drawer";

import firebase from 'firebase';
import styles from "./styles";
import { db } from "../../backend/db";

class Home extends Component {
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
    db.ref(firebase.auth().currentUser.uid + '/Habits').on('value', (snap) => {
      let habits = [];
      snap.forEach((habit) => {
        habits.push({
          Habit: habit.key,
          description: habit.val().description,
          priority: habit.val().priority,
          privacy: habit.val().privacy,
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
            <Title>Home</Title>
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
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate("HabitSetting", {
              habitName: item.Habit,
              habitDescription: item.description,
              habitPriority: item.priority,
              habitPrivacy: item.privacy,
            }
            );
          }}
         >
          <Text>{item.Habit}</Text>
        </Button>
      )
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer())
  };
}
const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list
});

const HomeSwagger = connect(mapStateToProps, bindAction)(Home);
const DrawNav = DrawerNavigator(
  {
    Home: { screen: HomeSwagger },
    ProfileSetting: { screen: ProfileSetting },
    FriendsList: { screen: FriendsList }
  },
  {
    contentComponent: props => <DrawBar {...props} />
  }
);
const DrawerNav = null;
DrawNav.navigationOptions = ({ navigation }) => {
  DrawerNav = navigation;
  return {
    header: null
  };
};
export default DrawNav;
