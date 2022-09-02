import React, {useState, useEffect} from 'react';
import {StyleSheet, TextInput} from 'react-native';

const COLUMNS = ['a', 'A', 'b', 'B', 'c', 'C', 'd', 'D'];

import Toast from 'react-native-toast-message';
import {
  validateText,
  stringConvertion,
  checkPremtive,
  isHaveValidParanthesis,
  isValidBracket,
  checkExpression,
} from '../uti';

const InputBox = ({
  onChangeText,
  returnKeyType,
  x,
  y,
  rowData,
  removeText,
  updatedCell,
}) => {
  const [text, setText] = useState(rowData?.[y]?.[x]);
  const [converted, setConverted] = useState('');

  useEffect(() => {
    if (text?.indexOf(updatedCell) > -1) {
      let converted = stringConvertion(text, rowData);
      if (converted?.length == 0) {
        setConverted('');
        setText('');
        removeText({x, y});
      }
      if (converted) setConverted(converted);
    }
  }, [updatedCell]);

  const onSubmitEditing = () => {
    if (validateText(text) && isValidBracket(text) == 0) {
      let modified = text;
      if (!isNaN(text)) {
        modified = text;
      } else if (checkPremtive(text)) {
        modified = text?.toUpperCase();
      } else {
        if (!isHaveValidParanthesis(text)) {
          modified = `(${text?.toUpperCase()})`;
        }
      }
      onChangeText({x, y}, modified);
      setText(modified?.toUpperCase());
    } else {
      if (text.length > 0) {
        Toast.show({
          type: 'error',
          text1: 'Invalid input',
          text2: 'This is not a valid input',
        });
      }
      setText('');
      removeText({x, y});
    }
  };
  onBlur = () => {
    if (!text) return;
    if (!isNaN(text)) setConverted(text);
    try {
      let value = eval(text).toString();
      if (value) {
        setConverted(value);
        onChangeText({x, y}, value);
      }
    } catch (err) {
      let converted = stringConvertion(text, rowData);
      if (converted?.length == 0) {
        setText('');
        removeText({x, y});
      }
      setConverted(converted);
    }
  };
  const onFocus = () => {
    setConverted('');
    if (rowData?.[y]?.[x]) {
      setText(rowData?.[y]?.[x]);
    }
  };

  return (
    <TextInput
      placeholder={`${x} ${y}`}
      autoCapitalize={'characters'}
      style={[
        style.continer,
        {fontSize: 15, opacity: 1, borderRightWidth: x == 3 ? 1 : 0},
      ]}
      onChangeText={text => setText(text)}
      value={converted?.length > 0 ? converted : text}
      returnKeyType={returnKeyType ? returnKeyType : 'done'}
      keyboardType="default"
      onSubmitEditing={onSubmitEditing}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
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
    maxWidth: 70,
    paddingLeft: 20,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
});

export default InputBox;
