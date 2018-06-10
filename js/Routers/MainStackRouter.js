import React, { Component } from "react";
import Login from "../components/login/";
import Signup from "../components/signup/";
import Home from "../components/home/";
import BlankPage from "../components/blankPage";
import ProfileSetting from "../components/profileSetting";
import PasswordRecovery from "../components/passwordRecovery";
import PasswordChange from "../components/passwordChange";
import FindFriend from "../components/findFriend";
import HabitSetting from "../components/habitSetting";
import HabitAdd from "../components/habitAdd";
import SummaryChart from "../components/summaryChart/";
import HomeDrawerRouter from "./HomeDrawerRouter";
import FriendsList from "../components/friendsList";
import FriendHabits from "../components/friendsHabits";
import { StackNavigator } from "react-navigation";
import { Header, Left, Button, Icon, Body, Title, Right } from "native-base";
HomeDrawerRouter.navigationOptions = ({ navigation }) => ({
  header: null
});
export default (StackNav = StackNavigator({
  Login: { screen: Login },
  Signup: { screen: Signup },
  Home: { screen: Home },
  BlankPage: { screen: BlankPage },
  ProfileSetting: { screen: ProfileSetting },
  PasswordRecovery: { screen: PasswordRecovery },
  PasswordChange: { screen: PasswordChange },
  FindFriend: { screen: FindFriend },
  HabitSetting: { screen: HabitSetting },
  HabitAdd: { screen: HabitAdd },
  SummaryChart: { screen: SummaryChart },
  FriendsList: { screen: FriendsList },
  FriendHabits: { screen: FriendHabits }
}));
