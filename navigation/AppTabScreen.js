import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import ProfileStackScreen from "./ProfileStackScreen";
import HomeStackScreen from "./HomeStackScreen";
import ServicesStackScreen from "./ServicesStackScreen";
import RequistsStackScreen from "./RequistsStackScreen";
const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="HOME" />
    <BottomNavigationTab title="SERVICE" />
    <BottomNavigationTab title="REQUIST" />
    <BottomNavigationTab title="PROFILE" />
  </BottomNavigation>
);

const AppTabScreen = () => {
  return (
    <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Screen name="Home" component={HomeStackScreen} />
      <Screen name="Servie" component={ServicesStackScreen} />
      <Screen name="Requist" component={RequistsStackScreen} />
      <Screen name="Profile" component={ProfileStackScreen} />
    </Navigator>
  );
};

export default AppTabScreen;
