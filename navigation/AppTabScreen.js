import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, TouchableOpacity, View } from "react-native";

//Contexts
import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  TopNavigation,
  Text,
  Avatar,
  TopNavigationAction,
} from "@ui-kitten/components";
import { MaterialIcons, Octicons } from "@expo/vector-icons";

//hook
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "hooks/useAuth";
//screens
import ServiceScreen from "screens/ServiceScreen/ServiceScreen";
import RequestScreen from "screens/RequestScreen/RequestScreen";
import globals from "constants/globals";

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => {
  return (
    <View style={{ position: "relative" }}>
      <View
        style={{
          position: "absolute",
          alignSelf: "center",
          bottom: 30,
          backgroundColor: globals.COLOR.PRIMARY,
          zIndex: 2,
          padding: 5,
          borderRadius: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("QrScreen")}>
          <MaterialIcons name="qr-code-2" size={36} color="white" />
        </TouchableOpacity>
      </View>
      <Layout>
        <BottomNavigation
          selectedIndex={state.index}
          onSelect={(index) => navigation.navigate(state.routeNames[index])}
        >
          <BottomNavigationTab
            title={() => (
              <Octicons
                name="apps"
                size={24}
                color={state.index === 0 ? globals.COLOR.PRIMARY : "gray"}
              />
            )}
          />

          <BottomNavigationTab
            title={() => (
              <Octicons
                name="checklist"
                size={26}
                color={state.index === 1 ? globals.COLOR.PRIMARY : "gray"}
              />
            )}
          />

          {/* <BottomNavigationTab title="REQUIST" />
      <BottomNavigationTab title="PROFILE" /> */}
        </BottomNavigation>
      </Layout>
    </View>
  );
};

const AppTabScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const renderTitle = (props) => (
    <TouchableOpacity
      style={styles.titleContainer}
      onPress={() => navigation.openDrawer()}
    >
      <Avatar style={styles.logo} source={require("assets/avatar.png")} />
      <Text {...props} style={{ fontWeight: "bold", fontSize: 16 }}>
        {user.last_name.charAt(0)}
        {"."}
        {user.first_name}
      </Text>
    </TouchableOpacity>
  );

  const EditIcon = (props) => (
    <TouchableOpacity onPress={() => navigation.navigate("NotificationScreen")}>
      <MaterialIcons
        name="notifications-none"
        size={24}
        color={globals.COLOR.PRIMARY}
      />
    </TouchableOpacity>
  );

  const renderRightActions = () => <TopNavigationAction icon={EditIcon} />;
  return (
    <Layout style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Layout level="4" style={{ paddingBottom: 5 }}>
          <TopNavigation
            title={renderTitle}
            // subtitle={(evaProps) => <Text {...evaProps}>Subtitle</Text>}
            accessoryRight={renderRightActions}
          />
        </Layout>
        <Navigator
          screenOptions={{
            headerShown: false,
          }}
          tabBar={(props) => <BottomTabBar {...props} />}
        >
          <Screen name="Service" component={ServiceScreen} />
          <Screen name="Request" component={RequestScreen} />
        </Navigator>
      </SafeAreaView>
    </Layout>
  );
};

export default AppTabScreen;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    marginHorizontal: 16,
  },
});
