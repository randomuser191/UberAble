import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Button, ScrollView, Dimensions, TextInput, Touchable } from 'react-native';
import { useNavigation } from '@react-navigation/native';


/**Homepage for rider */
const HomePage = ({route}) => {
  const [preferences, setPreferences] = useState(['', '', '']);
  useEffect(() => {//Set preferences from server
    if(route.params.preferences) setPreferences(route.params.preferences)
    else setPreferences(route.params.params)
  }, [route.params])
  const navigation = useNavigation();
  return (
    <View>
      <View style = {{height: 40, position: 'fixed', top: 0, left: 0, backgroundColor: '#FFF'}}></View>
      <ScrollView showsVerticalScrollIndicator = {false}>
        <View style={styles.mainCont}>
            <View style = {styles.header}>
              <Text style = {styles.welcomeText}>Welcome, Rider!</Text>
              </View>
              <View style = {styles.destinationsCont}>
                <View style = {styles.searchBarCont}>
                  <Image source = {require('./assets/SearchIcon.png')} style = {{height: 25, width: 30, resizeMode: 'contain', marginLeft: '5%'}}></Image>
                  <TextInput placeholder = "   Search Destinations" style = {styles.searchBar} placeholderTextColor = {"#1a1a1a"}></TextInput>
                </View>
                <View style = {styles.destination}>
                  <View style = {{height: '100%', width: '12%', justifyContent: 'center', alignItems: 'center'}}>
                    <Image source = {require('./assets/RecentIcon.png')} style = {{height: '35%', width: '100%', resizeMode: 'contain'}}></Image>
                  </View>
                  <View style = {{height: '100%', width: '80%', alignSelf: 'center', justifyContent: 'center'}}>
                    <Text style = {styles.destinationTitle}>Willis Tower</Text>
                    <Text style = {styles.address}>291 W Wacker Drive</Text>
                  </View>
                </View>
              </View>
              <View style = {styles.titleCont}>
                <Text style = {styles.title}>Your Preferences</Text>
              </View>
              <View style = {styles.preferencesCont}>
                <View style = {styles.preference}>
                  <Text style = {styles.preferenceText}>Preferred method of Communication: {preferences[0]}</Text>
                </View>
                <View style = {styles.preference}>
                  <Text style = {styles.preferenceText}>Preferred language: {preferences[1]}</Text>
                </View>
                <View style = {styles.preference}>
                  <Text style = {styles.preferenceText}>Sensitive to: {preferences[2]}</Text>
                </View>
                <TouchableOpacity style = {styles.changePreferences} onPress={() => navigation.navigate('QuizTest')}>
                  <Image source = {require('./assets/SettingsIcon.png')} style = {{height: 30, width: 30, resizeMode: 'contain', marginRight: '5%'}}></Image>
                  <Text style = {[styles.preferenceText, {fontSize: 23}]}>Change Preferences</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style = {styles.findDriverButton} onPress={() => navigation.navigate('LoadingPage', "Searching for Drivers")}>
                <Text style = {styles.buttonText}>Find a Driver</Text>
              </TouchableOpacity>
        </View>
        <View style = {{top: '7%', height: 100, backgroundColor: '#FFF'}}></View>
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
    marginTop: '2.5%'
  },
  preferenceText: {
    fontSize: 22,
    fontWeight: '600'
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
  }
});

export default HomePage;