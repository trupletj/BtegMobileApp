import { View, StyleSheet } from "react-native";
import React from "react";
import { Card, Layout, List, Text } from "@ui-kitten/components";
//Navigation

//Screens

//Components
import Category from "components/Categories/Category";
import SearchBar from "components/SearchBar/SearchBar";
import ServiceList from "components/Services/ServiceList";
const ServiceScreen = () => {
  return (
    <Layout style={styles.container} level="4">
      <Category />
      <SearchBar />
      <ServiceList />
    </Layout>
  );
};

export default ServiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  buttonStyle: {
    marginVertical: 10,
  },
});
