import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Layout,
  Text,
  ListItem,
  List,
  Divider,
  Avatar,
} from "@ui-kitten/components";

const ProfileScreen = () => {
  const { logOut, user } = useAuth();
  const navigation = useNavigation();
  console.log(user);
  if (user)
    return (
      <Layout style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <Avatar source={require("assets/avatar.png")} />
          <ListItem title="ОВОГ" description={user.last_name} />
          <Divider />
          <ListItem title="НЭР" description={user.first_name} />
          <Divider />
          <ListItem title="АЛБАН ТУШААЛ" description={user.position_name} />
          <Divider />
          <ListItem title="ХЭЛТЭС" description={user.heltes_name} />
          <Divider />
          <ListItem title="АЛБА" description={user.department_name} />
          <Divider />

          <Button
            appearance="outline"
            status="danger"
            style={styles.buttonStyle}
            onPress={logOut}
          >
            LogOut
          </Button>
        </ScrollView>
      </Layout>
    );
  else
    return (
      <Layout style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <Button
            style={styles.buttonStyle}
            onPress={() => navigation.navigate("LoginWithPhone")}
          >
            Login
          </Button>
        </ScrollView>
      </Layout>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    padding: 10,
  },
  buttonStyle: {
    marginVertical: 10,
  },
});
