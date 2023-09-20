import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
/**Initial Page for Sign up (Driver account or Rider account) */
const Welcome = ({ navigation }) => {
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(1));
  const [progress, setProgress] = useState(new Animated.Value(0));
  const startQuiz = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1900,
        useNativeDriver: false,
      }),
    ]).start();

    Animated.timing(progress, {
      toValue: 0 + 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setType('riders');
          navigation.navigate("SignUp", "riders");
          startQuiz();
        }}
        style={styles.btn}
      >
        <Text style={styles.btnText}>Rider</Text>
      </TouchableOpacity>
      <View style={styles.subContainer}>
        <Text style={styles.text}>or</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          setType('drivers');
          navigation.navigate("SignUp", "drivers");
          startQuiz();
        }}
        style={styles.btn}
      >
        <Text style={styles.btnText}>Driver</Text>
      </TouchableOpacity>
    </View>
  );
};

async function setType(type){
  await AsyncStorage.setItem('type', type);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItem: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 350,
    resizeMode: "contain",
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItem: "center",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#000",
  },
  btn: {
    backgroundColor: "#000",
    paddingHorizontal: 5,
    paddingVertical: 15,
    position: "relative",
    borderRadius: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  btnText: {
    fontSize: 25,
    fontWeight: '600',
    textAlign: "center",
    color: "#FFF",
  },
});
export default Welcome;