import { ScrollView, Text } from "react-native";
import React from "react";
import DefaultButton from "../components/DefaultButton";
import { useAuth } from "../hooks/auth";

const ProfileScreen = () => {
  const { logOut, user } = useAuth();

  return (
    <ScrollView style={{ flex: 1 }}>
      <Text>{user.first_name}</Text>
      <Text>{user.last_name}</Text>
      {/* <Text>{JSON.stringify(user)}</Text> */}
      <Text>{user.position_name}</Text>
      <Text>{user.heltes_name}</Text>
      <Text>{user.department_name}</Text>
      <DefaultButton onPress={logOut} title="Гарах" />
    </ScrollView>
  );
};

export default ProfileScreen;
