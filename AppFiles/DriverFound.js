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
                <Text style = {styles.name}>John Smith</Text>
            </View>
            <View style = {styles.statsCont}>
                <View style = {styles.stat}>
                    <Text style = {styles.bigText}>200</Text>
                    <Text style = {styles.smallText}>Trips</Text>
                </View>
                <View style = {styles.stat}>
                    <Text style = {styles.bigText}>4.9</Text>
                    <Text style = {styles.smallText}>Rating</Text>
                </View>
                <View style = {styles.stat}>
                    <Text style = {styles.bigText}>5</Text>
                    <Text style = {styles.smallText}>Years</Text>
                </View>
            </View>
            <View style = {styles.certCont}>
                <View style = {styles.cert}>
                  <Image source={require('./assets/WorldIcon.png')} style = {styles.checkmarkIcon}></Image>
                  <Text style = {styles.certText}>Speaks <Text style = {{fontWeight: '700'}}>English</Text> and <Text style = {{fontWeight: '700'}}>Spanish</Text></Text>
                </View>
                <View style = {styles.cert}>
                  <Image source={require('./assets/CheckmarkIcon.png')} style = {styles.checkmarkIcon}></Image>
                  <Text style = {styles.certText}>Frequent experience with riders with special needs</Text>
                </View>
                <View style = {styles.cert}>
                  <Image source={require('./assets/ClipboardIcon.png')} style = {styles.checkmarkIcon}></Image>
                  <Text style = {styles.certText}>Parkinson's Disease Certification</Text>
                </View>
                <View style = {{justifyContent: 'center', top: '3%'}}>
                  <Text style = {{fontSize: 25, fontWeight: '600'}}>ETA: 5 minutes</Text>
                </View>
                <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate('BottomTabNav', {navigateTo: "DriverHome"})}><Text style = {styles.buttonText}>Contact Driver</Text></TouchableOpacity>
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
        height: '5%',
        width: '100%',
        backgroundColor: '#FFF',
        marginTop: '20%',
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        fontWeight: '600',
    },
    infoCont: {
        height: '27.5%',
        // backgroundColor: 'green',
        alignItems: 'center'
    },
    profileImg: {
        height: 180,
        width: 180,
        resizeMode: 'contain'
    },
    name: {
        fontSize: 32,
        fontWeight: '400',
        marginTop: '2.5%'
    },
    statsCont: {
        height: '9%',
        // backgroundColor: 'blue',
        width: Dimensions.get('screen').width,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    stat: {
        height: '100%',
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bigText: {
        fontSize: 28,
        fontWeight: '500',
    },
    smallText: {
        fontSize: 18,
        fontWeight: '400'
    },
    certCont: {
        height: '42.5%',
        width: '95%',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        marginTop: '2.5%'
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
        fontSize: 23,
        fontWeight: '500',
        width: '90%'
    },
    button: {
        height: '18%',
        width: '80%',
        borderRadius: 10,
        backgroundColor: '#000',
        marginTop: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 25,
        fontWeight: '600',
        color: '#FFF'
    }
})