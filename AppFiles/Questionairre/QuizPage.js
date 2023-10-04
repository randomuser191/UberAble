/**Code adapted from https://github.com/n-bhasin/ReactNative-QuizApp */

import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  ScrollView,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import riderQuestions from "./RiderQuestions";
import ProgressBar from "./ProgressBar";
import Questions from "./QuestionsTest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DriverQuestions from "./DriverQuestions";
import RiderQuestions from "./RiderQuestions";

import Tesseract from "tesseract.js";

/**Page for Survey */
const QuizPage = ({ navigation, route }) => {
  var allQuestions; 
  if(route.params.type == "riders") allQuestions = RiderQuestions;
  else allQuestions = DriverQuestions;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(new Animated.Value(1));
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(1));

  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [options, setOptions] = useState([]); 
  const [fireToken, setFireToken] = useState([]);
  const [type, setType] = useState(''); 

  /**Move to Next Question */
  const handleNext = (option, navigation) => {
    if (currentQuestionIndex == allQuestions.length - 1) {
        setCurrentQuestionIndex(0);
      navigation.navigate("Result", { preferences: options, token: fireToken, type: type });
      
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
    }
    /**Animating Survey */
    Animated.parallel([
      Animated.timing(progress, {
        toValue: currentQuestionIndex + 2,
        delay: 500,
        duration: 1500,
        // duration: 5000,
        useNativeDriver: false,
      }),
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
        //   duration: 100,
          useNativeDriver: false,
          duration: 500,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
        //   duration: 3800,
          useNativeDriver: false,
        }),
      ]),
    ]).start();
  };
/**Set Preferences in Database */
useEffect(() => {
  async function getData(){
    setFireToken(await AsyncStorage.getItem("fireTok"));
    setType(await AsyncStorage.getItem('type'));
  };
  getData();
})
/**Logic for back button */
  const handlePrev = (navigation) => {
    if (currentQuestionIndex == 0) {
      navigation.navigate("Welcome");
    } else {
      setCurrentQuestionIndex(currentQuestionIndex-1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
    }
    Animated.parallel([
      Animated.timing(progress, {
        toValue: currentQuestionIndex,
        duration: 1500,
        delay: 500,
        useNativeDriver: false,
      }),
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
      ]),
    ]).start();
  };


  /**Render options for survey */
  const renderOptions = (navigation) => {
    return (
      <View style={{ marginTop: 30,}}>
        {allQuestions[currentQuestionIndex]?.options.map((option, index) => (
          <Animated.View
            key={index}
            style={{
              opacity: fadeAnim,
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [(150 / 4) * (index + 10), 0], 
                  }),
                },
              ],
            }}
          >
            <TouchableOpacity
            onPress={() => {
              setOptions(prevState => [...prevState, option]);
              console.log('set')
              handleNext(option, navigation);
            }}
              key={index}
              style={styles.optionsText}>
              <Text
                style={{
                  fontSize: 20,
                  color: "#FFF",
                  fontWeight: '600',
                  textAlign: "center",
                }}
              >
                {option}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    );
  };
  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator = {false}>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <ProgressBar progress={progress} />

          <Questions
          navigation={navigation}
            index={currentQuestionIndex}
            question={allQuestions[currentQuestionIndex]?.question}
            setData = {setOptions}
          />
        </View>
        {renderOptions(navigation)}
      </View>
        <TouchableOpacity
          style={[
            { ...styles.btnNext },
            {
              backgroundColor: !currentOptionSelected ? "#FFF" : "#000",
            },
          ]}
        //   disabled={!currentOptionSelected}
          onPress={() => handlePrev(navigation)}
        //   onPress={() => handleNext(navigation)}
        >
          <Text style={styles.btnNextText}>BACK</Text>
        </TouchableOpacity>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  scrollView: { backgroundColor: "#fff" },
  container: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: '#FFF',
    alignItems: 'center'
  },
  subContainer: {
    width: '95%',
    marginTop: '20%',
    padding: 40,
    borderRadius: 10,
    backgroundColor: '#FFF'
  },
  optionsText: {
    height: 70,
    width: 300,
    backgroundColor: '#000',
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    paddingHorizontal: 30,
    marginVertical: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  btnNext: {
    borderRadius: 10,
    backgroundColor: "#000",
    alignSelf: 'center',

    
  },
  btnNextText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 1.1,
  },
});
export default QuizPage;