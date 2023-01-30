import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppTabScreen from "./AppTabScreen";
import LoginStackScreen from "./LoginStackScreen";

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
    console.log(hasLoggedIn);
    checkIfHasLoggedIn();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {hasLoggedIn ? (
          <>
            <Stack.Screen name="AppTabScreen" component={AppTabScreen} />
            <Stack.Screen
              name="LoginStackScreen"
              component={LoginStackScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Welcome Screen" component={AppTabScreen} />
            <Stack.Screen
              name="LoginStackScreen"
              component={LoginStackScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
