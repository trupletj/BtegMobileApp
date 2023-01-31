import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet } from "react-native";
//theme
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
//components
import Navigation from "./navigation/Navigation";
//context
import { ProvideAuth } from "context/UserContext";
import { ProvideAppState } from "context/AppStateContext";
//hook

function App() {
  return (
    <ProvideAuth>
      <ProvideAppState>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={{ ...eva.dark, ...theme }}
          // customMapping={mapping}
        >
          <Navigation />
        </ApplicationProvider>
      </ProvideAppState>
    </ProvideAuth>
  );
}

export default App;
