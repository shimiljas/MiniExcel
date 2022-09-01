import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import InputBox from './InputBox';
const renderHeader = c => {
  if (c == 0) return 'A';
  if (c == 1) return 'B';
  if (c == 2) return 'C';
  if (c == 3) return 'D';
};
const Row = props => {
  const cells = [];
  const y = props.y;
  for (let x = 0; x < props.x; x += 1) {
    cells.push(
      <View stye={style.justifyContainer}>
        {y == 0 && (
          <View style={style.textContainer}>
            <Text style={style.textStyle}>{renderHeader(x)}</Text>
          </View>
        )}
        <InputBox
          x={x}
          y={y}
          onChangeText={props.handleChangedCell}
          rowData={props?.rowData}
          removeText={props.removeText}
        />
      </View>,
    );
  }
  return <View style={style.rowContainer}>{cells}</View>;
};

const style = StyleSheet.create({
  rowContainer:{
    flexDirection: 'row'
  },
  justifyContainer:{
    flex: 1,
     justifyContent: 'center'
  },
  textStyle: {
    textAlign: 'center',
    color: 'black',
  },
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
