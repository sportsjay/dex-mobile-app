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
  Spinner,
  Text,
} from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { Observer } from "mobx-react-lite";
import {
  useOrderContext,
  useRootContext,
  useUserContext,
  WalletAmount,
} from "../../stores";

const fromTokenList = ["MTA", "MTB", "MTC", "MTD"];

const toTokenList = ["MTA", "MTB", "MTC", "MTD"];

export default function ExchangeScreen() {
  return (
    <Observer>
      {() => {
        const { isLoading } = useRootContext();
        const { createOrder, getRate, exchange } = useOrderContext();
        const { account, balances } = useUserContext();

        const [fromTokenIdx, setFromTokenIdx] = useState<IndexPath>(
          new IndexPath(0)
        );
        const [toTokenIdx, setToTokenIdx] = useState<IndexPath>(
          new IndexPath(0)
        );

        const [fromAmount, setFromAmount] = useState("0");
        const [toAmount, setToAmount] = useState("0");
        const [_balances, _setBalances] = useState<WalletAmount>(balances);

        useEffect(() => {
          _setBalances(balances);
        }, [balances, account]);

        async function onChangeFromIdx(index: IndexPath | IndexPath[]) {
          const idx = index as IndexPath;
          setFromTokenIdx(idx);
          const _exchange = await getRate({
            from: fromTokenList[idx.row],
            to: toTokenList[toTokenIdx.row],
          });

          const fromVal = parseFloat(toAmount) * _exchange.scale;
          setFromAmount(fromVal.toString());
        }

        async function onChangeToIdx(index: IndexPath | IndexPath[]) {
          const idx = index as IndexPath;
          setToTokenIdx(idx);
          const _exchange = await getRate({
            from: fromTokenList[fromTokenIdx.row],
            to: toTokenList[idx.row],
          });

          const fromVal = parseFloat(fromAmount) / _exchange.scale;
          setToAmount(fromVal.toString());
        }

        function onChangeFromAmount(amount: string) {
          setFromAmount(amount);
          if (exchange) {
            const toVal = parseFloat(amount) / exchange.scale;
            setToAmount(toVal.toString());
          }
        }

        function onChangeToAmount(amount: string) {
          setToAmount(amount);
          if (exchange) {
            const fromVal = parseFloat(amount) * exchange.scale;
            setFromAmount(fromVal.toString());
          }
        }

        async function onSubmit() {
          if (!account) return;

          await createOrder({
            symbolA: fromTokenList[fromTokenIdx.row],
            symbolB: toTokenList[toTokenIdx.row],
            amountB: parseInt(toAmount),
            issuer: account,
          });

          setFromAmount("0");
          setToAmount("0");
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
                    {_balances[fromTokenList[fromTokenIdx.row]]}{" "}
                    {fromTokenList[fromTokenIdx.row]}
                  </Text>
                  <Select
                    style={{ width: "100%" }}
                    selectedIndex={fromTokenIdx}
                    placeholder="Select a token"
                    value={fromTokenList[fromTokenIdx.row]}
                    size="large"
                    onSelect={onChangeFromIdx}
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
                    onSelect={onChangeToIdx}
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
                onPress={onSubmit}
                accessoryRight={<Icon name="swap-outline" />}
                accessoryLeft={isLoading ? <Spinner /> : <></>}
              >
                Exchange
              </Button>
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
