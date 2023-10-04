import { Component } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import { View } from "react-native";

export default class BasicLoader extends Component{
    render(){
        return(
            <View style = {{height: this.props.height, width: Dimensions.get('window').width, backgroundColor: 'blue', opacity: this.props.opacity, position: 'absolute', top: 0, left: 0}}>
                <ActivityIndicator size = "large" color={"#000"} style = {{height: 200, width: 200}}></ActivityIndicator>
            </View>
        )
    }
}