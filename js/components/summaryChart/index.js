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
  Tab,
  Tabs,
  View
} from "native-base";
//import { View, StyleSheet, Dimensions } from 'react-native';
//import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import styles from "./styles";
import Tab1 from './tab1';
import Tab2 from './tab2';

class SummaryChart extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <Container>
        <Header style={styles.header}>
        <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon name="ios-arrow-back" />
          </Button>
        </Left>
          
          <Body>
            <Title>Summary Chart</Title>
          </Body>
        </Header>
        <Content>
        <Tabs initialPage={1}>
          <Tab heading="Quick" tabStyle={styles.tab} textStyle={{color: 'white'}} activeTabStyle={styles.activeTab} activeTextStyle={{color: '#F58329'}}>
            <Tab1 />
          </Tab>
          <Tab heading="Detailed" tabStyle={styles.tab} textStyle={{color: 'white'}} activeTabStyle={styles.activeTab} activeTextStyle={{color: '#F58329'}}>
            <Tab2 />
          </Tab>
        </Tabs>
        </Content>
      </Container>
    );
  }
}

export default SummaryChart;
