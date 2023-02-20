import { Animated, View, StyleSheet } from "react-native";
import { Layout, Text } from "@ui-kitten/components/ui";
import React, { useState, useEffect } from "react";
import globals from "constants/globals";
import { useAppState } from "hooks/useAppState";
const SplashScreen = () => {
  const { progress, setIsAppReady } = useAppState();

  const animation = new Animated.Value(0);

  const width = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [progress, 1],
  });

  const load = () => {
    Animated.timing(animation, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      if (progress === 1) {
        setTimeout(() => {
          setIsAppReady(true);
        }, 1000);
      }
    });
  };

  useEffect(() => {
    load();
  }, [animation, progress]);

  const animatedStyles = { transform: [{ scaleX: width }] };

  return (
    <Layout style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.text} category="h1">
          {"globals.APP_NAME"}
        </Text>
        <Text style={styles.text} category="h4">
          {globals.APP_DESCRIPTION}
        </Text>
        <View style={styles.progressBarContainer}>
          <Animated.View style={[styles.progressBar, animatedStyles]} />
        </View>
      </View>
    </Layout>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
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
