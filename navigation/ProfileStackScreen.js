import { View, Text } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../hooks/auth";

import LoginWithPhone from "../screens/LoginWithPhone";
import LoginWithUser from "../screens/LoginWithUser";
import LoginConfirmPhone from "../screens/LoginConfirmPhone";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

const ProfileStackScreen = () => {
  const { user } = useAuth();

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        ) : (
          <>
            <Stack.Screen name="LoginWithPhone" component={LoginWithPhone} />
            <Stack.Screen
              name="LoginConfirmPhone"
              component={LoginConfirmPhone}
            />
            <Stack.Screen name="LoginWithUser" component={LoginWithUser} />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

export default ProfileStackScreen;
