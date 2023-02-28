import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import CustomCamera from "components/Camera/CustomCamera";
import { Card, Layout, List, Text, Divider } from "@ui-kitten/components";

const RequestScreen = () => {
  return (
    <Layout style={styles.container} level="2">
      <CustomCamera />
    </Layout>
  );
};

export default RequestScreen;

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
