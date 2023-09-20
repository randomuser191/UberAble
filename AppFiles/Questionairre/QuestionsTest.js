import React from "react";
import { View, Text } from "react-native";

/**Styling for a question */
const Questions = ({ question }) => {
  return (
    <View>
      <Text
        style={{
          color: "#333",
          fontSize: 38,
          fontWeight: '600',
          top: '10%'
        }}
      >
        {question}
      </Text>
    </View>
  );
};


export default Questions;