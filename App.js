import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InitialScreen from "./AppFiles/initialScreen";
import SignUpScreen from "./AppFiles/SignUp";
import Questions from './AppFiles/Questionairre/QuestionsTest';
import QuizPage from './AppFiles/Questionairre/QuizPage';
import Result from './AppFiles/Questionairre/Result';
import Welcome from './AppFiles/Questionairre/Welcome';
import DriverHomePage from './AppFiles/DriverHomePage';
import LoginPage from './AppFiles/LoginPage';
import BottomTabNav from './AppFiles/bottomTabNavigation';
import DriverFound from './AppFiles/DriverFound';
import LoadingPage from './AppFiles/LoadingPage';
import MapPage from './AppFiles/MapPage';
import RiderFound from './AppFiles/NewRider';
import BottomTabNavDriver from './AppFiles/bottomTabNavigationDriver';

/**Navigation Cont */
const Stack = createNativeStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
        <Stack.Navigator initialRouteName = "LandingPage">
          <Stack.Screen name="LandingPage" component={InitialScreen} options = {{headerShown: false}}/>
          <Stack.Screen name="Login" component={LoginPage} options = {{headerShown: false}}/>
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/>
          <Stack.Screen name ="Quiz" component={Questions} options={{headerShown: false}}/> 
          <Stack.Screen name ="QuizTest" component={QuizPage} options={{headerShown: false}}/> 
          <Stack.Screen name ="Result" component={Result} options={{headerShown: false}}/> 
          <Stack.Screen name ="Welcome" component={Welcome} options={{headerShown: false}}/>
          <Stack.Screen name ="DriverHome" component={DriverHomePage} options={{headerShown: false}}/> 
          <Stack.Screen name ="BottomTabNav" component={BottomTabNav} options={{headerShown: false}}/>
          <Stack.Screen name ="BottomTabNav2" component={BottomTabNavDriver} options={{headerShown: false}}/>
          <Stack.Screen name ="DriverFound" component={DriverFound} options={{headerShown: false}}/>
          <Stack.Screen name ="LoadingPage" component={LoadingPage} options={{headerShown: false}}/>
          <Stack.Screen name ="MapPage" component={MapPage} options={{headerShown: false}}/>
          <Stack.Screen name ="RiderFound" component={RiderFound} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
      //git
  )
}