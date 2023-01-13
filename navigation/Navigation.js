import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeStackScreen from "./HomeStackScreen";
import ProfileStackScreen from "./ProfileStackScreen";

const Tab = createMaterialBottomTabNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconColor = focused ? "#fff" : "#7367f0";
            let iconSize = focused ? 30 : 25;
            if (route.name === "HomeStack") {
              iconName = focused ? "home" : "home";
            } else if (route.name === "ProfileStack") {
              iconName = focused ? "account" : "account-outline";
            }
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={30}
                color={iconColor}
              />
            );
          },
          tabBarColor: "#7367f0",
          tabBarLabel: "",
        })}
        activeColor="#fff"
        inactiveColor="#f0f0f0"
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStackScreen}
          options={{ tabBarLabel: "" }}
        />
        <Tab.Screen
          name="ProfileStack"
          component={ProfileStackScreen}
          options={{ tabBarLabel: "" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
