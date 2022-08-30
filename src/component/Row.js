import React from 'react';
import {View,Text} from 'react-native';
import InputBox from './InputBox';
const Row = (props) => {
    const cells = []
    const y = props.y
    for (let x = 0; x < props.x; x += 1) {
      cells.push(
        <InputBox
            x={x}
            y={y}
            onChangeText={props.handleChangedCell}
            rowData={props?.rowData}
        />
      )
    }
    return (
      <View style={{flexDirection:'row'}}>
        {cells}
      </View>
    )
  }

  export default Row
  