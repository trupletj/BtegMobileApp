import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppState } from "hooks/useAppState";

const ErrorScreen = () => {
  const { error } = useAppState();
  return (
    <Layout style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <MaterialIcons name="error-outline" size={48} color="gray" />

      <Text
        category="h6"
        style={{
          color: "gray",
          marginVertical: 20,
        }}
      >
        Алдаа Гарлаа
      </Text>
      {error?.message && (
        <Text category="c2" status="danger">
          {error.message}
        </Text>
      )}
    </Layout>
  );
};

export default ErrorScreen;
