import { StyleSheet } from "react-native";
import { Divider, Layout, Text, TopNavigation } from "@ui-kitten/components";
import React from "react";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";

export default function TopBar(props: BottomTabHeaderProps) {
  return (
    <React.Fragment>
      <Layout style={[styles.container]} level="2">
        <TopNavigation
          appearance="control"
          alignment="center"
          title={(evaProps) => (
            <Text {...evaProps} style={[evaProps?.style, styles.title]}>
              {props.route.name}
            </Text>
          )}
          //   accessoryLeft={renderBackAction}
          //   accessoryRight={renderRightActions}
        />
      </Layout>
      <Divider />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    minHeight: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
  },
});
