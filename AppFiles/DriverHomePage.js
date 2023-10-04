import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Button, ScrollView, Dimensions, TextInput, Touchable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

/**Home page for driver */

const DriverHomePage = ({navigation}) => {

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("RiderFound")
    }, 3500)
  }, [])
  return (
    <View>
      <View style = {{height: 40, position: 'fixed', top: 0, left: 0, backgroundColor: '#FFF'}}></View>
      <ScrollView showsVerticalScrollIndicator = {false}>
        <View style={styles.mainCont}>
            <View style = {styles.header}>
              <Text style = {styles.welcomeText}>Welcome, Driver!</Text>
              </View>
              <View style = {styles.titleCont}>
                <Text style = {styles.title}>Your Profile</Text>
              </View>
              <View style = {styles.preferencesCont}>
                <View style = {styles.preference}>
                  <Image source={require('./assets/CheckmarkIcon.png')} style = {styles.checkmarkIcon}></Image>
                  <Text style = {styles.preferenceText}>Willing to help people with special needs</Text>
                </View>
                <View style = {styles.preference}>
                  <Image source={require('./assets/CheckmarkIcon.png')} style = {styles.checkmarkIcon}></Image>
                  <Text style = {styles.preferenceText}>Certification of Additional Training in Autism</Text>
                </View>
                <View style = {styles.preference}>
                  <Image source={require('./assets/CheckmarkIcon.png')} style = {styles.checkmarkIcon}></Image>
                  <Text style = {styles.preferenceText}>A lot of experience working with people with special needs</Text>
                </View>
                <TouchableOpacity style = {styles.changePreferences} onPress={() => navigation.navigate('QuizTest')}>
                  <Image source = {require('./assets/ClipboardIcon.png')} style = {{height: 30, width: 30, resizeMode: 'contain', marginRight: '5%'}}></Image>
                  <Text style = {[styles.preferenceText, {fontSize: 23, left: '50%', width: '60%'}]}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style = {styles.findDriverButton}>
                <Text style = {styles.buttonText}>Start a Route</Text>
              </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainCont: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    backgroundColor: '#FAFAFA'    
  },
  header: {
    height: Dimensions.get('window').height * .18,
    width: '100%',
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    top: '20%',
    fontSize: 40,
    fontWeight: '600'
  },
  destinationsCont: {
    height: Dimensions.get('window').height * .20,
    width: '95%',
  },
  searchBarCont: {
    height: 55,
    alignItems: 'center',
    width: '95%',
    backgroundColor: '#D8D8D8',
    borderRadius: 30,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  searchBar: {
    height: '105%',
    fontWeight: '600',
    fontSize: 22.5
  },
  destination: {
    height: 80,
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    marginTop: '2%',
    borderBottomWidth: .5,
    borderColor: '#DFDFDF'
  },
  destinationTitle: {
    width: '80%',
    left: '5%',
    fontSize: 25,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  address: {
    width: '80%',
    left: '5%',
    color: '#000',
    fontSize: 15
  },
  titleCont: {
    height: Dimensions.get('window').height * .05,
    width: '90%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '600'
  },
  preferencesCont: {
    height: Dimensions.get('window').height * .45,
    width: '95%',
    backgroundColor: '#F0F0F0',
    marginTop: '2%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  preference: {
    height: '18%',
    width: '90%',
    marginTop: '2.5%',
    flexDirection: 'row'
  },
  preferenceText: {
    fontSize: 22,
    fontWeight: '600',
    width: '85%'
  },
  changePreferences: {
    height: '18%',
    width: '90%',
    top: '5%',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row'
  },
  findDriverButton: {
    height: Dimensions.get('window').height * .08,
    width: '80%',
    backgroundColor: '#000',
    borderRadius: 50,
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFF'
  },
  checkmarkIcon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    marginRight: '5%',
  }
});

export default DriverHomePage;