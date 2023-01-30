import React, { useState, useEffect } from "react";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { default as theme } from "./custom-theme.json";
import { default as mapping } from "./mapping.json";
import { StyleSheet, StatusBar } from "react-native";
import Navigation from "./navigation/Navigation";

import { ProvideAuth } from "./hooks/auth";
import { SafeAreaView } from "react-native-safe-area-context";

function App() {
  return (
    <ProvideAuth>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.dark, ...theme }}
        // customMapping={mapping}
      >
        <Layout style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="black" />

          <Navigation />
        </Layout>
      </ApplicationProvider>
    </ProvideAuth>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
