import { StyleSheet, ScrollView, View, FlatList } from "react-native";
import { Text, Layout, Divider, Card } from "@ui-kitten/components";
import React from "react";

const ServiceList = () => {
  return (
    <>
      <ScrollView>
        <Layout style={styles.container}>
          <View style={styles.square} />
          <View style={styles.square} />
          <View style={styles.square} />
          <View style={styles.square} />
          <View style={styles.square} />
          <View style={styles.square} />
          <View style={styles.square} />
          <View style={styles.square} />
          <View style={styles.square} />
          <View style={styles.square} />
          <View style={styles.square} />
          <View style={styles.square} />
          <View style={styles.square} />
          <View style={styles.square} />
          <View style={styles.square} />
          <View style={styles.square} />
          <View style={styles.square} />
          <View style={styles.square} />
          <View style={styles.square} />
          <View style={styles.square} />
        </Layout>
      </ScrollView>
    </>
  );
};

export default ServiceList;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7CA1B4",
    flex: 1,
    flexDirection: "row",
    gap: "2rem",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  square: {
    backgroundColor: "#7cb48f",
    width: 100,
    height: 100,
    margin: 4,
  },
});
