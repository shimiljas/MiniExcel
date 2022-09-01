import React, {useState, useEffect} from 'react';
import {StyleSheet, TextInput} from 'react-native';

const COLUMNS = ['a', 'A', 'b', 'B', 'c', 'C', 'd', 'D'];
import {convertion, isHaveValidParanthesis} from '../util';
import Toast from 'react-native-toast-message';

const InputBox = ({onChangeText, returnKeyType, x, y, rowData}) => {
  const [text, setText] = useState(rowData?.[y]?.[x]);
  const [converted, setConverted] = useState('');

  useEffect(() => {
    convertValue();
  }, [rowData]);

  const onSubmitEditing = () => {
    if (!isNaN(text)) {
      onChangeText({x, y}, text);
    } else {
      let splited = text?.split(/([-+*()\/])/).filter(e => e);
      if (splited && splited?.length == 0) return;
      let valid = true;
      for (let i = 0; i < splited?.length; i++) {
        if (splited[i].length == 0 && splited[i].length > 3) {
          console.log('herer----->1');
          valid = false;
          break;
        }
        if (splited[i] == '%' || splited[i] == '/' || splited[i] == '-') {
          console.log('herer----->2');
          valid = false;
          break;
        }

        if (
          splited[i].length == 1 &&
          splited[i].toLowerCase() != splited[i].toUpperCase()
        ) {
          console.log('herer----->3');
          valid = false;
          break;
        }
        if (
          typeof splited[i]?.charAt(0) !== 'string' ||
          isNaN(splited[i]?.charAt(1) * 1)
        ) {
          valid = false;
          break;
        }
        if (
          splited[i]?.length !== 1 &&
          isNaN(splited[i].charAt(0)) &&
          !COLUMNS.includes(splited[i].charAt(0))
        ) {
          valid = false;
          break;
        }
        if (Number(splited[i].substring(1)) > 50) {
          valid = false;
          break;
        }
      }
      if (valid) {
        let updateText = text;
        if (isNaN(updateText) || updateText !== '+' || updateText !== '*') {
          if (isHaveValidParanthesis(text) > 0) {
            setText('');
            Toast.show({
              type: 'error',
              text1: 'Invalid input',
              text2: 'This is not a valid input',
            });
            onChangeText({x, y}, '0')
            return;
          }
          if (rowData?.[y]?.[x] !== text) {
            if (updateText.endsWith('+') || updateText.endsWith('*')) {
              updateText = updateText.slice(0, -1);
            }
            updateText = `(${updateText})`;
            onChangeText({x, y}, updateText);
          }
        } else {
          onChangeText({x, y}, updateText);
        }
      } else {
        setText('');
        Toast.show({
          type: 'error',
          text1: 'Invalid input',
          text2: 'This is not a valid input',
        });
      }
    }
  };

  const convertValue = () => {
    if (rowData?.[y]?.[x] && isNaN(rowData?.[y]?.[x])) {
      let conv = convertion(rowData?.[y]?.[x], rowData);
      if (conv) {
        setConverted(conv);
      } else {
        setText('');
      }
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
      style={[
        style.continer,
        {fontSize: 15, opacity: 1, borderRightWidth: x == 3 ? 1 : 0},
      ]}
      onChangeText={text => setText(text)}
      value={converted?.length > 0 ? converted : text}
      returnKeyType={returnKeyType ? returnKeyType : 'done'}
      keyboardType="default"
      autoCapitalize="characters"
      onSubmitEditing={onSubmitEditing}
      onBlur={convertValue}
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
