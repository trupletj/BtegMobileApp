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
  const { services, categories } = useAppState();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [filteredServices, setFilteredServices] = useState(services);
  useEffect(() => {
    // Filter services based on the selected category and search input value
    let updatedServices = services;

    if (selectedCategoryId) {
      updatedServices = updatedServices.filter(
        (service) => service.category_id === selectedCategoryId
      );
    }

    if (searchInputValue) {
      updatedServices = updatedServices.filter((service) =>
        service.name.toLowerCase().includes(searchInputValue.toLowerCase())
      );
    }

    setFilteredServices(updatedServices);
  }, [selectedCategoryId, searchInputValue, services]);

  const handleCategorySelect = (id) => {
    setSelectedCategoryId(id);
  };

  const handleSearchInputChange = (value) => {
    setSearchInputValue(value);
  };

  return (
    <Layout style={styles.container} level="2">
      <SearchBar value={searchInputValue} onChange={handleSearchInputChange} />
      <Category
        categories={categories}
        handleCategorySelect={handleCategorySelect}
        selectedCategoryId={selectedCategoryId}
      />
      <Divider style={styles.divider} />
      <Text style={{ margin: 10 }}>Үйлчилгээний жагсаалт</Text>
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
