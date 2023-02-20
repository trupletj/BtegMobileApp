import {
  StyleSheet,
  ScrollView,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Text, Layout, Divider, Card } from "@ui-kitten/components";
import React from "react";
import { useAppState } from "../../hooks/useAppState";
// import services from "./services.json";
import { useNavigation } from "@react-navigation/native";
import { REACT_APP_BASE_URL } from "@env";
import Iconizer from "components/Iconizer";

const ServiceList = ({ services }) => {
  const navigation = useNavigation();

  return (
    <>
      <ScrollView>
        <Layout style={styles.container}>
          {services.map((service, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() =>
                  navigation.navigate("ServiceMiddle", {
                    service,
                  })
                }
              >
                <View style={styles.square}>
                  {/* <Image
                    source={`${REACT_APP_BASE_URL}/${service.logo}`}
                  ></Image> */}
                  {/* <Iconizer iconType={_.iconType} size={36} color="white" /> */}
                  <Text style={{ fontSize: 10, textAlign: "center" }}>
                    {service.name}
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
