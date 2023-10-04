import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import HomePage from "./HomePage";
import DriverHomePage from "./DriverHomePage";
import MapPage from "./MapPage";

const Stack = createBottomTabNavigator();

/**Bottom Tab Navigator for app */
function BottomTabNavDriver({route, navigation}){
    return(
        <Stack.Navigator screenOptions = {({route}) => ({
            tabBarStyle: {height: 90, backgroundColor: '#FBFFFF', borderTopWidth: 1, borderColor: 'grey'},
            tabBarLabelStyle: {fontSize: 12, color: '#000'},
            tabBarItemStyle: {height: '100%'},
            tabBarIcon: ({ focused, color, size }) => {
                var iconName;
                var images = {
                    'MapIcon':  require('./assets/MapIcon.png'),
                    'MapInactiveIcon': require('./assets/MapInactiveIcon.png'),
                    'HomeIcon':  require('./assets/CarIcon.png'),
                    'HomeInactiveIcon': require('./assets/CarInactiveIcon.png'),
                }
                if(route.name == "Home"){
                    iconName = focused ? 'HomeIcon' : 'HomeInactiveIcon';
                    h = "55%";
                } else if(route.name == "Map"){
                    iconName = focused ? 'MapIcon' : 'MapInactiveIcon';
                    h = "55%";
                }else if(route.name == "Driver Home Page"){
                    iconName = focused ? 'DriverIcon' : 'DriverInactiveIcon';
                    h = "55%";
                }
                return(<Image source = {images[iconName]} style = {{height: h, width: 100, resizeMode: 'contain'}}></Image>)
            }
            })}tabBarPosition = 'bottom'>
            <Stack.Screen name = "Home" component={DriverHomePage} options = {{headerShown: false}}></Stack.Screen>
            <Stack.Screen name = "Map" component={MapPage} options = {{headerShown: false}}></Stack.Screen>
        </Stack.Navigator>
    )
}
export default BottomTabNavDriver;