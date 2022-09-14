import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

export default function splashscreen({navigation}) {
    setTimeout(() => {
        navigation.replace('Home')
      }, 4000);
  return (
    <View style={{backgroundColor:'rgba(65, 17, 17, 1)', height:'100%'}}>
        <Image
        source={require('../assets/images/logo.png')}
        style={{alignSelf:'center', width: 350, marginTop:240}} 
        />
    </View>
  )
}