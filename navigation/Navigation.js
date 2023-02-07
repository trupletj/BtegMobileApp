import React, { useState, useEffect } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
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
import SingleServiceFormScreen from "../screens/ServiceScreen/SingleServiceFormScreen";

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
  const { user, token } = useAuth();

  return (
    <Layout style={styles.container}>
      <StatusBar barStyle="light-content" hidden={true} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
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
              <Stack.Screen name="LoginWithPhone" component={LoginWithPhone} />
              <Stack.Screen name="LoginWithUser" component={LoginWithUser} />
              <Stack.Screen
                name="LoginConfirmPhone"
                component={LoginConfirmPhone}
              />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen name="AppDrawerStack" component={AppDrawerStack} />
              <Stack.Screen
                name="SingleServiceForm"
                component={SingleServiceFormScreen}
              />
            </Stack.Group>
          )}
          <Stack.Group>
            <Stack.Screen name="QrScreen" component={QrScreen} />
            <Stack.Screen
              name="NotificationScreen"
              component={NotificationScreen}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </Layout>
  );
};

export default Navigation;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
