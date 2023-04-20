import React, { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady] = useFonts({
    PlayfairDisplayRegular: require("./assets/fonts/Playfair_Display/static/PlayfairDisplay-Regular.ttf"),
    RobotoBold: require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    RobotoRegular: require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {/* <RegistrationScreen /> */}
      <LoginScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // fontFamily: "PlayfairDisplayRegular",
    fontSize: 250,
  },
  innerBox: {
    fontFamily: "PlayfairDisplayRegular",
    fontSize: 250,
  },
  text: {
    fontFamily: "RobotoRegular",
    // fontSize: 150,

  },
});
