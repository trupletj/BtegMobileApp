import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import ProfileStackScreen from "./ProfileStackScreen";
import { Text, View, BlurView } from "react-native";
import HomeStackScreen from "./HomeStackScreen";
import ServicesStackScreen from "./ServicesStackScreen";
import RequistsStackScreen from "./RequistsStackScreen";
import globals from "../constants/globals";
import Icons from "../constants/Icons";
import Icon from "react-native-vector-icons/Ionicons";

const Tab = createMaterialBottomTabNavigator();

const TabArr = [
  {
    route: "Home",
    icon: "home",
    component: HomeStackScreen,
  },
  {
    route: "Service",
    icon: "home",
    component: ServicesStackScreen,
  },
  {
    route: "Requist",
    icon: "home",
    component: RequistsStackScreen,
  },
  {
    route: "Profile",
    icon: "home",
    component: ProfileStackScreen,
  },
];

const AppTabScreen = () => {
  return (
    <Tab.Navigator
      activeColor={globals.COLOR.PURPLE}
      inactiveColor="white"
      barStyle={{ backgroundColor: globals.COLOR.PURPLE }}
    >
      {TabArr.map((_, index) => {
        return (
          <Tab.Screen
            key={index}
            name={_.route}
            component={_.component}
            options={{
              tabBarLabel: "",
              tabBarBackground: () => <BlurView tint="light" intensity={100} />,
              tabBarIcon: ({ color }) => (
                <Icon name={_.icon} color={color} size={24} />
              ),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default AppTabScreen;
