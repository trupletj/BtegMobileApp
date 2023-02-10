import { View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Card, Layout, List, Text, Divider } from "@ui-kitten/components";
//Navigation

//hooks
import { useAppState } from "hooks/useAppState";

//Components
import Category from "components/Categories/Category";
import SearchBar from "components/SearchBar/SearchBar";
import ServiceList from "components/Services/ServiceList";

const ServiceScreen = () => {
  const [filteredServices, setFilterdServices] = useState([]);
  const { services } = useAppState();
  useEffect(() => {
    setFilterdServices(services);
  }, []);

  return (
    <Layout style={styles.container} level="2">
      <Divider style={styles.divider} />

      <Category />
      <Divider style={styles.divider} />

      <SearchBar />
      <Divider style={styles.divider} />

      <ServiceList services={filteredServices} />
    </Layout>
  );
};

export default ServiceScreen;

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
