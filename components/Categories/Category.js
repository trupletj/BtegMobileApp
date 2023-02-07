import { StyleSheet, ScrollView, View } from "react-native";
import {
  Layout,
  List,
  ListItem,
  ViewPager,
  Text,
  Card,
} from "@ui-kitten/components";
import React, { useEffect, useContext } from "react";
import axios from "axios";
import { REACT_APP_BASE_URL } from "@env";
import { useAuth } from "hooks/useAuth";
import { useAppState } from "../../hooks/useAppState";

const Category = () => {
  const { categories, isLoading } = useAppState();

  return (
    <Layout style={styles.container} level="1">
      <ScrollView horizontal={true}>
        {categories &&
          categories.map((_, i) => {
            return (
              <View key={i} style={styles.category}>
                <Card style={styles.card} status="primary"></Card>
                <Text category="label">{_.name}</Text>
              </View>
            );
          })}
      </ScrollView>
    </Layout>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 120,
  },
  card: {
    margin: 2,
    borderRadius: 50,
  },
  category: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
  },
});
