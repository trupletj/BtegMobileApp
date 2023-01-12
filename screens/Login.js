import {
  View,
  Text,
  TextInput,
  useWindowDimensions,
  SafeAreaView,
  StyleSheet,
  Pressable,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import React, { useState } from "react";

import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledButton = styled(Pressable);
const StyledTextInput = styled(TextInput);

const FirstRoute = () => {
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("");

  const continueHandler = () => {
    alert("Newtreh");
  };
  return (
    <StyledView className="container h-full justify-center items-center flex flex-row">
      <StyledView className="container  justify-center bg-slate-300 items-center ">
        <StyledTextInput
          className="border-b-2 py-2"
          keyboardType="number-pad"
          maxLength={8}
          onChangeText={setPhone}
          placeholder="Utasnii dugaaraa oruulna uu"
        />
        <StyledTextInput
          className="border-b-2 py-2"
          keyboardType="number-pad"
          maxLength={8}
          onChangeText={setId}
          placeholder="Tsag burtgeliin dugaaraa oruulna uu"
        />
        <Pressable onPress={continueHandler}>
          <StyledText className="p-2 bg-green-400">Үргэлжлүүлэх</StyledText>
        </Pressable>
        {/* <StyledText className="text-slate-800 text-xl">
          Try resizing me! 🎉
        </StyledText> */}
      </StyledView>
    </StyledView>
  );
};

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const Login = () => {
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
  ]);
  const layout = useWindowDimensions();

  return (
    <SafeAreaView style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: "500",
  },
});

export default Login;
