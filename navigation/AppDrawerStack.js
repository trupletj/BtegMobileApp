import { View, Text } from "react-native";
import React from "react";
import AppTabScreen from "./AppTabScreen";
import ProfileScreen from "screens/ProfileScreen/ProfileScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";

const DrawerStack = createDrawerNavigator();

const AppDrawerStack = () => {
  return (
    <DrawerStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <ProfileScreen {...props} />}
    >
      <DrawerStack.Screen name="AppTabScreen" component={AppTabScreen} />
    </DrawerStack.Navigator>
  );
};

export default AppDrawerStack;
