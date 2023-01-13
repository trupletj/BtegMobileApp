import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, StatusBar } from "react-native";
import Navigation from "./navigation/Navigation";

import GlobalErrorHandler from "./hooks/GlobalErrorHandler";

function App() {
  return (
    <GlobalErrorHandler>
      <SafeAreaProvider style={styles.root}>
        <StatusBar barStyle="dark-content" />
        <Navigation />
      </SafeAreaProvider>
    </GlobalErrorHandler>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F9FBFC",
  },
});
export default App;
