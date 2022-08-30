import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import InputBox from './InputBox';
const renderText = c => {
  if (c == 0) return 'A';
  if (c == 1) return 'B';
  if (c == 2) return 'A+B';
  if (c == 3) return 'A*B';
};
const Row = props => {
  const cells = [];
  const y = props.y;
  for (let x = 0; x < props.x; x += 1) {
    cells.push(
      <View stye={{flex: 1, justifyContent: 'center'}}>
        {y == 0 && (
          <View style={style.textContainer}>
            <Text style={{textAlign: 'center', color: 'black'}}>
              {renderText(x)}
            </Text>
          </View>
        )}
        <InputBox
          x={x}
          y={y}
          onChangeText={props.handleChangedCell}
          rowData={props?.rowData}
        />
      </View>,
    );
  }
  return <View style={{flexDirection: 'row'}}>{cells}</View>;
};

const style = StyleSheet.create({
  textContainer: {
    height: 40,
    backgroundColor: 'grey',
    borderWidth: 0.6,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Row;
