import { View, Text, TextInput, Button, Alert } from "react-native";
import React, { useState } from "react";

import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledButton = styled(Button);
const Login = () => {
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("");

  const loginHandler = () => {
    alert("dsf");
  };

  return (
    <StyledView className="container h-full justify-center items-center flex flex-row">
      <StyledView className="container  justify-center bg-slate-300 items-center ">
        <Text>
          {phone} - {id}
        </Text>
        <TextInput
          keyboardType="number-pad"
          maxLength={8}
          onChangeText={setPhone}
          placeholder="Utasnii dugaaraa oruulna uu"
        />
        <TextInput
          keyboardType="number-pad"
          maxLength={8}
          onChangeText={setId}
          placeholder="Tsag burtgeliin dugaaraa oruulna uu"
        />
        <StyledButton
          className="bg-red-500 p-2 border-3"
          title="Login"
          onPress={loginHandler}
        />
        <StyledText className="text-slate-800 text-xl">
          Try resizing me! 🎉
        </StyledText>
      </StyledView>
    </StyledView>
  );
};

export default Login;
