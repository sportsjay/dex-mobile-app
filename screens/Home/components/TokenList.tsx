import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect } from "react";
import TokenCard from "./TokenCard";

export interface TokenListProperties {
  onPressItem: (token: string) => void;
  selected: string;
}

export default function TokenList(props: TokenListProperties) {
  const { onPressItem, selected } = props;

  useEffect(() => {
    return () => {};
  }, [selected]);

  const handlePress = useCallback(onPressItem, [selected]);

  const _renderItem: ListRenderItem<string> = ({ item }) => {
    return (
      <TokenCard
        title={item}
        active={selected === item}
        handleSelect={() => {
          handlePress(item);
        }}
      />
    );
  };

  return (
    <FlatList<string>
      style={styles.tokenListContainer}
      keyExtractor={(item, idx) => item + idx.toString()}
      data={["MTA", "MTB", "MTC"]}
      renderItem={_renderItem}
      extraData={selected}
      showsHorizontalScrollIndicator={false}
      ListHeaderComponent={() => <View style={{ width: 10 }} />}
      ListFooterComponent={() => <View style={{ width: 10 }} />}
      ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      horizontal
    />
  );
}

const styles = StyleSheet.create({
  tokenListContainer: {
    flex: 1,
    width: "100%",
  },
});
