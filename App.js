import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet
} from 'react-native';
import Toast from 'react-native-toast-message';
import HomeScreen from './src/HomeScreen'


const App= () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex:1,marginTop:30,paddingLeft:20}}>
       <Text style={style.text}>Mini Excel sheet</Text>
       <HomeScreen/>
      </View>
      <Toast />
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
