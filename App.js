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

function App() {
  return (
    <ProvideAuth>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.dark, ...theme }}
        // customMapping={mapping}
      >
        <StatusBar barStyle="dark-content" />
        <Navigation />
      </ApplicationProvider>
    </ProvideAuth>
  );
}

export default App;
