import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginWithPhone from "screens/LoginWithPhone";
import LoginWithUser from "screens/LoginWithUser";
import LoginConfirmPhone from "screens/LoginConfirmPhone";

const Stack = createNativeStackNavigator();

const LoginStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginWithPhone" component={LoginWithPhone} />
      <Stack.Screen name="LoginConfirmPhone" component={LoginConfirmPhone} />
      <Stack.Screen name="LoginWithUser" component={LoginWithUser} />
    </Stack.Navigator>
  );
};

export default LoginStackScreen;
