import React, { useState, useEffect, useRef } from "react";
import { StyleSheet } from "react-native";

import { Text, View, Button, Platform } from "react-native";
//theme
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { default as theme } from "./custom-theme.json";
//components
import Navigation from "./navigation/Navigation";
//context
import { ProvideAuth } from "context/UserContext";
//navigations
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
//notificatioin

function App() {
  return (
    <ProvideAuth>
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </ApplicationProvider>
    </ProvideAuth>
  );
}

export default App;
