/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet
} from 'react-native';

import HomeScreen from './src/HomeScreen'


const App= () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex:1,marginTop:30,paddingLeft:20}}>
       <Text style={style.text}>Mini Excel sheet</Text>
      <HomeScreen/>
      </View>
    </SafeAreaView>
  );
};
const style=StyleSheet.create({
  text:{
    alignSelf:'center',
    paddingBottom:10,
    color:'black',
    fontSize:20
  }
})

export default App;
