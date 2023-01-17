import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginStackScreen from "./LoginStackScreen";
import AppTabScreen from "./AppTabScreen";

const Stack = createNativeStackNavigator();
const Navigation = () => {
  const [hasLoggedIn, setHasLoggedIn] = useState(false);

  useEffect(() => {
    const checkIfHasLoggedIn = async () => {
      try {
        const value = await AsyncStorage.getItem("hasLoggedInKey");
        if (value === null) {
          setHasLoggedIn(false);
        } else {
          setHasLoggedIn(true);
        }
      } catch (error) {
        console.log("Error getting data from storage: ", error);
      }
    };
    checkIfHasLoggedIn();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!hasLoggedIn && (
          <Stack.Screen name="LoginStackScreen" component={LoginStackScreen} />
        )}
        <Stack.Screen name="AppTabScreen" component={AppTabScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
