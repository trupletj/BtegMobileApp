import { useEffect, useState } from "react";
import { useNetInfo } from "@react-native-community/netinfo";

export const useNetwork = () => {
  const netInfo = useNetInfo();
  const [isConnected, setIsConnected] = useState(netInfo.isConnected);

  useEffect(() => {
    setIsConnected(netInfo.isConnected);
  }, [netInfo]);

  return isConnected;
};
