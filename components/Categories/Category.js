import { StyleSheet, ScrollView } from "react-native";
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
              <Card key={i} style={styles.card} status="primary">
                <Text>{_.name}</Text>
              </Card>
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
    width: 150,
  },
});
