import { View, Text } from "react-native";
import React from "react";
import { useAuth } from "../hooks/use-auth";

const HomeStackScreen = () => {
  const { user } = useAuth();
  return (
    <View style={{ flex: 1 }}>
      <Text>{user?.salt}</Text>
    </View>
  );
};

export default HomeStackScreen;
