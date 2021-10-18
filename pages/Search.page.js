import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, Button, Alert} from 'react-native';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
import Shows from '../components/Shows.components';
import res from '../fixtures/tvshows.json';

export default class Search extends Component{
    constructor(props){
        super(props);
        this.state={
            field : '',
            result : {},
            showResult : false,
            showDetails : false
        }
    }
    handlePress=()=>{
        if(this.state.field==''){
            Alert.alert('Please fill the field');
        }else{
            const title = this.state.field;
            const words = title.split(' ');
            var preparedTitle = ''
            words.map((word, index) => {
                if(index==0){
                    preparedTitle=word;
                }
                preparedTitle = preparedTitle+'%20'+word;
            });
            console.log(preparedTitle);
            fetch('http://api.tvmaze.com/search/shows?q='+preparedTitle).then((response)=>response.json()).then((json)=>{
                this.setState({result:json});
                // console.log(json);
            }).then(()=>{
                // console.log(this.state.result);
                this.setState({showResult:true})
            })
        }
    }
    handleClear=()=>{
        this.setState({showResult:false});
    }
    handleChange=(value)=>{
        this.state.field=value;
    }
    render(){
        return(
            <>
            {this.state.showResult ?
                <View>
                    <View style={{margin:10}}>
                        <View style={{marginBottom:10}}/>
                        <Button
                        title="Back to search"
                        onPress={() => this.handleClear()}
                        style={styles.button}
                        />

                    </View>
                </View>
                :
                null
            }
            {this.state.showResult ?
                <Shows shows={this.state.result} search={this.state.field}/>
                :
                <View style={styles.detailsCard}>
                    <Text style={styles.detailsTitle}>
                        Search Tv Shows
                    </Text>
                    <TextInput 
                        style={styles.input}
                        placeholder={'Tv Show'}
                        onChangeText={(text)=>{
                            this.handleChange(text);
                        }}
                    />
                    <Button
                    title="Search"
                    onPress={() => this.handlePress()}
                    style={styles.button}
                    />
                </View>
            }
            </>
        )
    }
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      borderRadius:10,
      textAlign:'center'
    },
    button:{
        borderRadius:100,
        // marginBottom:10,
    },
    detailsCard:{
        margin:15,
    },
    detailsTitle: {
      fontSize: 25,
      fontWeight: 'bold',
      // marginLeft: 5,
      marginTop: 15,
      textAlign: 'center',
    },
  });