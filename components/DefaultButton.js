import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

const DefaultButton = ({ onPress, title, type = "PRIMARY" }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.appButtonContainer, styles[`appButtonContainer_${type}`]]}
    >
      <Text style={[styles.appButtonText, styles[`appButtonText_${type}`]]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    width: "100%",
    elevation: 8,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 5,
  },
  appButtonContainer_PRIMARY: {
    backgroundColor: "#7367f0",
    borderColor: "#7367f0",
    borderWidth: 2,
  },
  appButtonContainer_SECONDARY: {
    borderColor: "#7367f0",
    borderWidth: 2,
    backgroundColor: "#F9FBFC",
  },
  appButtonContainer_TERTIARY: {},
  appButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "center",
  },
  appButtonText_PRIMARY: {
    color: "white",
  },
  appButtonText_SECONDARY: {
    color: "#7367f0",
  },
  appButtonText_TERTIARY: {
    color: "gray",
  },
});

export default DefaultButton;
