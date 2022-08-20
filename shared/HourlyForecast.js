import { View, StyleSheet, Image, Text} from "react-native";
import moment from "moment";

const HourlyForecast= (props) => {
    let weatherIcon = `http://openweathermap.org/img/wn/`;
    let _3HourlyForecast = props.data;
    let date = _3HourlyForecast.dt_txt.replace(' ', 'T');
    let time = moment(date).format('LT').toString().replace(/:|0/g, '');
    let temp = Math.floor(Number(_3HourlyForecast.main.temp) - 273.15);
    return (
        <View style={styles.container}>
            <View style={styles.iconHolder}>
                <Image source={{uri: `${weatherIcon}${_3HourlyForecast.weather[0].icon}@4x.png`}} style={{height: 56, width: 56, resizeMode: "contain"}} />
            </View>
            <Text style={{fontSize: 18, lineHeight: 23.44, fontWeight: "700", marginBottom: 20, marginTop: 8}}>
                {time}
            </Text>
            <Text style={{fontSize: 32, lineHeight: 42.66, fontWeight: "700", color: "#2E30AD"}}>
                {temp}°c
            </Text>
        </View>
    );
}

export default HourlyForecast;

const styles = StyleSheet.create({
    container: {
        width: 98,
        height: 191,
        marginHorizontal: 16,
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: "rgba(55, 65, 81, 0.95)"
    },
    iconHolder: {
        width: 98,
        height: 98,
        borderRadius: 10,
        backgroundColor: "rgba(46, 48, 173, 0.4)",
        justifyContent: "center",
        alignItems: "center"
    }
})