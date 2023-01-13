import { View, Text } from "react-native";
import React from "react";
import { useAuth } from "../hooks/auth";
import { useNetwork } from "../hooks/useNetwork";
import CustomForm from "../screens/Services/Form";

const HomeStackScreen = () => {
  const { user } = useAuth();
  const isConnected = useNetwork();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{user?.salt}</Text>
      <Text>{isConnected ? "true" : "false"}</Text>
      <CustomForm />
    </View>
  );
};

export default HomeStackScreen;
