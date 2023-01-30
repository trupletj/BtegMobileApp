import React from "react";
import { useAuth } from "hooks/auth";
import { useNetwork } from "hooks/useNetwork";
import CustomForm from "components/Services/CustomForm";
import { Layout, Text } from "@ui-kitten/components";
import { SafeAreaView, StyleSheet } from "react-native";

const HomeScreen = () => {
  const { user } = useAuth();
  const isConnected = useNetwork();
  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <Text>{isConnected ? "true" : "false"}</Text>
      <CustomForm />
    </Layout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
