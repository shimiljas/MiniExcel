import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Row from './Row';
export default class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
    };
  }

  

  handleChangedCell = ({x, y}, value) => {
    let modifiedData = Object.assign({}, this.state.data);
    if (!modifiedData[y]) modifiedData[y] = {};
    modifiedData[y][x] = value;
    this.setState({data: modifiedData},()=>{
      console.log(this.state.data)
    });
    // if (!isNaN(value)) {
     
    // } else {
    //   let updatedEx = '';
    //   let columns = value.split(/([-+*\/])/);
    //   for (let i = 0; i < columns.length; i++) {
    //     if (!isNaN(columns[i])) {
    //       updatedEx = updatedEx + columns[i];
    //     }
    //     if (columns[i] == '+' || columns[i] == '*') {
    //       if (updatedEx) {
    //         updatedEx = updatedEx + columns[i];
    //       }
    //     }
    //     if (
    //       typeof columns[i]?.charAt(0) == 'string' &&
    //       !isNaN(columns[i]?.charAt(1) * 1)
    //     ) {
    //       if (
    //         columns[i].charAt(0) == 'a' ||
    //         columns[i].charAt(0) == 'A' ||
    //         columns[i].charAt(0) == 'b' ||
    //         columns[i].charAt(0) == 'B' ||
    //         columns[i].charAt(0) == 'c' ||
    //         columns[i].charAt(0) == 'C' ||
    //         columns[i].charAt(0) == 'd' ||
    //         columns[i].charAt(0) == 'D'
    //       ) {
    //         let col = this.convertString(columns[i].charAt(0));
    //         let row = Number(columns[i].replace(/^\D+/g, ''));
    //         if (modifiedData[row] && modifiedData?.[row]?.[col]) {
    //           updatedEx = updatedEx + modifiedData?.[row]?.[col];
    //         }
    //       }
    //     }
    //   }
    //   if (updatedEx) {
    //     if (updatedEx.endsWith('+') || updatedEx.endsWith('*')) {
    //       updatedEx = updatedEx.slice(0, -1);
    //     }
    //     modifiedData[y][x] = updatedEx;
    //       this.setState({data: modifiedData},()=>{
    //         console.log(modifiedData,"modifiedData")
    //     });
    //   }
    // }
  };

  render() {
    const rows = [];

    for (let y = 0; y < this.props.y + 1; y += 1) {
      rows.push(
        <View style={{flexDirection: 'row'}}>
          <View style={style.container}>
            <Text style={{paddingTop: y == 0 ? 50 : 0}}>{y}</Text>
          </View>
          <Row
            key={y}
            y={y}
            x={this.props.x + 1}
            handleChangedCell={this.handleChangedCell}
            rowData={this.state.data}
          />
        </View>,
      );
    }
    return <View>{rows}</View>;
  }
}

const style = StyleSheet.create({
  container: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
