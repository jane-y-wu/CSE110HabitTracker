import React from "react";
import { Alert, AppRegistry, Image, TouchableOpacity } from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon
} from "native-base";

import DrawerNav from "../home";
import { DrawerNavigator, NavigationActions } from "react-navigation";
import {signOut} from '../../backend/signOut';
import { db,auth } from "../../backend/db";


const routes = [{ val: "Home", label: "Home"},
                { val: "ProfileSetting", label: "Profile Setting"},
                { val: "FriendsList", label: "Friends"}];

export default class DrawBar extends React.Component {
  state = {first: '', last:''};
  static navigationOptions = {
    header: null
  };

  componentDidMount(){
    db.ref(auth.currentUser.uid + '/First').on('value', (snap) =>
      this.setState({first:snap.val()})
    );
    db.ref(auth.currentUser.uid + '/Last').on('value', (snap) =>
      this.setState({last:snap.val()})
    );
  }
  render() {
    return (
      <Container>
        <Content>

          <TouchableOpacity
          style={{
            height: 140,
            alignSelf: "stretch",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => this.props.navigation.navigate("ProfileSetting")}
          >
            <Image
            style={{ height: 100, width: 100, borderRadius: 50}}
            source={require("../../../images/defaultProfilePic.png")}
            />
            <Text>{this.state.first} {this.state.last}</Text>
          </TouchableOpacity>

          <List
          dataArray={routes}
          renderRow={data => {
            return (
              <ListItem
              button
              onPress={() => this.props.navigation.navigate(data.val)}
              >
              <Text>{data.label}</Text>
              </ListItem>
            );
          }}
          />
          <Button
            transparent
            onPress={() => {
            signOut();
            this.props.navigation.navigate("Login")}
            }
          >
            <Icon active name="power"/>
          </Button>
        </Content>
      </Container>
    );
  }
}
