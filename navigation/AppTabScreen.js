import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileStackScreen from "./ProfileStackScreen";
import { Text, View } from "react-native";
import HomeStackScreen from "./HomeStackScreen";
import ServicesStackScreen from "./ServicesStackScreen";
import RequistsStackScreen from "./RequistsStackScreen";

const Tab = createBottomTabNavigator();

const AppTabScreen = () => {
  return (
    <Tab.Navigator screenOptions={{ headerTitle: false }}>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Services" component={ServicesStackScreen} />
      <Tab.Screen name="Requist" component={RequistsStackScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
};

export default AppTabScreen;
