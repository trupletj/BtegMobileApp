import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useAppState } from "hooks/useAppState";
const SplashScreen = () => {
  const { isReady, setIsReady } = useAppState();
  const navigation = useNavigation();
  useEffect(() => {
    if (!isReady) {
      navigation.navigate("AppTabScreen");
    }
  }, [isReady, setIsReady]);
  return (
    <View>
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;
