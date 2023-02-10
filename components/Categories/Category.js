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
        <View key={1231} style={styles.category}>
          <Card style={styles.card} status="success">
            <Text category="label">БҮГД</Text>
          </Card>
        </View>
        {categories &&
          categories.map((_, i) => {
            return (
              <View key={i} style={styles.category}>
                <Card style={styles.card} status="primary">
                  <Text category="label">{_.name}</Text>
                </Card>
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
    paddingVertical: 10,
  },
  card: {
    margin: 2,
  },
  category: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
  },
});
