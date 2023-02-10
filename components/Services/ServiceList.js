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
// import services from "./services.json";
import { useNavigation } from "@react-navigation/native";

import Iconizer from "components/Iconizer";

const ServiceList = ({ services }) => {
  const navigation = useNavigation();

  return (
    <>
      <ScrollView>
        <Layout style={styles.container}>
          {services.map((_, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() =>
                  navigation.navigate("ServiceMiddle", {
                    id: _.id,
                  })
                }
              >
                <View style={styles.square}>
                  {/* <Iconizer iconType={_.iconType} size={36} color="white" /> */}
                  <Text style={{ fontSize: 10, textAlign: "center" }}>
                    {_.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </Layout>
      </ScrollView>
    </>
  );
};

export default ServiceList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    gap: "2rem",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  square: {
    width: 80,
    height: 80,
    margin: 4,
    alignItems: "center",
    textAlign: "center",
  },
});
