import { FlatList, StyleSheet, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import React, { useCallback, useEffect, useState } from "react";
import TokenList from "./components/TokenList";
import { Observer } from "mobx-react-lite";
import { useTokenContext } from "../../stores";

interface HistoryTx {
  address: string;
  event: string;
  blockHash: string;
  returnValues: {
    from: string;
    to: string;
    value: string;
  };
}

export default function HomeScreen() {
  return (
    <Observer>
      {() => {
        const [token, setToken] = useState("MTA");
        const { getHistoryTx, getTx } = useTokenContext();

        const handleSetToken = useCallback(setToken, []);
        useEffect(() => {
          getTx(token);
        }, []);

        return (
          <Layout style={[styles.root]}>
            <TokenList onPressItem={handleSetToken} selected={token} />

            <View style={styles.balanceContainer}>
              <Layout style={styles.balanceCard} level="4">
                <View style={{ justifyContent: "center" }}>
                  <Text
                    style={{ fontWeight: "900", marginBottom: 10 }}
                    status="primary"
                    category="h4"
                  >
                    {token}
                  </Text>
                  <Text style={{ fontWeight: "800" }} category="s1">
                    Total in Circulation
                  </Text>
                  <Text
                    category="h5"
                    status="info"
                    style={{ fontWeight: "900" }}
                  >
                    10000 {token}
                  </Text>
                </View>
                <View
                  style={{ alignItems: "flex-end", justifyContent: "flex-end" }}
                >
                  <Text
                    style={{ fontWeight: "700" }}
                    category="label"
                    appearance="hint"
                  >
                    Last Updated:
                  </Text>
                  <Text
                    style={{ fontWeight: "900" }}
                    category="s1"
                    status="basic"
                  >
                    {new Date().toLocaleDateString()}
                  </Text>
                  <Text
                    style={{ fontWeight: "700" }}
                    category="s2"
                    appearance="hint"
                  >
                    Contract Address:
                  </Text>
                  <Text
                    style={{ fontWeight: "900" }}
                    category="s1"
                    status="basic"
                  >
                    Address
                  </Text>
                </View>
              </Layout>
            </View>

            <Layout style={styles.informationContainer}>
              <Text
                appearance="hint"
                style={{ fontWeight: "800", marginBottom: 10 }}
              >
                Transaction History
              </Text>
              <Layout style={styles.historyContainer} level="4">
                <FlatList<HistoryTx>
                  style={{ width: "100%", height: "100%" }}
                  data={getHistoryTx(token)}
                  ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                  keyExtractor={(item, idx) => item.blockHash}
                  renderItem={({ item }) => (
                    <Layout style={historyCardStyles.root} level="2">
                      <View style={historyCardStyles.descriptionContainer}>
                        <Text
                          appearance="hint"
                          style={{ fontWeight: "700" }}
                          category="label"
                        >
                          {new Date().toISOString()}
                        </Text>
                        <Text
                          style={{ fontWeight: "700", width: 120 }}
                          numberOfLines={1}
                          category="label"
                        >
                          {item.returnValues.from}
                        </Text>
                        <Text
                          style={{ fontWeight: "700", width: 120 }}
                          numberOfLines={1}
                          category="label"
                        >
                          {item.returnValues.to}
                        </Text>
                      </View>
                      <View style={historyCardStyles.amountContainer}>
                        <Text
                          style={{ fontWeight: "700", textAlign: "right" }}
                          category="s2"
                          status="info"
                        >
                          To: {"\n"}
                          {item.returnValues.value.substring(
                            0,
                            24 - item.returnValues.value.length
                          )}{" "}
                          {token}
                        </Text>
                      </View>
                    </Layout>
                  )}
                />
              </Layout>
            </Layout>
          </Layout>
        );
      }}
    </Observer>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingVertical: 10,
  },
  balanceContainer: {
    width: "100%",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  balanceCard: {
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  informationContainer: {
    flex: 3,
    marginHorizontal: 10,
    paddingBottom: 10,
  },
  historyContainer: {
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
});

const historyCardStyles = StyleSheet.create({
  root: {
    borderRadius: 10,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "100%",
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
  },
  descriptionContainer: {
    alignItems: "flex-start",
  },
  amountContainer: {
    alignItems: "flex-end",
  },
});
