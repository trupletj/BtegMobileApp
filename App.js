import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, StatusBar } from "react-native";
import Navigation from "./navigation/Navigation";

import { ProvideAuth } from "./hooks/auth";

function App() {
  return (
    <ProvideAuth>
      <SafeAreaProvider style={styles.root}>
        <StatusBar barStyle="dark-content" />
        <Navigation />
      </SafeAreaProvider>
    </ProvideAuth>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F9FBFC",
  },
});
export default App;
