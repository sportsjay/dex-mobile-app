import { StyleSheet } from "react-native";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Layout,
} from "@ui-kitten/components";
import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

interface TabBarProperties extends BottomTabBarProps {}

export default function TabBar(props: TabBarProperties) {
  const { state, navigation } = props;

  return (
    <Layout style={styles.root}>
      <BottomNavigation
        appearance="noIndicator"
        selectedIndex={state.index}
        onSelect={(index) => navigation.navigate(state.routeNames[index])}
        style={[styles.navigation]}
      >
        <BottomNavigationTab title="Home" icon={<Icon name="home-outline" />} />
        <BottomNavigationTab
          title="Exchange"
          icon={<Icon name="trending-up-outline" />}
        />
        <BottomNavigationTab
          title="Profile"
          icon={<Icon name="person-outline" />}
        />
      </BottomNavigation>
    </Layout>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  navigation: {
    paddingTop: 10,
    overflow: "hidden",
    borderRadius: 10,
  },
});
