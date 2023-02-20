import { SafeAreaView, StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import { Layout, Text, Button, List, Card } from "@ui-kitten/components";
//navigation
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import globals from "constants/globals";

const data = new Array(8).fill({
  title: "Item",
});

const ServiceMiddleScreen = ({ route }) => {
  const navigation = useNavigation();
  const { id } = route.params;
  const handleConfirm = () => {
    navigation.navigate("SingleServiceForm", { id });
  };

  const Header = (props) => (
    <View {...props}>
      <Text category="h6">Maldives</Text>
      <Text category="s1">By Wikipedia</Text>
    </View>
  );

  const Footer = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <TouchableOpacity
        style={{ marginLeft: 5 }}
        onPress={() => console.log("first")}
      >
        <AntDesign name="ellipsis1" size={24} color={globals.COLOR.PRIMARY} />
      </TouchableOpacity>
    </View>
  );
  const renderItem = ({ item, index }) => (
    <Card style={styles.card} header={Header} footer={Footer}>
      <Text>The Maldives, officially the Republic of Maldives</Text>
      <View style={styles.tableContainer}>
        <View style={styles.item}>
          <Text>Header</Text>
        </View>
        <View style={styles.item}>
          <Text>data</Text>
        </View>
      </View>
      <View style={styles.tableContainer}>
        <View style={styles.item}>
          <Text>Header</Text>
        </View>
        <View style={styles.item}>
          <Text>data</Text>
        </View>
      </View>
    </Card>
  );
  return (
    <Layout style={{ flex: 1, width: "100%" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Layout style={styles.container}>
          <List data={data} renderItem={renderItem} />
          <View style={styles.buttonGroup}>
            <TouchableOpacity status="success" onPress={() => handleConfirm()}>
              <AntDesign
                name="pluscircle"
                size={36}
                color={globals.COLOR.PRIMARY}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 5 }}
              status="success"
              onPress={() => console.log("first")}
            >
              <AntDesign
                name="questioncircle"
                size={36}
                color={globals.COLOR.PRIMARY}
              />
            </TouchableOpacity>
          </View>
        </Layout>
      </SafeAreaView>
    </Layout>
  );
};

export default ServiceMiddleScreen;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    padding: 10,
  },
  tableContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 5,
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  item: {
    width: "50%", // is 50% of container width
  },
  buttonGroup: {
    position: "absolute",
    bottom: 20,
    right: 20,
    flexDirection: "row",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    margin: 2,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  footerControl: {
    marginHorizontal: 2,
  },
});
