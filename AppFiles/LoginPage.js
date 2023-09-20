import React, { useState } from "react";
import {StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, Dimensions, TouchableWithoutFeedback, Keyboard} from "react-native";
import { Link } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

/*Firebase*/
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from './firebase';

/**Initialize Firebase App */
let app;
if(firebase.apps.length == 0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app();
}
/**Login Page */
function LoginPage({navigation}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = (email, password) => {
        custLogin(email, password); //Authenticate with Firebase Auth
          setTimeout(() => {
            getDoc().then(res => { //Get user data
                  if(res){
                      var docs = JSON.parse(res);
                      async function setItem(){
                          await AsyncStorage.setItem("docs", JSON.stringify(docs)); //Store user data locally
                      }
                      
                      setItem();
                  }else if(res == undefined){
                      setItem({});
                  }
                  setTimeout(() => {
                      navigation.navigate('BottomTabNav', {params: JSON.parse(res)['preferences']}); // Navigate to Home Page
                  }, 1000)
              });
          }, 1500)
        setTimeout(() => {
        }, 1000)
    }
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style = {styles.main}>
            <View style = {styles.title}>
                <Text style = {styles.titleText}>Log In</Text>
            </View>
            <View style = {{height: '40%', alignItems: 'center'}}>
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="  Username or email"
                    placeholderTextColor = '#7D7D7D'
                    keyboardType="email-address"
                    maxLength={30}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="  Password"
                    placeholderTextColor = '#7D7D7D'
                    keyboardType="default"
                    maxLength={19}
                    secureTextEntry={true}
                />




                <TouchableOpacity style = {styles.button} onPress={() => handleLogin(email, password)}>
                    <Text style = {styles.buttonText}>Continue</Text>
                </TouchableOpacity>
                <Text style = {styles.signUp}>Dont have an account? <Link to = {{screen: 'Welcome'}} style = {{color: '#3131E3'}}>Sign Up</Link></Text>
                <TouchableOpacity style = {[styles.extraButton, {marginTop: '8%'}]} onPress={() => handleLogin(email, password)}>
                    <Image source={require('./assets/UberIcon.png')} style = {styles.uberIcon}></Image>
                    <Text style = {styles.buttonText}>Log In With Uber</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.extraButton} onPress={() => handleLogin(email, password)}>
                    <Image source={require('./assets/GoogleIcon.png')} style = {styles.googleIcon}></Image>
                    <Text style = {styles.buttonText}>Log In With Google</Text>
                </TouchableOpacity>
            </View>
        </View>
        </TouchableWithoutFeedback>
    )
}
export default LoginPage;



/**Authenticate user with Firebase Auth and request data from server */
async function custLogin(email, password){
  var userId = '';
  const auth = getAuth(app);
  signInWithEmailAndPassword(auth, email, password).then(userCreds => {
      userId = userCreds.user.uid;
      async function setData(uId){console.log(uId); await AsyncStorage.setItem("fireTok", uId);}
      setData(userId);
      fetch('http://192.168.4.26:3000/retusers', {
          method: 'POST',
          headers: {
          Accept: 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              u: userId
          })
      }).catch(err => {
          console.log(err)
      });
      
  }).catch(err => {
      console.log(err)
  })
  console.log()
}
/**Get requested data from server */
async function getDoc(){
  var state = {
      doc: false
  }
  const res = await fetch('http://192.168.4.26:3000/getretusers');
  const json = await res.json();
  console.log(json['cust'])
  state['cust'] = json['cust'];
  return state['cust'];
}

const styles = StyleSheet.create({
    main: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: '#FBFFFF',
    },
    title: {
        height: '30%',
        width: '97.5%',
        left: '2.5%',
        top: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 45,
        fontWeight: '600'
    },
    subText: {
        fontSize: 18,
        top: '2.5%',
        color: '#777'
    },
    input:{
        height: '15%',
        width: '90%',
        backgroundColor: '#EDEFF2',
        /*----On Pressed---*/
        // shadowColor: '#A6A6A6',
        // shadowRadius: 4,
        // shadowOffset: {height: 2, width: 1},
        // shadowOpacity: '.4',
        borderRadius: 5,
        marginVertical: '5%',
        fontSize: 18,
        fontWeight: '500'
    },
    button: {
        height: '18%',
        width: '65%',
        borderRadius: 20,
        justifyContent: 'center',
        backgroundColor: '#000',
        marginTop: '8%',
    },
    buttonText:{
        fontSize: 25,
        fontWeight: '600',
        alignSelf: 'center',
        color: "#FFF"
    },
    signUp: {
        marginTop: '5%',
        fontSize: 18,
        fontWeight: '400'
    },
    extraButton: {
        height: '18%',
        width: '70%',
        borderRadius: 20,
        justifyContent: 'center',
        backgroundColor: '#15286A',
        marginTop: '5%',
        flexDirection: 'row' 
    },
    uberIcon: {
        height: '80%',
        width: 40,
        resizeMode: 'contain',
        right: '15%',
        top: '2%'
    },
    googleIcon: {
        height: '80%',
        width: 30,
        resizeMode: 'contain',
        right: '15%',
        top: '2%'
    }


})