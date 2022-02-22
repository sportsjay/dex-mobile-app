import * as eva from "@eva-design/eva";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, ParamListBase } from "@react-navigation/native";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import TabBar from "./common/NavigationBar/TabBar";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
} from "@ui-kitten/components";
import React, { useState } from "react";
import TopBar from "./common/NavigationBar/TopBar";
import HomeScreen from "./screens/Home";
import ExchangeScreen from "./screens/Exchange";
import ProfileScreen from "./screens/Profile";
import { RootContext, rootStore } from "./stores";

export interface BottomTabNavigatorParam extends ParamListBase {
  Home: undefined;
  Exchange: undefined;
  Profile: undefined;
}

const BottomTabNavigator = createBottomTabNavigator<BottomTabNavigatorParam>();

export default function App() {
  return (
    <RootContext.Provider value={rootStore}>
      <React.Fragment>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.dark}>
          <NavigationView />
        </ApplicationProvider>
      </React.Fragment>
    </RootContext.Provider>
  );
}

function NavigationView() {
  return (
    <Layout style={styles.container}>
      <NavigationContainer>
        <BottomTabNavigator.Navigator
          tabBar={TabBar}
          screenOptions={{
            header: TopBar,
          }}
        >
          <BottomTabNavigator.Screen name="Home" component={HomeScreen} />
          <BottomTabNavigator.Screen
            name="Exchange"
            component={ExchangeScreen}
          />
          <BottomTabNavigator.Screen name="Profile" component={ProfileScreen} />
        </BottomTabNavigator.Navigator>
      </NavigationContainer>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
