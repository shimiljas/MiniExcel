// eslint-disable-next-line
import React from 'react'
import {Text,View} from 'react-native'
import Row from './Row'
/**
 * Table creates a table with x rows and y columns
 */
export default class Table extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {},
    }
   }
  

   handleChangedCell = ({ x, y }, value) => {
    const modifiedData = Object.assign({}, this.state.data)
    
    if (!modifiedData[y]) modifiedData[y] = {}
    modifiedData[y][x] = value
    if(modifiedData[y][0]&&modifiedData[y][1]){
        modifiedData[y][2]=Number(modifiedData[y][0])+Number(modifiedData[y][1])
        modifiedData[y][3]=Number(modifiedData[y][0])*Number(modifiedData[y][1])
    }else{
        if(modifiedData[y][0]){
          modifiedData[y][2]=Number(modifiedData[y][0])+0
          modifiedData[y][3]=Number(modifiedData[y][0])*1
        }
        if(modifiedData[y][1]){
          modifiedData[y][2]=0+Number(modifiedData[y][1])
          modifiedData[y][3]=1*Number(modifiedData[y][1])
        }

    }
    this.setState({ data: modifiedData })
  }

  render() {
    const rows = []

    for (let y = 0; y < this.props.y + 1; y += 1) {
      const rowData = this.state.data[y] || {}
      rows.push(
        <View style={{flexDirection:'row'}}>
            <View style={{width:40,height:50,alignItems:'center',justifyContent:'center'}}>
            <Text>{y}</Text>
            </View>
            <Row
                key={y}
                y={y}
                x={this.props.x + 1}
                handleChangedCell={this.handleChangedCell}
                rowData={this.state.data}
        />
      </View>
      )
    }
    return (
      <View>
        {rows}
      </View>
    )
  }
}

