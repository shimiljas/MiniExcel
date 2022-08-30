import React from 'react';
import {View,ScrollView} from 'react-native';
import InputBox from './component/InputBox'
import Table from  './component/Table'
const HomeScreen = () => {
  return(
   <ScrollView style={{flex: 1}}>
    <Table x={4} y={50}/>
  </ScrollView>
  )
};

export default HomeScreen
