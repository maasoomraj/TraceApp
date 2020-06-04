import React,{Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button,Alert, FlatList } from 'react-native';

export default class App extends Component {
  state = { product: '' , traceArray : [], isLoggedIn : true};

    updateProduct = event =>{
        this.setState({ product : event.target.value});
    }

    traceProduct = () => {
        const { product } = this.state;

        fetch('https://ancient-citadel-77688.herokuapp.com/api/trace', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({product})
    }).then(response => response.json())
        .then(json => this.setState({ traceArray: json.traceArray})); 
    }

  render(){
    const {traceArray,isLoggedIn} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Trace a Product</Text>
        <Text>Enter Product Name</Text>
        <TextInput placeholder="Product to be traced" value={this.state.product} onChange={this.updateProduct}></TextInput>
        <Button title="Trace" onPress={this.traceProduct}></Button>
        { traceArray.length>0 && 
                <View style={styles.container}>
                  <Text>The Product is found at address: </Text>
                  <FlatList>
                  {traceArray.map(trace => <Text>{trace}</Text>)}
                  </FlatList>
        </View> }
      </View>
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
  titleText: {
    fontSize: 30,
    fontWeight: "bold"
  }
});
