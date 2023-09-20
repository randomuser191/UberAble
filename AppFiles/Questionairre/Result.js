import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect } from "react";
/**Set preferences in firebase server */
const Result = ({ navigation, route }) => {
  useEffect(() => {
    fetchApi(route.params.preferences, route.params.token, route.params.type);
    setTimeout(() => {
      getFetch().then(result => {
        if(result == true){
              navigation.navigate('BottomTabNav', {preferences: route.params.preferences})
        }else{
          console.log("Error")
        }
      })
    }, 3500)

  }, [route.params])
  return (
    <View style={styles.container}>
      <ActivityIndicator size = "large" style = {styles.loader} color = '#000'></ActivityIndicator>
      <Text style = {styles.text}>Setting your Preferences...</Text>
      {/* <View style={styles.subContainer}>
        <Text style={{ fontSize: 50 }}>Your Score</Text>

        <View style={styles.textWrapper}>
          <Text style={styles.score}>{score}</Text>
          <Text style={styles.score}> / 3</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Welcome");
          }}
          style={styles.btnReset}
        >
          <Text style={styles.btnText}>Retry</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};





/**Send data to server */
async function fetchApi(preferences, fireTok, type){
  try{
    fetch('http://192.168.4.26:3000/preferences', {
      method: 'POST',
      headers: {
      Accept: 'application/json',
       'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        p: preferences,
        f: fireTok,
        t: type
      })
  }).catch(err => {
    console.log(err)
  });
  }catch(err){
    console.log(err)
  }
}
/**Get confirmation from server */
async function getFetch(){
  var state = {
    test: false
  }
  const res = await fetch('http://192.168.4.26:3000');
  const json = await res.json();
  state['test'] = json['test'];
  return state['test'];
}











const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    color: '#000'
  },
  text: {
    marginTop: '20%',
    fontSize: 22,
    fontWeight: '600'
  }
});
export default Result;