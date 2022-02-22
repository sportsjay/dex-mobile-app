import { StyleSheet } from "react-native";
import {
  Divider,
  IndexPath,
  Layout,
  Select,
  SelectItem,
  Spinner,
  Text,
  TopNavigation,
} from "@ui-kitten/components";
import React, { useState } from "react";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { Observer } from "mobx-react-lite";
import { useRootContext, useUserContext } from "../../../stores";

export default function TopBar(props: BottomTabHeaderProps) {
  return (
    <Observer>
      {() => {
        const { account, accountList, selectAccount } = useUserContext();
        const [accountIdx, setAccountIdx] = useState<IndexPath | undefined>(
          undefined
        );

        const _leftAccessory = () => {
          return (
            <Observer>
              {() => {
                const { isLoading } = useRootContext();
                return <>{isLoading && <Spinner />}</>;
              }}
            </Observer>
          );
        };

        const _rightAccessory = () => {
          return (
            <Select
              style={{ width: "100%", maxWidth: 140 }}
              selectedIndex={accountIdx}
              placeholder="Select a token"
              value={account}
              size="large"
              onSelect={(index) => {
                const idx = index as IndexPath;
                setAccountIdx(idx);
                selectAccount(idx.row);
              }}
            >
              {accountList.map((account, idx) => (
                <SelectItem title={account} key={account + idx.toString()} />
              ))}
            </Select>
          );
        };

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
                accessoryLeft={_leftAccessory}
                accessoryRight={_rightAccessory}
              />
            </Layout>
            <Divider />
          </React.Fragment>
        );
      }}
    </Observer>
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
