import React, { useState, useEffect } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { Layout } from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppTabScreen from "./AppTabScreen";
import LoginConfirmPhone from "screens/LoginStack/LoginConfirmPhone";
import LoginWithPhone from "screens/LoginStack/LoginWithPhone";
import LoginWithUser from "screens/LoginStack/LoginWithUser";

import { useAppState } from "hooks/useAppState";
import { useAuth } from "hooks/useAuth";
import WelcomeScreen from "screens/WelcomeScreen";

const Stack = createNativeStackNavigator();
const Navigation = () => {
  const { appIsReady, onLayoutRootView } = useAppState();
  const { hasLoggedIn } = useAuth();

  if (!appIsReady) {
    return null;
  }
  return (
    <Layout style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!hasLoggedIn && (
            <Stack.Group screenOptions={{ presentation: "modal" }}>
              <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            </Stack.Group>
          )}

          <Stack.Group>
            <Stack.Screen name="AppTabScreen" component={AppTabScreen} />
            <Stack.Screen name="LoginWithPhone" component={LoginWithPhone} />
            <Stack.Screen name="LoginWithUser" component={LoginWithUser} />
            <Stack.Screen
              name="LoginConfirmPhone"
              component={LoginConfirmPhone}
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
