import React from "react";
import { View, ActivityIndicator } from "react-native";

const LoadingSpinner = () => {
  return (
    <View>
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={{
          alignSelf: "center",
          marginTop: 20,
          marginBottom: 20,
        }}
      />
    </View>
  );
};

export default LoadingSpinner;
