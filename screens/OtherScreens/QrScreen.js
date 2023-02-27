import { View, Text } from "react-native";
import { Layout } from "@ui-kitten/components";
import React from "react";
import QRCode from "react-native-qrcode-svg";
import { COLOR } from "constants/globals";
import { useAuth } from "../../hooks/useAuth";

const QrScreen = () => {
  const { user } = useAuth();
  return (
    <Layout style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ backgroundColor: "white", padding: 10 }}>
        <QRCode
          size={200}
          color={COLOR.PRIMARY}
          value={user.twitter_user_id.toString()}
        />
      </View>
    </Layout>
  );
};

export default QrScreen;
