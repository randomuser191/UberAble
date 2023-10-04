import React, { Component, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ActivityIndicator } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import * as ExpoFileSystem from 'expo-file-system';
import BasicLoader from "./BasicLoader";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { Alert } from "react-native";
const storage = getStorage();

/**Styling for a question */
const Questions = ({ question, navigation, setData }) => {
  const [loading, setLoading] = useState(false);
  const onPress = () => {
    setLoading(prev => !prev);
  }
    return (
      <View>
        <Text
          style={{
            color: "#333",
            fontSize: 38,
            fontWeight: '600',
            top: '10%'
          }}
        >
          {question}
        </Text>
        {question.includes('certification') ? 
        <UploadPage loading = {loading} onPress = {onPress} setData = {setData}></UploadPage> : <View></View>}
        {/* <BasicLoader height = {height} opacity = {opacity}></BasicLoader> */}
      </View>
    );
  };

class UploadPage extends Component {
  state = {
    doc: '',
    text: 'Browse Files',
    subText: ''
  }
  
  getDocument = async () => {
    var uri;
    var res = await DocumentPicker.getDocumentAsync({});
    if(!res.canceled) uri = await fetch(res.assets[0].uri);
    var blob = await uri.blob();
    this.setState({doc: blob});
    const imgRef = ref(storage, "img.jpg");
    uploadBytes(imgRef, this.state.doc).then(() => {
      console.log("uploaded")
    })

    // const fileContent = await ExpoFileSystem.readAsStringAsync(uri);
    // console.log(fileContent)
    this.postDocument();
    /*.then(response => {
      console.log(response)
        if (!response.canceled) {          
          let { name, size, uri } = response;
          console.log(name)
          let nameParts = name.split('.');
          let fileType = nameParts[nameParts.length - 1];
          var fileToUpload = {
            name: name,
            size: size,
            uri: uri,
            type: "application/" + fileType
          };
          console.log(fileToUpload + '...file')
          setState({doc: fileToUpload});
        } 
      });*/
}
  postDocument = async() => {
    var doc = this.state.doc;
    fetch('http://192.168.4.26:3000/analyzeDoc', {
      method: 'POST',
      headers: {
      Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          d: doc
      })
    }).catch(err => {
        console.log(err)
    });
    this.props.onPress();
    this.setState({text: "Uploading File"})
    setTimeout(() => {
      getDoc().then(res => {
        if(res.data == "Invalid Document"){
          Alert.alert("Certification not recognized, please try again.")
        }else{
          console.log(res.data)
          this.setState(prevState => ({subText: prevState.subText + '- ' + res.data + "\n"}));
          
        }
      })
      this.props.setData(this.state.subText);
      this.props.onPress();
      this.setState({text: "Uploaded!"})
    }, 6000)
    setTimeout(() => {
      this.setState({text: "Browse Files"})
    }, 8500)
  
    // const fileUri = doc.uri;
    // const formData = new FormData();
    // formData.append('document', doc);
    // const options = {
    //     method: 'POST',
    //     body: formData,
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'multipart/form-data',
    //     },
    // };
    // console.log(formData);

    // fetch(url, options).catch((error) => console.log(error));
  }
render(){
  return (        
    <View style = {{marginTop: '40%', alignItems: 'center'}}>
        <TouchableOpacity onPress={this.getDocument} style = {[styles.optionsText, {height: Dimensions.get('window').height * .08, width: '90%'}]}>
          <Text style = {{color: '#FFF', fontSize: 25, fontWeight: '600', marginRight: '10%'}}>{this.state.text}</Text>
          {(!this.props.loading) ? 
          <Image source={require('../assets/FilesIcon.png')} style = {{height: 30, width: 40, resizeMode: 'contain'}}></Image> : <ActivityIndicator size = {50} color={"#FFF"}></ActivityIndicator>}
        </TouchableOpacity>
        <Text style = {{color: '#000', fontSize: 22, fontWeight: '500', marginTop: '4%', width: '100%', left: '5%'}}>{this.state.subText}</Text>
    </View>
  )
          }
};

async function getDoc(){
  console.log('called')
  const res = await fetch('http://192.168.4.26:3000/analyzeDoc');
  const json = await res.json();
  return json;
}


const styles = StyleSheet.create({
  optionsText: {
    height: 70,
    width: 300,
    backgroundColor: '#15286A',
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    paddingHorizontal: 30,
    marginVertical: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    flexDirection: 'row'
  },
})

export default Questions;