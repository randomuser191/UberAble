import { useEffect } from "react";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";


/**Loading Page when Searching for Drivers */
function LoadingPage({route, navigation}){
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('DriverFound');
        }, 3000)
    }, [])
    return(
        <View style={styles.container}>
            <ActivityIndicator size = "large" style = {styles.loader} color = '#000'></ActivityIndicator>
            <Text style = {styles.text}>{route.params}</Text>
        </View>
    )
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
      fontSize: 25,
      fontWeight: '600'
    }
  });

  export default LoadingPage;