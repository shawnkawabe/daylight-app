import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/pages/Home'
import DatabaseInit from './src/database/db-init';

export default class App extends React.Component {

  constructor(props: any) {
    super(props);
    new DatabaseInit
    console.log("initialize database")
  }


  render() {
    return (
		<Home></Home>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
