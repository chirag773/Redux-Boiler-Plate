import React from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import { Provider } from "react-redux";
import store from "./store";
import * as Font from "expo-font";
import Navigation from "./src/navigation";
import { Block } from "./src/components";
import { useScreens } from "react-native-screens";
useScreens();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: true
    };
  }

  render() {
    return (
      <Provider store={store}>
        <Block style={styles.container}>
          <Navigation />
        </Block>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});