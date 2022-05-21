import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';

import { Weather } from '../models/weather.model'
import WeatherService from '../services/weater.service'

export default class Home extends React.Component {
  	constructor(props: any){
    	super(props);
		this.findAllWeather();
    }
	
	state = {
        data: [],
        value: null,
        onChangeText: null,
        dataId: null,
        dataInsert:null,
		color: Colors.blue100,
		fase: null
    }

	componentDidMount () {
		this.findAllWeather ();
	}

	componentDidUpdate (prevProps: any, prevState: any) {
		if (prevState.data !== this.state.data) {
		this.findAllWeather();
		}
  	}

	insertWeather=(item)=> {
		let file:Weather=new Weather();
		file.nome=item;
		WeatherService.addData(file);
	}

	deleteWeather=(item)=> {
		if(item != null) {
			this.setState({color: Colors.redA700, fase: null});
			WeatherService.deleteWeather(item);
		} else {
			this.setState({color: Colors.redA700, fase: null});
		}
	}

	findAllWeather=()=> {
		WeatherService.findAll()
			.then((response: any) => {
				this.setState({
					data: response._array,
					isLoading: false,
				})
			}), (error) => {
				console.log(error);
			}
	}

	changeSunny(){
		this.setState({color: Colors.blue100});
		this.findAllWeather();
		console.log(this.state.data);
	}

	changeMoonFull(){
		this.setState({color: Colors.blueGrey200, fase: 'Moon Full'});
		this.insertWeather('Moon Full');
	}

	changeMoonGibbous(){
		this.setState({color: Colors.blueGrey300, fase: 'Moon Gibbous'});
		this.insertWeather('Moon Gibbous');
	}

	changeMoonQuarter(){
		this.setState({color: Colors.blueGrey500, fase: 'Moon Quarter'});
		this.insertWeather('Moon Quarter');
	}

	changeMoonCrescent(){
		this.setState({color: Colors.blueGrey700, fase: 'Moon Crescent'});
		this.insertWeather('Moon Crescent');
	}

	changeMoonNew(){
		this.setState({color: Colors.blueGrey900, fase: 'Moon New'});
		this.insertWeather('Moon New');
	}


	render () {
		const {data,value,dataInsert} = this.state;
	
		return (
			<View style={[styles.container, {backgroundColor: this.state.color}]}>
				
				<StatusBar style="auto" />
				<IconButton
				icon="weather-hurricane"
				color={Colors.redA100}
				size={60}
				onPress={()=>this.deleteWeather(this.state.fase)}
				/>
				<IconButton
				icon="moon-full"
				color={Colors.grey300}
				size={60}
				onPress={()=>this.changeMoonFull()}
				/>
				<IconButton
				icon="moon-waning-gibbous"
				color={Colors.grey300}
				size={60}
				onPress={()=>this.changeMoonGibbous()}
				/>
				<IconButton
				icon="moon-last-quarter"
				color={Colors.grey300}
				size={60}
				onPress={()=>this.changeMoonQuarter()}
				/>
				<IconButton
				icon="moon-waning-crescent"
				color={Colors.grey300}
				size={60}
				onPress={()=>this.changeMoonCrescent()}
				/>
				<IconButton
				icon="moon-new"
				color={Colors.grey300}
				size={60}
				onPress={()=>this.changeMoonNew()}
				/>
				<IconButton
				icon="weather-sunny"
				color={Colors.yellow300}
				size={60}
				onPress={()=>this.changeSunny()}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    textInput:{
        alignItems: "center", 
        width: 200, 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1 
    },
    containerTouch:{
        width: 200,
         padding: 10
    }
});