import React, { useState, useEffect } from "react";
import { StatusBar, StyleSheet } from "react-native";
import {
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
//navigation
import { useNavigation } from "@react-navigation/native";

//hooks
import { useAppState } from "hooks/useAppState";
import { useAuth } from "hooks/useAuth";
// Screens
import QrScreen from "screens/OtherScreens/QrScreen";
import NotificationScreen from "screens/OtherScreens/NotificationScreen";
import ProfileScreen from "screens/ProfileScreen/ProfileScreen";
import AppTabScreen from "./AppTabScreen";
import LoginConfirmPhone from "screens/LoginStack/LoginConfirmPhone";
import LoginWithPhone from "screens/LoginStack/LoginWithPhone";
import LoginWithUser from "screens/LoginStack/LoginWithUser";
import SingleServiceFormScreen from "screens/ServiceScreen/SingleServiceFormScreen";
import SingleServiceTableScreen from "screens/ServiceScreen/SingleServiceTableScreen";
import ServiceMiddleScreen from "screens/ServiceScreen/ServiceMiddleScreen";
//global
import globals from "constants/globals";
import { AntDesign } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const DrawerStack = createDrawerNavigator();

function AppDrawerStack() {
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
}

const Navigation = () => {
  const navigation = useNavigation();
  console.log(
    "navigation =========================",
    navigation.getCurrentRoute()
  );

  const { user, token } = useAuth();
  const BackIcon = (props) => (
    <AntDesign {...props} size={24} color={globals.COLOR.PRIMARY} name="left" />
  );
  const BackAction = () => (
    <TopNavigationAction onPress={() => navigation.goBack()} icon={BackIcon} />
  );
  return (
    <Layout style={styles.container}>
      <StatusBar barStyle="light-content" hidden={true} />
      <Layout level="4" style={{ paddingBottom: 5 }}></Layout>
      <Stack.Navigator
        screenOptions={{
          animationTypeForReplace: token ? "pop" : "push",
        }}
      >
        {/* {!hasLoggedIn && (
            <Stack.Group screenOptions={{ presentation: "modal" }}>
              <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            </Stack.Group>
          )} */}

        {!user || !token ? (
          <Stack.Group>
            <Stack.Screen
              name="LoginWithPhone"
              component={LoginWithPhone}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoginWithUser"
              component={LoginWithUser}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="LoginConfirmPhone"
              component={LoginConfirmPhone}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen
              options={{ headerShown: false }}
              name="AppDrawerStack"
              component={AppDrawerStack}
            />
            <Stack.Screen
              name="ServiceMiddle"
              component={ServiceMiddleScreen}
              options={{
                headerLeft: (props) => <BackAction {...props} />,
                headerTitle: "",
              }}
            />
            <Stack.Screen
              name="SingleServiceForm"
              component={SingleServiceFormScreen}
              options={{
                headerLeft: (props) => <BackAction {...props} />,
                headerTitle: "",
              }}
            />
            <Stack.Screen
              name="SingleServiceTable"
              component={SingleServiceTableScreen}
              options={{
                headerLeft: (props) => <BackAction {...props} />,
                headerTitle: "",
              }}
            />
          </Stack.Group>
        )}
        <Stack.Group>
          <Stack.Screen
            name="QrScreen"
            component={QrScreen}
            options={{
              headerLeft: (props) => <BackAction {...props} />,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="NotificationScreen"
            component={NotificationScreen}
            options={{
              headerLeft: (props) => <BackAction {...props} />,
              headerTitle: "",
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </Layout>
  );
};

export default Navigation;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
