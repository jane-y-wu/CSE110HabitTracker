import React, { Component } from "react";
import { connect } from "react-redux";
import { Image, TouchableOpacity, Alert } from "react-native";
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
  Body
} from "native-base";

import styles from "./styles";
import firebase from "firebase";

import {db} from "../../backend/db";

import {auth } from "../../backend/db"
import DrawBar from "../DrawBar";

class ProfileSetting extends Component {
  state = {first: '', last:'', nfirst: '', nlast:''};
  static navigationOptions = {
    header: null
  };

    deleteAccount(password){
        var user = firebase.auth().currentUser;
        db.ref(firebase.auth().currentUser.uid).remove()
        user.reauthenticateAndRetrieveDataWithCredential(firebase.auth.EmailAuthProvider.credential(user.email, password))
        Alert.alert(
            'Delete Account',
            'Are you sure you want to delete your account? This cannot be undone.',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => firebase.auth().currentUser.delete() && this.props.navigation.navigate("Login")},
            ],
        )

    }

  componentDidMount(){
    db.ref(auth.currentUser.uid + '/First').on('value', (snap) =>
      this.setState({first:snap.val()})
    );
    db.ref(auth.currentUser.uid + '/Last').on('value', (snap) =>
      this.setState({last:snap.val()})
    );
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
            <Title>Profile Setting</Title>
          </Body>

        </Header>

        <Content padder>
          <TouchableOpacity
            style={{
              height: 120,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() => this.props.navigation.navigate("ProfileSetting")}
          >
            <Image
              style={{ height: 100, width: 100, borderRadius: 50}}
              source={require("../../../images/defaultProfilePic.png")}
            />
            <Text>Edit</Text>
          </TouchableOpacity>

          <List>
            <ListItem itemDivider>
                <Text>First Name: </Text>
                <Input
                  value = {this.state.nfirst}
                  placeholder={this.state.first}
                 onChangeText={(itemValue) => this.setState({nfirst: itemValue})}/>
            </ListItem>
            <ListItem itemDivider>
                <Text>Last Name: </Text>
                <Input
                  value = {this.state.nlast}
                  placeholder={this.state.last}
                  onChangeText={(itemValue) => this.setState({nlast: itemValue})} />
            </ListItem>
            <ListItem itemDivider>
              <TouchableOpacity>
                <Text
                onPress={() => this.props.navigation.navigate("PasswordChange")}>
                  Change Password</Text>
              </TouchableOpacity>
            </ListItem>

            <ListItem itemDivider>
                <Text
                    style={{color: 'red'}}
                    onPress={() => this.deleteAccount(this.state.password)}>
                    Delete Account: </Text>
                <InputGroup borderType='regular'>
                    <Input
                        onChangeText={(password) => this.setState({password})}
                        placeholder='Please Enter Your Password'/>
                </InputGroup>
            </ListItem>

          </List>
          <Button
            style={styles.btn}
            onPress={() => {
              db.ref(auth.currentUser.uid).update({
                First: this.state.nfirst,
                Last: this.state.nlast
              }).then(()=>Alert.alert("Update Sucessful"))
              this.setState({nfirst:'', nlast:''});
            }}
          >
            <Text>Save</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default ProfileSetting;