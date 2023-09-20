import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

/**Page to show when a driver is found */
function DriverFound({navigation}){
    return(
        <View style = {styles.mainCont}>
            <View style = {styles.titleCont}>
                <Text style = {styles.title}>Driver Found!</Text>
            </View>
            <View style = {styles.infoCont}>
                <Image source = {require('./assets/DefaultUserIcon.png')} style = {styles.profileImg}></Image>
                <Text style = {styles.name}>John Doe</Text>
            </View>
            <View style = {styles.certCont}>
                <View style = {styles.cert}>
                  <Image source={require('./assets/CheckmarkIcon.png')} style = {styles.checkmarkIcon}></Image>
                  <Text style = {styles.certText}>Social Anxiety Certification</Text>
                </View>
                <View style = {styles.cert}>
                  <Image source={require('./assets/CheckmarkIcon.png')} style = {styles.checkmarkIcon}></Image>
                  <Text style = {styles.certText}>Autism Certification</Text>
                </View>
                <View style = {styles.cert}>
                  <Image source={require('./assets/CheckmarkIcon.png')} style = {styles.checkmarkIcon}></Image>
                  <Text style = {styles.certText}>Parkinson's Disease Certification</Text>
                </View>
                <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate('BottomTabNav', {navigateTo: "DriverHome"})}><Text style = {styles.buttonText}>View Profile</Text></TouchableOpacity>
            </View>
        </View>
    )
}
export default DriverFound;
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
        height: 200,
        width: 200,
        resizeMode: 'contain'
    },
    name: {
        fontSize: 35,
        fontWeight: '500',
        marginTop: '2.5%'
    },
    certCont: {
        height: '45%',
        width: '95%',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        marginTop: '5%'
    },
    cert: {
        width: '95%',
        flexDirection: 'row',
        marginTop: '10%',
        alignItems: 'center'      
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
        width: '90%'
    },
    button: {
        height: '18%',
        width: '80%',
        borderRadius: 10,
        backgroundColor: '#000',
        marginTop: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 25,
        fontWeight: '600',
        color: '#FFF'
    }
})