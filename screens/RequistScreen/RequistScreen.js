import { SafeAreaView, StyleSheet } from "react-native";
import { Card, Layout, List, Text, Divider } from "@ui-kitten/components";

import React from "react";

const RequistScreen = () => {
  return (
    <Layout style={styles.container} level="2">
      <Divider style={styles.divider} />
    </Layout>
  );
};
export default RequistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonStyle: {
    marginVertical: 10,
  },
  divider: {
    marginVertical: 10,
  },
});
