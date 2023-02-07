import {
  StyleSheet,
  ScrollView,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Text, Layout, Divider, Card } from "@ui-kitten/components";
import React from "react";
import { useAppState } from "../../hooks/useAppState";

import { useNavigation } from "@react-navigation/native";

const ServiceList = () => {
  const navigation = useNavigation();
  const { services } = useAppState();

  return (
    <>
      <ScrollView>
        <Layout style={styles.container}>
          {services.map((_, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() => navigation.navigate("SingleServiceForm")}
              >
                <View style={styles.square}>
                  <Text>{_.name}</Text>
                </View>
              </TouchableOpacity>
            );
          })}

          {/* <View style={styles.square} />
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
          <View style={styles.square} /> */}
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
