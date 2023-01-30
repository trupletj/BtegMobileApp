import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
} from "@ui-kitten/components";
import HomeScreen from "screens/HomeScreen/HomeScreen";
import { useAuth } from "hooks/auth";
import ProfileScreen from "screens/ProfileScreen/ProfileScreen";
import ServiceScreen from "screens/ServiceScreen/ServiceScreen";
import RequistScreen from "screens/RequistScreen/RequistScreen";

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => {
  const { user } = useAuth();

  return (
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
};

const AppTabScreen = () => {
  return (
    <Layout style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Navigator
          screenOptions={{
            headerShown: false,
          }}
          tabBar={(props) => <BottomTabBar {...props} />}
        >
          <Screen name="Home" component={HomeScreen} />
          <Screen name="Servie" component={ServiceScreen} />
          <Screen name="Requist" component={RequistScreen} />
          <Screen name="Profile" component={ProfileScreen} />
        </Navigator>
      </SafeAreaView>
    </Layout>
  );
};

export default AppTabScreen;
