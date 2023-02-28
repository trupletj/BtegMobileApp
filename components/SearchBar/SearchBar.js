import { View, Text, StyleSheet } from "react-native";
import { Input, Layout } from "@ui-kitten/components";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import globals from "constants/globals";

const SearchBar = ({ value, onChange }) => {
  const renderIcon = (props) => (
    <AntDesign
      {...props}
      name="search1"
      size={20}
      color={globals.COLOR.PRIMARY}
    />
  );

  return (
    <Layout style={styles.container}>
      <Input
        style={styles.input}
        value={value}
        placeholder="Хайх..."
        accessoryLeft={renderIcon}
        onChangeText={onChange}
      ></Input>
    </Layout>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  input: {
    flex: 1,
  },
});
