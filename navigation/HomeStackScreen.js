import React from "react";
import { useAuth } from "hooks/auth";
import { useNetwork } from "hooks/useNetwork";
import CustomForm from "components/Services/CustomForm";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
} from "@ui-kitten/components";

const HomeStackScreen = () => {
  const { user } = useAuth();
  const isConnected = useNetwork();
  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{isConnected ? "true" : "false"}</Text>
      <CustomForm />
    </Layout>
  );
};

export default HomeStackScreen;
