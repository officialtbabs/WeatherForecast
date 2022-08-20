import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { getCurrentPositionAsync, PermissionStatus, requestForegroundPermissionsAsync, getForegroundPermissionsAsync } from 'expo-location';
import Loader from './shared/Loader';
import WeatherForecast from './components/WeatherForecast';

export default function App() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
  let [isLoading, setisLoading] = useState(false);
  let [screen, setScreen]= useState(<Loader/>);

  const getLocation = async () => {
    let hasPermission = await verifyPermission(); 
    try {
      if (hasPermission !== true) throw "Permission to access location was denied"
    }
    catch (err) {
      console.log(err)
      return;
    }

    const data = await getCurrentPositionAsync();
    return data;
  };

  const verifyPermission = async () => {
    let locationPermissionInformation =  await getForegroundPermissionsAsync();
    if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestForegroundPermissionsAsync();
      return permissionResponse.granted
    }
    else if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      setErrorMsg('Permission to access location was denied')
      Alert.alert(
        errorMsg
      );
      return false;
    }
    return true;
  };

  const  getWeatherForecast = async () => {
    let location;
    let lat, long;
    let appId = "0bfac7fa48405bac9b4466ba6b83579d";

    try {
      location = await getLocation();
      if (!location.coords)  throw "Couldnt find location"
    }
    catch (err) {
      console.error(err)
    }

    if (location) {
      lat = parseFloat(location.coords.latitude).toFixed(2);
      long = parseFloat(location.coords.longitude).toFixed(2);
    }
    console.log(lat)
    console.log(long)
    const weatherAPI = "https://api.openweathermap.org/data/2.5/weather";
    const _3HoursForecastAPI = "https://api.openweathermap.org/data/2.5/forecast"

    let myheader = new Headers();
    myheader.append("Content-Type", "application/json");

    let requestOptions = {
      method: "GET",
      header: myheader,
      redirect: "follow"
    };

    let weatherResponse  = await fetch(`${weatherAPI}?lat=${lat}&lon=${long}&appid=${appId}`, requestOptions);
    let _3HoursForecastResponse = await fetch(`${_3HoursForecastAPI}?lat=${lat}&lon=${long}&appid=${appId}`, requestOptions);
    let weatherResult =  await weatherResponse.json();
    let _3HoursForecastResult = await _3HoursForecastResponse.json();
    
    if (weatherResult.cod === 200 && _3HoursForecastResult.cod === "200") {
      let data = { 
        weather: weatherResult,
        forecast: _3HoursForecastResult
      }
      setScreen(<WeatherForecast data={data}/>);
    }
    else {
      setErrorMsg('Could not get weather details')
      Alert.alert(
        errorMsg
      );
    }
  }

  useEffect(() => {
    getWeatherForecast();
  }, [])

  return (
    <View style={styles.container}>
      {screen}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: '100%',
    height: '100%'
  },
});
