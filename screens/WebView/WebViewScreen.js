import { View, Text, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import React from "react";

const WebViewScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView source={{ uri: "https://anket.bteg.mn/" }} />
    </SafeAreaView>
  );
};

export default WebViewScreen;
