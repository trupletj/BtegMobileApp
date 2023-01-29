import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Layout,
} from "@ui-kitten/components";
import ProfileStackScreen from "./ProfileStackScreen";
import HomeStackScreen from "./HomeStackScreen";
import ServicesStackScreen from "./ServicesStackScreen";
import RequistsStackScreen from "./RequistsStackScreen";

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => {
  const CustomIcon = (props) => {
    return <Icon {...props} />;
  };
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab
        title="HOME"
        icon={<CustomIcon name="home-outline" />}
      />
      <BottomNavigationTab
        title="SERVICE"
        icon={<CustomIcon name="folder-outline" />}
      />
      <BottomNavigationTab
        title="REQUIST"
        icon={<CustomIcon name="file-text-outline" />}
      />
      <BottomNavigationTab
        title="PROFILE"
        icon={<CustomIcon name="person-outline" />}
      />
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
          <Screen name="Home" component={HomeStackScreen} />
          <Screen name="Servie" component={ServicesStackScreen} />
          <Screen name="Requist" component={RequistsStackScreen} />
          <Screen name="Profile" component={ProfileStackScreen} />
        </Navigator>
      </SafeAreaView>
    </Layout>
  );
};

export default AppTabScreen;
