import { StyleSheet } from "react-native";
import { Icon, Layout, Text } from "@ui-kitten/components";
import React from "react";

export default function ProfileScreen() {
  return (
    <Layout style={[styles.root]}>
      <Icon
        name="credit-card-outline"
        fill="#8F9BB3"
        style={{ width: 120, height: 120 }}
      />
      <Text>Name</Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
