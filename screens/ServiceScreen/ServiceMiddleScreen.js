import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { Layout, Text, Button } from "@ui-kitten/components";
//navigation
import { useNavigation } from "@react-navigation/native";

const ServiceMiddleScreen = ({ route }) => {
  const navigation = useNavigation();
  const { id } = route.params;
  const handleConfirm = () => {
    navigation.navigate("SingleServiceForm", { id });
  };

  return (
    <Layout style={{ flex: 1, width: "100%" }}>
      <SafeAreaView style={styles.container}>
        <Button status="success" onPress={() => handleConfirm()}>
          Хүсэлт
        </Button>
        <Layout>
          <Text category="h5">Үйлчилгээний тухай</Text>
          <Text>
            To use, wrap your top level view with a SafeAreaView with a flex: 1
            style applied to it. You may also want to use a background color
            that matches your application's design.
          </Text>
          <Text category="h5">Зөвлөгөө</Text>
          <Text>
            To use, wrap your top level view with a SafeAreaView with a flex: 1
            style applied to it. You may also want to use a background color
            that matches your application's design.
          </Text>
        </Layout>
      </SafeAreaView>
    </Layout>
  );
};

export default ServiceMiddleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
