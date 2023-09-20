import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Link } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
/*Firebase*/
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from './firebase';

/**Initialize Firebase App */
let app;
if(firebase.apps.length == 0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app();
}

/**SignUp Page */
const SignUpScreen = ({route}) => {

  const navigation = useNavigation(); // Access the navigation object
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const type = route.params;

  const handleSignUp = (email, cPass, password, first, last) => {//Create user with firebase Auth
    if(cPass == password){
        createCust(email, password, first, last, type); //Send request to server to create user database
        setTimeout(() => {
            checkCust().then(res => {
                console.log(res)
                if(res){
                    navigation.navigate('QuizTest') //Navigate to survey
                }
            }, 1000);
        })
    }
  }
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style = {styles.main}>
        <View style = {styles.title}>
            <Text style = {styles.titleText}>Sign Up</Text>
        </View>
        <View style = {{height: '45%', alignItems: 'center'}}>
            <View style = {{flexDirection: 'row', height: '20%'}}>
                <TextInput
                    onChangeText={setFirstName}
                    value={firstName}
                    placeholder=" First Name "
                    keyboardType="default"
                    placeholderTextColor = '#555'
                    maxLength={15}
                    style = {[styles.halfInput, {marginRight: '2%'}]}
                    />
                <TextInput
                    onChangeText={setLastName}
                    value={lastName}
                    placeholder=" Last Name "
                    keyboardType="default"
                    placeholderTextColor = '#555'
                    maxLength={15}
                    style = {styles.halfInput}
                />  
            </View>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder=" Email"
                placeholderTextColor = '#555'
                keyboardType="default"
                maxLength={30}
                />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder=" Password"
                placeholderTextColor = '#555'
                keyboardType="default"
                maxLength={19}
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                placeholder=" Confirm Password"
                placeholderTextColor = '#555'
                keyboardType="default"
                maxLength={19}
                secureTextEntry={true} 
            />



            <TouchableOpacity style = {styles.button} onPress={() => handleSignUp(email, confirmPassword, password, firstName, lastName, type)}>
                <Text style = {styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style = {styles.signUp}>Already have an account? <Link to = {{screen: 'Login'}} style = {{color: '#3131E3'}}>Log In</Link></Text>
        </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

/**Send request to server to create a user */
async function createCust(email, password, first, last, type){
  var userId;
  const auth = getAuth(app);
  createUserWithEmailAndPassword(auth, email, password).then(userCreds => {
      userId = userCreds.user.uid;
      async function set(){await AsyncStorage.setItem("fireTok", userId);}
      set();
      setTimeout(() => {
        fetch('http://192.168.4.26:3000/users', {
          method: 'POST',
          headers: {
          Accept: 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              e: email,
              u: userId,
              f: first,
              l: last,
              t: type
          })
          }).catch(err => {
              console.log(err)
          });
      }, 100)
  }).catch(err => {
      console.log(err)
  })
  console.log('finished create cust')
  return userId;
}
/**Check if user was created */
async function checkCust(){
    console.log('called')
  var state = {
      cust: false
  }
  const res = await fetch('http://192.168.4.26:3000/getusers');
  const json = await res.json();
  console.log(json)
  state['cust'] = json['cust'];
  return state['cust'];
}


const styles = StyleSheet.create({
  main: {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      backgroundColor: '#FBFFFF'
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
    borderRadius: 5,
    marginVertical: '5%',
    fontSize: 18,
    fontWeight: '500'
},
  halfInput:{
      height: '80%',
      width: '44%',
      backgroundColor: '#EDEFF2',
      borderColor: '#888',
      borderRadius: 5,
      marginBottom: '5%',
      fontSize: 18
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
      top: '8%',
      fontSize: 18,
      fontWeight: '400'
  }


})

export default SignUpScreen;