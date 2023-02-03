import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet } from "react-native";
//theme
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { default as theme } from "./custom-theme.json";
//components
import Navigation from "./navigation/Navigation";
//context
import { ProvideAuth } from "context/UserContext";

function App() {
  return (
    <ProvideAuth>
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <Navigation />
      </ApplicationProvider>
    </ProvideAuth>
  );
}

export default App;
