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

const Category = ({ categories, handleCategorySelect, selectedCategoryId }) => {
  return (
    <Layout style={styles.container} level="1">
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
        <View key={1231} style={styles.category}>
          <Card
            style={styles.card}
            status={selectedCategoryId === null ? "primary" : "basic"}
            onPress={() => handleCategorySelect(null)}
          >
            <Text category="label">БҮГД</Text>
          </Card>
        </View>
        {categories &&
          categories.map((_, i) => {
            return (
              <View key={i} style={styles.category}>
                <Card
                  style={styles.card}
                  status={selectedCategoryId === _.id ? "primary" : "basic"}
                  onPress={() => handleCategorySelect(_.id)}
                >
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
