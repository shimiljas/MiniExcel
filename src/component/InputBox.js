import React from 'react';
import {StyleSheet, TextInput,Dimensions,Text,View} from 'react-native';
const width=Dimensions.get('window').width
const InputBox = ({
  placeholder,
  onChangeText,
  keyboardType,
  autoCapitalize,
  value,
  returnKeyType,
  error,
  textArea,
  editable,
  x,
  y,
  rowData
}) => {
  console.log(rowData,"rowDatarowData")
  if(x<2){
    return (
        <TextInput
          placeholder={`${y},${x}`}
          style={style.continer}
          
          onChangeText={(text)=>onChangeText(
            {
              x: x,
              y: y,
            },
            text
          )}
          keyboardType={'numeric'}
          value={value}
          autoCapitalize={autoCapitalize}
          editable={editable}
          returnKeyType={returnKeyType ? returnKeyType : 'done'}
        />
    );
  }else{
    if(x==2){
      return(
          <View style={style.containerBox}>
              <Text style={style.text}>{!isNaN(rowData?.[y]?.[2])?rowData?.[y]?.[2]:''}</Text>
          </View>
        )
      }
      if(x==3){
        return(
          <View style={style.containerBox}>
              <Text style={style.text}>{!isNaN(rowData?.[y]?.[3])?rowData?.[y]?.[3]:''}</Text>
          </View>
        )
      }
      
  }
};
const style = StyleSheet.create({
  text:{
    color:'black',
    fontSize:20,
  },
  containerBox:{
    height: 60,
    width:width/4,
    backgroundColor: '#F6F6F6',
    fontFamily: 'Montserrat-Regular',
    alignItems:'center',
    justifyContent:'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  continer: {
    height: 60,
    width:width/4,
    backgroundColor: '#F6F6F6',
    fontFamily: 'Montserrat-Regular',
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: 'black',
    fontSize:20,
    alignItems:'center',
    paddingLeft:width/8-4,
    color:'black'
  },
});

export default InputBox;