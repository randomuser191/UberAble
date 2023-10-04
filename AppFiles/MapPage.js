import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View, Dimensions, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import MapView from "react-native-maps";

/**Page when Entering a destinatino */
function MapPage({navigation}){
    const [opac1, setOpac1] = useState(0);
    const [oapc2, setOpac2] = useState(0);
    useEffect(()=> {
        setTimeout(() => {
            setOpac1(1);
        }, 3000)
        setTimeout(() => {
            setOpac1(0);
            setOpac2(1);
        }, 6000)
    },[])
    return(
    <View style = {styles.mainCont}>
        <View style = {styles.mapCont}>
            <MapView style = {styles.map} showsUserLocation = {true} showsBuildings = {true}></MapView>
        </View>
        <View style = {styles.bottomCont}>
            <View style = {styles.topCont}>
                <View style = {styles.searchCont}>
                    <TextInput style = {styles.searchBar} placeholder="Where To?"></TextInput>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator = {false}>
                <View>
                    <ActivityIndicator style = {{opacity: opac1, marginTop: opac1 * 25, height: opac1 * 100}} color = {"#000"} size={"large"}></ActivityIndicator>
                </View>
                <View style = {{opacity: oapc2}}>
                <View style  = {styles.titleCont}>
                    <Text style = {styles.title}>Reccomended Drivers Near You</Text>
                </View>
                <TouchableOpacity style = {[styles.driverCont, {borderWidth: 3, borderColor: '#001B93', height: 150}]} onPress = {() => navigation.navigate('LoadingPage', 'Contacting Driver')}>
                    <View style = {styles.imageCont}>
                        <Image source = {require('./assets/DefaultUserIcon.png')} style = {styles.pfp}></Image>
                    </View>
                        <View style = {styles.rightText}>
                            <Text style = {styles.name}>John Smith <Text style = {{fontSize: 18, color: "grey", fontWeight: '400'}}>5 mi</Text></Text>
                            <TouchableOpacity style = {styles.button}>
                                <Text style = {styles.buttonText}>View Profile</Text>
                            </TouchableOpacity>
                    </View>
                    
                </TouchableOpacity>
                <View style = {styles.driverCont}>
                    <View style = {styles.imageCont}>
                        <Image source = {require('./assets/DefaultUserIcon.png')} style = {styles.pfp}></Image>
                    </View>
                        <View style = {styles.rightText}>
                            <Text style = {styles.name}>Alex Doe <Text style = {{fontSize: 18, color: "grey", fontWeight: '400'}}>12 mi</Text></Text>
                            <TouchableOpacity style = {styles.button}>
                                <Text style = {styles.buttonText}>View Profile</Text>
                            </TouchableOpacity>
                    </View>
                    
                </View>
                <View style = {styles.driverCont}>
                    <View style = {styles.imageCont}>
                        <Image source = {require('./assets/DefaultUserIcon.png')} style = {styles.pfp}></Image>
                    </View>
                        <View style = {styles.rightText}>
                            <Text style = {styles.name}>Jane White <Text style = {{fontSize: 18, color: "grey", fontWeight: '400'}}>8 mi</Text></Text>
                            <TouchableOpacity style = {styles.button}>
                                <Text style = {styles.buttonText}>View Profile</Text>
                            </TouchableOpacity>
                    </View>
                    </View>
                </View>
                <View style = {{height: 100}}></View>
            </ScrollView>
        </View>
    </View> 
    )
}
export default MapPage;
const styles = StyleSheet.create({
    mainCont: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        alignItems: 'center'
    },
    mapCont: {
        height: Dimensions.get('window').height * .35,
        width: '100%'
    },
    map: {
        height: '100%',
        width: '100%',
    },
    bottomCont:{
        height: Dimensions.get("window").height * .65,
        width: "100%",
        backgroundColor: "#FFF",
        alignItems: 'center'
    },
    topCont: {
        height: '15%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchCont: {
        height: '60%',
        width: '95%',
        backgroundColor: '#FFF',
        borderRadius: 100,
        borderWidth: 1,
        justifyContent: 'center',
    },
    searchBar: {
        height: '95%',
        width: '80%',
        left: '2%',
        fontSize: 22,
        fontWeight: '600'
    },
    titleCont: {
        height: 45,
        marginTop: '2.5%',
        width: '90%',        
    },
    title: {
        fontSize : 25,
        fontWeight: '600',
    },
    driverCont:{
        height: 105,
        width: Dimensions.get('window').width * .95,
        alignSelf: "center",
        backgroundColor:"#FDFDFD",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        marginTop: '5%'
    },
    imageCont: {
        height: '100%',
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pfp: {
        height: 90,
        width: 90,
        resizeMode: 'contain',
        borderWidth: 1,
        borderRadius: 100
    },
    rightText: {
        height: "100%",
        width: "70%",
        justifyContent: "center",
        alignItems: 'center',
    },
    name: {
        fontSize: 25,
        fontWeight: '600',
    },
  button:{
    height: "50%",
    width: "75%",
    backgroundColor: "#000",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    top: "5%",
    left: '5%'
  },
  buttonText: {
    color: "#FFF",
    fontWeight: '600',
    fontSize: 20
  }

})