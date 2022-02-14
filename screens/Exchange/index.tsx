import { StyleSheet, View, TextInput } from "react-native";
import {
  Button,
  Divider,
  Icon,
  IndexPath,
  Input,
  Layout,
  Select,
  SelectItem,
  Text,
} from "@ui-kitten/components";
import React, { useState } from "react";

const fromTokenList = ["MTA", "MTB", "MTC", "MTD"];

const toTokenList = ["MTA", "MTB", "MTC", "MTD"];

export default function ExchangeScreen() {
  const [fromTokenIdx, setFromTokenIdx] = useState<IndexPath>(new IndexPath(0));
  const [toTokenIdx, setToTokenIdx] = useState<IndexPath>(new IndexPath(0));

  const [fromAmount, setFromAmount] = useState("0");
  const [toAmount, setToAmount] = useState("0");

  function onChangeFromAmount(amount: string) {
    setFromAmount(amount);
  }

  function onChangeToAmount(amount: string) {
    setToAmount(amount);
  }

  return (
    <Layout style={[styles.root]}>
      <Layout></Layout>

      <Layout level="2" style={styles.form}>
        <Text
          status="info"
          category="h4"
          style={{ fontWeight: "800", marginBottom: 40 }}
        >
          Swap Tokens
        </Text>
        <Divider style={{ width: "100%", marginVertical: 10 }} />
        <View style={styles.inputContainer}>
          <View
            style={{
              flex: 1,
              marginRight: 20,
            }}
          >
            <Text
              appearance="hint"
              category="label"
              style={{ width: "100%", marginBottom: 10 }}
            >
              from
            </Text>
            <Input
              onChangeText={onChangeFromAmount}
              value={fromAmount}
              size="large"
              keyboardType="decimal-pad"
              returnKeyType="done"
              placeholder="0.0"
            />
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Text
              category="label"
              appearance="hint"
              style={{ fontWeight: "800" }}
            >
              Balance:
            </Text>
            <Text
              category="h5"
              status="primary"
              style={{ fontWeight: "800", marginBottom: 10 }}
            >
              10000 {fromTokenList[fromTokenIdx.row]}
            </Text>
            <Select
              style={{ width: "100%" }}
              selectedIndex={fromTokenIdx}
              placeholder="Select a token"
              value={fromTokenList[fromTokenIdx.row]}
              size="large"
              onSelect={(index) => {
                setFromTokenIdx(index as IndexPath);
              }}
            >
              {fromTokenList.map((title, idx) => (
                <SelectItem title={title} key={title + idx.toString()} />
              ))}
            </Select>
          </View>
        </View>
        <Divider style={{ width: "100%", marginVertical: 10 }} />
        <Text
          appearance="hint"
          category="label"
          style={{ width: "100%", marginVertical: 10 }}
        >
          to
        </Text>
        <View style={styles.inputContainer}>
          <View style={{ flex: 1, marginRight: 20 }}>
            <Input
              size="large"
              keyboardType="decimal-pad"
              placeholder="0.0"
              returnKeyType="done"
              value={toAmount}
              onChangeText={onChangeToAmount}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Select
              style={{ width: "100%" }}
              selectedIndex={toTokenIdx}
              placeholder="Select a token"
              value={toTokenList[toTokenIdx.row]}
              size="large"
              onSelect={(index) => {
                setToTokenIdx(index as IndexPath);
              }}
            >
              {toTokenList.map((title, idx) => (
                <SelectItem title={title} key={title + idx.toString()} />
              ))}
            </Select>
          </View>
        </View>
        <Divider style={{ width: "100%", marginVertical: 10 }} />
        <Button
          size="medium"
          style={styles.submitButton}
          accessoryRight={<Icon name="swap-outline" />}
        >
          Exchange
        </Button>
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  form: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    width: "100%",
  },
  textInputContainer: {},
  buttonContainer: {},
  submitButton: {
    width: "100%",
    marginTop: 20,
  },
});
