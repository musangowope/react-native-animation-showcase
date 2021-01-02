import React from "react";
import HomeScreen from "./screens";
import {
  useFonts,
  IndieFlower_400Regular,
} from "@expo-google-fonts/indie-flower";

const App = () => {
  let [fontsLoaded] = useFonts({
    IndieFlower_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }
  return <HomeScreen />;
};

export default App;
