import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Layout, Text } from "@ui-kitten/components";

import LoginWithPhone from "screens/LoginWithPhone";
import LoginWithUser from "screens/LoginWithUser";
import LoginConfirmPhone from "screens/LoginConfirmPhone";

const Stack = createNativeStackNavigator();

const LoginStackScreen = () => {
  return (
    <Layout style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginWithPhone" component={LoginWithPhone} />
        <Stack.Screen name="LoginConfirmPhone" component={LoginConfirmPhone} />
        <Stack.Screen name="LoginWithUser" component={LoginWithUser} />
      </Stack.Navigator>
    </Layout>
  );
};

export default LoginStackScreen;
