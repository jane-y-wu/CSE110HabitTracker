import React, { Component } from "react";
import Home from "../components/home/";
import ProfileSetting from "../components/profileSetting";
import FindFriend from "../components/findFriend";
import { DrawerNavigator } from "react-navigation";
import DrawBar from "../components/DrawBar";
import FriendsList from "../components/friendsList";
export default (DrawNav = DrawerNavigator(
  {
    Home: { screen: Home },
    ProfileSetting: { screen: ProfileSetting},
    FriendsList: { screen: FriendsList}
  },
  {
    contentComponent: props => <DrawBar {...props} />
  }
));
