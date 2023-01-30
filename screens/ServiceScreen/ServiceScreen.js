import { View, StyleSheet } from "react-native";
import React from "react";
import { Card, Layout, List, Text } from "@ui-kitten/components";
import services from "./services.json";

const ServiceScreen = () => {
  const renderItem = ({ item, index }) => (
    <Card key={item.id} status="primary">
      <Text>{item.name}</Text>
    </Card>
  );
  return (
    <Layout style={styles.container}>
      <List data={services} renderItem={renderItem} />
    </Layout>
  );
};

export default ServiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    padding: 10,
  },
  buttonStyle: {
    marginVertical: 10,
  },
});
