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
    modifiedData[y][x] =value;
    this.setState({data: modifiedData},()=>{
      console.log(this.state.data)
    });
  };
  removeText=({x,y})=>{
    let modifiedData = Object.assign({}, this.state.data);
     if(modifiedData?.[y]?.[x]) delete modifiedData[y][x]
     this.setState({data: modifiedData},()=>{
      console.log(this.state.data)
    });

  }

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
            removeText={this.removeText}
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
