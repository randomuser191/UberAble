import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import HomePage from "./HomePage";
import DriverHomePage from "./DriverHomePage";

const Stack = createBottomTabNavigator();

/**Bottom Tab Navigator for app */
function BottomTabNav({route, navigation}){
    useEffect(() => {
        navigation.navigate('DriverHome')
    }, [])
    return(
        <Stack.Navigator screenOptions = {({route}) => ({
            tabBarStyle: {height: 90, backgroundColor: '#FBFFFF', borderTopWidth: 1, borderColor: 'grey'},
            tabBarLabelStyle: {fontSize: 12, color: '#000'},
            tabBarItemStyle: {height: '100%'},
            tabBarIcon: ({ focused, color, size }) => {
                var iconName;
                var images = {
                    'HomeIcon':  require('./assets/HomeIcon.png'),
                    'HomeInactiveIcon': require('./assets/HomeInactiveIcon.png'),
                    'DriverIcon':  require('./assets/CarIcon.png'),
                    'DriverInactiveIcon': require('./assets/CarInactiveIcon.png'),
                }
                if(route.name == "Home"){
                    iconName = focused ? 'HomeIcon' : 'HomeInactiveIcon';
                    h = "55%";
                } else if(route.name == "Driver Home Page"){
                    iconName = focused ? 'DriverIcon' : 'DriverInactiveIcon';
                    h = "55%";
                }
                return(<Image source = {images[iconName]} style = {{height: h, width: 100, resizeMode: 'contain'}}></Image>)
            }
            })}tabBarPosition = 'bottom'>
            <Stack.Screen name = "Home" component={HomePage} options = {{headerShown: false}} initialParams={route.params}></Stack.Screen>
            <Stack.Screen name = "Driver Home Page" component={DriverHomePage} options = {{headerShown: false}}></Stack.Screen>
        </Stack.Navigator>
    )
}
export default BottomTabNav;