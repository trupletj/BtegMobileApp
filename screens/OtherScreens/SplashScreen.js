import { Animated, View, StyleSheet, Image } from "react-native";
import { Layout, Spinner, Text } from "@ui-kitten/components/ui";
import React, { useState, useEffect } from "react";
import globals from "constants/globals";
import { useAppState } from "hooks/useAppState";
const SplashScreen = () => {
  return (
    <Layout style={styles.container}>
      <View
        style={[
          styles.container,
          {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
          },
        ]}
      >
        <Image
          source={require("../../assets/logo.png")}
          style={{ width: 200, height: 200 }}
        />
      </View>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Spinner status="warning" />
      </View>
    </Layout>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: "#000",
    textAlign: "center",
  },
  progressBarContainer: {
    height: 10,
    width: 200,
    borderRadius: 5,
    backgroundColor: "#ccc",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: globals.COLOR.PRIMARY,
  },
});
