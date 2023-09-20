import React from "react";
import { View, Animated, StyleSheet } from "react-native";
import data from "./QuizData";

/**Animate progressBar to move dynamically */
const ProgressBar = ({ progress }) => {
  const allQuestions = data;

  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ["0%", "100%"],
  });

  
  return (
    <View style={styles.progressBarContainer}>
      <Animated.View
        style={[
          {
            height: 5,
            borderRadius: 5,
            // backgroundColor: "#EDA276" + "90",
            backgroundColor: "#000",
            
          },
          {
            width: progressAnim,
          },
        ]}
      ></Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    width: "100%",
    height: 5,
    borderRadius: 5,
    backgroundColor: "#DFDFDF",
    marginBottom: 10,
  },
});
export default ProgressBar;