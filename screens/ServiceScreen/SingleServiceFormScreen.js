import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import CustomForm from "components/Services/CustomForm.js";
import { Layout } from "@ui-kitten/components/ui";

const SingleServiceFormScreen = ({ route }) => {
  const { name, formFields } = route.params;
  return (
    <Layout style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <CustomForm formField={formFields} name={name} />
      </SafeAreaView>
    </Layout>
  );
};

export default SingleServiceFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
