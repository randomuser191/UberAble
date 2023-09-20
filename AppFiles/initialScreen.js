import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from "react-native";

/**Landing Page for App */
function InitialScreen({navigation}){
    return(
        <View style = {styles.background}>
            <View style = {styles.logoCont}>
                <Text style = {styles.logo}>Uber Needs</Text>
            </View>
            <View style = {styles.textCont}>
                <Text style = {styles.motto}>People First.</Text>
            </View>
            <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate('Login')}>
                <Text style = {styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    )
}
export default InitialScreen;
const styles = StyleSheet.create({
    background: {
        backgroundColor: "#FFF",
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoCont:{
        height: 160,
        width: 160,
        borderRadius: 10,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo:{
        color: "#FFF",
        fontWeight: '600',
        fontSize: 50,
        width: '85%',
        textAlign: 'center'
    },
    textCont: {
        height: '8%',
        width: '80%',
        marginHorizontal: '10%',
        marginTop: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    motto: {
        color: "#000",
        fontSize: 30,
        fontWeight: '500'
    },
    button: {
        height: '8%',
        width: '65%',
        marginHorizontal: '15%',
        top: '12%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        borderRadius: 50,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: '600'
    }
})