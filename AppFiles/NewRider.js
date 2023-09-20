import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
/**Driver's side view of when a driver is found */

function RiderFound({navigation}){
    return(
        <View style = {styles.mainCont}>
            <View style = {styles.titleCont}>
                <Text style = {styles.title}>New Rider!</Text>
            </View>
            <View style = {styles.infoCont}>
                <Image source = {require('./assets/DefaultUserIcon.png')} style = {styles.profileImg}></Image>
                <Text style = {styles.name}>Daniel Doe</Text>
            </View>
            <View style = {styles.certCont}>
                <Text style = {styles.subTitle}>Preferences:</Text>
                <View style = {styles.cert}>
                  <Text style = {styles.certText}>- Would prefer to sit in the back</Text>
                </View>
                <View style = {styles.cert}>
                  <Text style = {styles.certText}>- Sensitive to noise</Text>
                </View>
                <View style = {styles.cert}>
                  <Text style = {styles.certText}>- Needs assistance entering and exiting the vehicle</Text>
                </View>
                <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate('BottomTabNav', {navigateTo: "DriverHome"})}><Text style = {styles.buttonText}>Start Ride</Text></TouchableOpacity>
            </View>
        </View>
    )
}
export default RiderFound;
const styles = StyleSheet.create({
    mainCont: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: '#FFF',
        alignItems: 'center',
    },
    titleCont: {
        height: '8%',
        width: '100%',
        backgroundColor: '#FFF',
        marginTop: '25%',
        alignItems: 'center'
    },
    title: {
        fontSize: 35,
        fontWeight: '600',
    },
    infoCont: {
        height: '30%',
        alignItems: 'center'
    },
    profileImg: {
        height: 175,
        width: 175,
        resizeMode: 'contain'
    },
    name: {
        fontSize: 35,
        fontWeight: '500',
        marginTop: '2.5%'
    },
    certCont: {
        height: '50%',
        width: '95%',
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
    },
    cert: {
        width: '95%',
        flexDirection: 'row',
        marginTop: '10%',
        alignItems: 'center'  ,
        alignSelf: 'center',    
    },
    checkmarkIcon: {
        height: 35,
        width: 40,
        resizeMode: 'contain',
        marginRight: '3%'
    },
    certText: {
        fontSize: 25,
        fontWeight: '600',
        width: '95%'
    },
    button: {
        height: '18%',
        width: '80%',
        borderRadius: 10,
        backgroundColor: '#000',
        marginTop: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: 25,
        fontWeight: '600',
        color: '#FFF'
    },
    subTitle: {
        fontSize: 30,
        fontWeight: '600',
        left: '5%',
        top: '5%'
    }
})