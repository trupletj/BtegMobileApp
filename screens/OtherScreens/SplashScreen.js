import { Animated, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components/ui";
import React from "react";
import globals from "constants/globals";
const SplashScreen = () => {
  const a = 20;
  return (
    <Layout style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Layout
        style={{
          height: 6,
          width: 200,
          backgroundColor: globals.COLOR.BASIC,
          borderRadius: 5,
        }}
      >
        <Animated.View
          style={{
            width: `${a}%`,
            height: "100%",
            backgroundColor: globals.COLOR.PRIMARY,
          }}
        ></Animated.View>
      </Layout>
      <Text>Шинэчлэл татаж байна</Text>
    </Layout>
  );
};

export default SplashScreen;
