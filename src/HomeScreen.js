import React from 'react';
import { ScrollView} from 'react-native';
import Table from './component/Table';
const HomeScreen = () => {
  return (
    <ScrollView style={{flex: 1}}>
      <Table x={4} y={50} />
    </ScrollView>
  );
};

export default HomeScreen;
