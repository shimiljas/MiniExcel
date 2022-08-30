import React from 'react';
import {StyleSheet, TextInput, Text, View} from 'react-native';
const InputBox = ({
  onChangeText,
  value,
  returnKeyType,
  x,
  y,
  rowData,
}) => {
  if (x < 2) {
    return (
      <TextInput
        placeholder={`${y},${x}`}
        style={[style.continer, !value && {fontSize: 15, opacity: 1}]}
        onChangeText={text => onChangeText({x, y}, text)}
        keyboardType={'numeric'}
        value={value}
        returnKeyType={returnKeyType ? returnKeyType : 'done'}
      />
    );
  } else {
    if (x == 2) {
      return (
        <View style={[style.containerBox, {borderRightWidth: 0}]}>
          <Text style={style.text}>
            {!isNaN(rowData?.[y]?.[2]) ? rowData?.[y]?.[2] : ''}
          </Text>
        </View>
      );
    }
    if (x == 3) {
      return (
        <View style={style.containerBox}>
          <Text style={style.text}>
            {!isNaN(rowData?.[y]?.[3]) ? rowData?.[y]?.[3] : ''}
          </Text>
        </View>
      );
    }
  }
};
const style = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 20,
  },
  containerBox: {
    height: 60,
    backgroundColor: '#F6F6F6',
    fontFamily: 'Montserrat-Regular',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.6,
    borderColor: 'black',
    minWidth: 70,
    borderBottomWidth: 0,
  },
  continer: {
    height: 60,
    backgroundColor: '#F6F6F6',
    fontFamily: 'Montserrat-Regular',
    borderWidth: 0.6,
    paddingLeft: 10,
    borderColor: 'black',
    fontSize: 20,
    alignItems: 'center',
    color: 'black',
    minWidth: 70,
    paddingLeft: 20,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
});

export default InputBox;
