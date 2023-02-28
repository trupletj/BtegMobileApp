import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { Card, Layout, List, Text, Divider } from "@ui-kitten/components";
import { useCamera } from "../../hooks/useCamera";
import React from "react";

const CustomCamera = () => {
  const {
    permission,
    permissionAccess,
    type,
    takePhoto,
    camRef,
    Camera,
    imageUri,
  } = useCamera();
  if (permission === null || permission?.granted === false) {
    return (
      <View>
        <Text>Permission to access camera is required</Text>
        <TouchableOpacity onPress={() => permissionAccess()}>
          <Text>Access</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <Layout style={styles.container} level="2">
        <View style={styles.container}>
          <Camera
            ref={camRef}
            style={{ height: 200, width: 200 }}
            type={type}
          ></Camera>
          <TouchableOpacity onPress={() => takePhoto()}>
            <Text>Snap Photo</Text>
          </TouchableOpacity>
        </View>
        {imageUri && (
          <Image
            style={{ width: 200, height: 200 }}
            source={require("../../assets/logo.png")}
          />
        )}
      </Layout>
    );
  }
};

export default CustomCamera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonStyle: {
    marginVertical: 10,
  },
  divider: {
    marginVertical: 10,
  },
});
