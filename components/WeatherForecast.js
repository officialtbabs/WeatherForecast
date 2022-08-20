import { ImageBackground, StyleSheet, View, Text, Image, ScrollView } from "react-native";
import HourlyForecast from "../shared/HourlyForecast";
import moment from "moment";
import { useState } from "react";

const WeatherForecast = (props) => {
    let backGround, fontColor;
    let todayWeatherData = props.data.weather;
    let _3HourlyForecastData = props.data.forecast.list;
    let todayWeatherIcon = `http://openweathermap.org/img/wn/${todayWeatherData.weather[0].icon}@4x.png`;
    let todayTemp = Math.floor(Number(todayWeatherData.main.temp) - 273.15);
    let todayWeather = todayWeatherData.weather[0].main;
    let todayWeatherDesc = todayWeatherData.weather[0].description;
    let pressure = todayWeatherData.main.pressure;
    let humidity = todayWeatherData.main.humidity;
    let date =  Date.now();
    let time = moment(date).format('LT').toString().replace(/:|[0-9]|[^a-zA-Z]/g, '');
    console.log(time)

    if (todayWeatherData.weather[0].main === "Thunderstorm" && time === "AM") {
        backGround = require("../assets/images/rainyDay.gif");
        fontColor = "#000000";
    }
    else if (todayWeatherData.weather[0].main === "Thunderstorm" && time === "PM") {
        backGround = require("../assets/images/rainyNight.gif");
        fontColor = "#ffffff";
        fontColor = "#ffffff";
    }
    else if (todayWeatherData.weather[0].main === "Drizzle" && time === "AM") {
        backGround = require("../assets/images/rainyDay.gif");
        fontColor = "#000000";
    }
    else if (todayWeatherData.weather[0].main === "Drizzle" && time === "PM") {
         backGround = require("../assets/images/rainyNight.gif");
         fontColor = "#ffffff";
    }
    else if (todayWeatherData.weather[0].main === "Rain" && time === "AM") {
        backGround = require("../assets/images/rainyDay.gif");
        fontColor = "#000000";
    }
    else if (todayWeatherData.weather[0].main === "Rain" && time === "PM") {
        backGround = require("../assets/images/rainyNight.gif");
        fontColor = "#ffffff";
    }
    else if (todayWeatherData.weather[0].main === "Clear" && time === "AM") {
        backGround = require("../assets/images/clearDay.gif");
        fontColor = "#000000";
    }
    else if (todayWeatherData.weather[0].main === "Clear" && time === "PM") {
       backGround = require("../assets/images/clearNight.gif");
       fontColor = "#ffffff";
    }
    else if (todayWeatherData.weather[0].main === "Clouds" && time === "AM") {
        backGround = require("../assets/images/clearDay.gif");
        fontColor = "#000000";
    }
    else if (todayWeatherData.weather[0].main === "Clouds" && time === "PM") {
        backGround = require("../assets/images/clearNight.gif");
        fontColor = "#ffffff";
    }
    // let backGround = require("../assets/images/clearNight.gif");
    
    

    try {
        if (backGround !== undefined) {
            return (
                <ImageBackground 
                source={backGround} 
                resizeMode="cover"
                style={styles.container}>
                    <Text style={{ marginHorizontal: 16, fontSize: 16, fontWeight: "400", lineHeight: 21, color: fontColor, marginTop: 102, marginBottom: 24}}>Today</Text>
                    <View style={styles.current}>
                        <View style={{alignContent: "center"}}>
                            <Text style={{fontSize: 96, color: '#2E30AD', fontWeight: "700", lineHeight: 96}}>
                                {todayTemp}°c
                            </Text>
                            <Text style={{fontSize: 18, fontWeight: "700", lineHeight: 23}}>
                                {todayWeather}
                            </Text>
                            <Text style={{fontSize: 14, lineHeight: 18.23}}>
                                {todayWeatherDesc}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.currentIcon}>
                        <Image source={{uri: todayWeatherIcon}} style={{height: 173, width: 109, resizeMode: "contain"}}/>
                    </View>
                    <ScrollView horizontal={true}  style={styles.hourlyView}>
                            {_3HourlyForecastData.map((data) => (
                                <View key={data.dt}>
                                    <HourlyForecast data={data}/>
                                </View>
                            ))}
                    </ScrollView>
                    <View style={styles.humdityAndPressure}>
                        <View style={styles.pAndH}>
                            <Text style={{color: '#000000', fontSize: 18, lineHeight: 23.44}}>
                                Pressure | <Text style={{fontWeight: '700'}}>{pressure}</Text> hPa
                            </Text>
                        </View>
                        <View style={styles.pAndH}>
                            <Text style={{color: '#000000', fontSize: 18, lineHeight: 23.44}}>
                                Humidity | <Text style={{fontWeight: '700'}}>{humidity}</Text> %
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
            );
        }
        else {
            throw "Error loading background"
        }
    }
    catch(err) {
        console.error(err);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        width: '100%',
        height: '100%',
        position: "relative"
    },
    current: {
        width: 228,
        height: 137,
        backgroundColor: "rgba(55, 65, 81, 0.95)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginHorizontal: 16
    },
    currentIcon: {
        width: 109,
        height: 173,
        backgroundColor: "rgba(55, 65, 81, 0.95)",
        position: "absolute",
        marginTop: 204,
        borderRadius: 10,
        marginLeft: 289,
        marginRight: 16,
        justifyContent: "center"
    },
    hourlyView: {
        width: '100%',
        height: 191,
        position: "absolute",
        marginTop: 501
    },
    humdityAndPressure: {
        width: '100%',
        height: 116,
        position: "absolute",
        marginTop: 736,
        backgroundColor: "rgba(55, 65, 81, 0.95)",
        flexDirection: 'row'
    },
    pAndH: {
        flex: 0.5,
        borderWidth: 2,
        borderColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    
})

export default WeatherForecast;