import { StyleSheet } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import React from "react";

export default function ProfileScreen() {
  return (
    <Layout style={[styles.root]}>
      <Text>Profile Screen</Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
