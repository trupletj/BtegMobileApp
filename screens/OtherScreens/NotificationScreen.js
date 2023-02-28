import { Divider, List, ListItem, Text, Layout } from "@ui-kitten/components";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "hooks/useAuth";
import { fetchData } from "context/api";

const data = {
  prefix: "custom",
  getAllData: 1,
  modelName: "App\\Models\\Notification",
  relations: [],
  select: "*",
  filters: [],
  orders: [],
  globalSearch: [
    {
      field_name: "notifiable_id",
      filter_type: "=",
      filter_value: 1,
    },
    {
      field_name: "notifiable_type",
      filter_type: "=",
      filter_value: "App\\Models\\User",
    },
  ],
};

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const { token } = useAuth();
  useEffect(() => {
    getNotifications(data, token);
  }, []);
  const getNotifications = async (data, token) => {
    try {
      const response = await fetchData(data, token);
      setNotifications(response.data.records.data);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };
  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.title} `}
      description={`${item.body} ${index + 1}`}
    />
  );

  if (notifications.length === 0)
    return (
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Мэдэгдэл ирээгүй байна</Text>
      </Layout>
    );
  return (
    <Layout style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <List
          style={styles.container}
          data={notifications}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </Layout>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    maxHeight: 200,
  },
});
