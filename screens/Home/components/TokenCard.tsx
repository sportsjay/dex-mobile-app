import { StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Card, Layout, Text } from "@ui-kitten/components";
import { LineChart } from "react-native-chart-kit";

export interface TokenCardProperties {
  title: string;
  active: boolean;
  handleSelect: (token: string) => void;
}

const chartConfig = {
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(89, 139, 255, ${opacity})`,
  strokeWidth: 1, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: true, // optional
};

const data = {
  labels: ["January", "February", "March"],
  datasets: [
    {
      data: [20, 45, 28],
      strokeWidth: 1, // optional
    },
  ],
};

export default function TokenCard(props: TokenCardProperties) {
  const { title, active, handleSelect } = props;
  const [isActive, setIsActive] = useState(active);
  const handlePress = useCallback(() => handleSelect(title), [title, active]);

  useEffect(() => {
    setIsActive(active);
  }, [title, active]);

  return (
    <Card
      onPress={handlePress}
      style={styles.root}
      status={isActive ? "control" : "info"}
    >
      <View style={styles.content}>
        <View>
          <Text
            category="label"
            appearance="hint"
            status={isActive ? "control" : "info"}
          >
            {title}
          </Text>
        </View>
        <LineChart
          data={data}
          width={200}
          height={100}
          verticalLabelRotation={30}
          chartConfig={{
            ...chartConfig,
          }}
          bezier
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 300,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
