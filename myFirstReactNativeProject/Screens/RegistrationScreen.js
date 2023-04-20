import React, { useState, useCallback } from "react";
import {
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const initialState = {
  login: "",
  email: "",
  password: "",
};

SplashScreen.preventAutoHideAsync();

const RegistrationScreen = () => {
  const [state, setState] = useState(initialState);
  // const [isReady, setIsReady] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);

  const { width, height } = useWindowDimensions();

  const [isReady] = useFonts({
    PlayfairDisplayRegular: require("../assets/fonts/Playfair_Display/static/PlayfairDisplay-Regular.ttf"),
    RobotoBold: require("../assets/fonts/Roboto/Roboto-Bold.ttf"),
    RobotoMedium: require("../assets/fonts/Roboto/Roboto-Medium.ttf"),
    RobotoRegular: require("../assets/fonts/Roboto/Roboto-Regular.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }
  // const showPassword = () => {
  //   setIsShowPassword(!isShowPassword);
  // };

  const keyboardHidden = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    // console.log(state);
  };

  const onRegister = () => {
    console.log(
      "New User login:",
      state.login,
      "New User email:",
      state.email,
      "password",
      state.password,
      state
    );
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHidden}>
      <ImageBackground
        style={styles.imageBG}
        source={require("../assets/images/photoBG.jpg")}
      >
        <View style={styles.container} onLayout={onLayoutRootView}>
          <View
            style={[
              styles.avatar,
              {
                transform: [{ translateY: -60 }, { translateX: -60 }],
              },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.addAvatarButton,
                { transform: [{ translateY: 81 }, { translateX: 14 }] },
              ]}
            >
              <Image
                source={
                  Platform.OS === "ios"
                    ? require("../assets/images/icons/union.png")
                    : require("../assets/images/icons/union.svg")
                }
                style={styles.iconAdd}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              ...styles.form,

              width: width - 16 * 2,
            }}
          >
            <View style={styles.header}>
              <Text style={styles.title}>Реєстрація</Text>
            </View>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View style={{ marginBottom: isShowKeyboard ? 170 : 0 }}>
                <TextInput
                  style={styles.input}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.login}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                  placeholder="Логін"
                  placeholderTextColor="#BDBDBD"
                />
                <TextInput
                  style={styles.input}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                  placeholder="Адреса електронної пошти"
                  placeholderTextColor="#BDBDBD"
                />
                <View>
                  <TextInput
                    style={styles.input}
                    onFocus={() => setIsShowKeyboard(true)}
                    value={state.password}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                    placeholder="Пароль"
                    placeholderTextColor="#BDBDBD"
                    secureTextEntry={isShowPassword}
                  />
                  <Pressable
                    onPress={() => {
                      setIsShowPassword(!isShowPassword);
                    }}
                    style={styles.showContainer}
                  >
                    <Text style={styles.textShowPass}>
                      {isShowPassword ? "Показати" : "Сховати"}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </KeyboardAvoidingView>
            <TouchableOpacity
              style={styles.btnRegister}
              activeOpacity={0.5}
              onPress={onRegister}
            >
              <Text style={styles.textRegister}>Зареєструватися</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.link}>
              <Text style={styles.textLink}>Вже маєте акаунт? Увійти</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  imageBG: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  container: {
    // position: 'relative',
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 78,
    justifyContent: "flex-end",
  },
  avatar: {
    position: "absolute",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    top: 0,
    left: "50%",
    borderRadius: 16,
  },
  addAvatarButton: {
    display: "flex",
    width: 25,
    height: 25,
    backgroundColor: "#FFFFFF",
    borderRadius: "50%",
    borderColor: "#FF6C00",
    borderStyle: "solid",
    borderWidth: 1,
    position: "absolute",
    top: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  iconAdd: {
    width: 13,
    height: 13,
  },
  form: {
    width: "100%",
    paddingTop: 92,
  },
  header: {
    marginBottom: 33,

    // lineHeight:
  },
  title: {
    textAlign: "center",
    fontFamily: "RobotoMedium",
    fontWeight: "500",
    fontSize: 30,
    color: "#212121",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 16,
    marginBottom: 16,
    fontFamily: "RobotoRegular",
    fontSize: 16,
    fontWeight: 400,
    color: "#212121",
    lineHeight: 18.75,
  },
  showContainer: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "transparent",
  },
  textShowPass: {
    fontSize: 16,
    color: "#1B4371",
    fontFamily: "RobotoRegular",
    fontWeight: 400,
  },
  btnRegister: {
    marginTop: 27,
    width: "100%",
    height: 50,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  textRegister: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    textAlign: "center",
    color: "#FFFFFF",
    fontFamily: "RobotoRegular",
    fontWeight: 400,
    fontSize: 16,
  },
  link: {
    marginTop: 16,
    width: "100%",
    justifyContent: "center",
  },
  textLink: {
    textAlign: "center",
    fontFamily: "RobotoRegular",
    fontWeight: 400,
    fontSize: 16,
    color: "#1B4371",
  },
});

export default RegistrationScreen;
