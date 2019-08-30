import React, { Component } from 'react'
import { Text, StyleSheet, View , ActivityIndicator} from 'react-native'
import Weather from '../components/Weather'

const API_KEY = "T4pjG2TFl6rGlAhzoYeo3bbLEpkmzeiF";
const datagokr_KEY = "aiMmkue91q4efKfTD0%2FfGF7Zv%2FIFyFZLqLVxcVrI7O9ZEgiKsA1yawel2kBvXgBvwaIAZ7ygUg%2BFJN1ex7n65w%3D%3D";
const kakao_KEY = "d114ff2a6ca1e7124eb497fbfcb660a4";
const token = "b8e396fd8d70334cc7860ccc70ae8ee2bbe42d07";

export default class WeatherScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded : false,
            error : null,
            isModalVisible : false,
            isModalVisible2 : false,
            menuOpen : false,
            locationKey : null,
            temperature : null,
            name : null,
            countrytext: null,
            locationtext: null,
            thenyesterday: null,
            humidity: null,
            cityname: null,
            mtx: null,
            mty: null,
            pmStation: null,
            currentPositionPM25: null,
            currentPositionPM10: null,        
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this._getWeather(position.coords.latitude, position.coords.longitude)
            }
            ,error => {
                this.setState({
                    error : error
                })
            }
        )
    }

    _getWeather = (lat, long) => {
            fetch(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${long}`)
            .then(res => res.json())
            .then(location =>{
                this.setState({
                    locationKey:location.Key,
                    countrytext:location.Country.LocalizedName,
                    locationtext:location.AdmininstrativeArea.LocalizedName,
                    cityname:location.ParentCity.LocalizedName
                })
            return fetch(`https://dataservice.accuweather.com/currentconditions/v1/${this.state.locationKey}?apikey=${API_KEY}&details=true`)
            })
            .then(response => response.json())
            .then(locationData => {
                console.log('weather data');
                console.log(locationData);
            this.setState({
                temperature: locationData[0].Temperature.Metric.Value,
                name: locationData[0].WeatherText.replace(/\s/gi,""), //.replace(/\-/g,'')
                thenyesterday: locationData[0].Past24HourTemperatureDeparture.Metric.Value,
                humidity: locationData[0].RelativeHumidity,
                isLoaded: true
           })
           return fetch(`https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${long}&y=${lat}&input_coord=WGS84&output_coord=TM`,{
               headers: new Headers({
                   'Authorization' : 'KakaoAK d114ff2a6ca1e7124eb497fbfcb660a4'
               })
           })
           .then(response=>response.json())
           .then(resData=> {
            this.setState({
                mtx:resData.documents[0].x,
                mtx:resData.documents[0].y,
                })
                return fetch(`http://openapi.airkorea.or.kr/openapi/services/rest/MsrstnInfoInqireSvc/getNearbyMsrstnList?tmX= + this.state.mtx + &tmY= + this.state.mty + &pageNo=1&numOfRows=10&ServiceKey=${datagokr_KEY}&_returnType=json`)
                .then(res=>res.json())
                .then(arikoreadata => { 
                    this.setState({
                    pmStation:arikoreadata.list[0].stationName
                })
                return fetch('http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=' +  encodeURI(this.state.pmStation , "UTF-8") + `&dataTerm=month&pageNo=1&numOfRows=10&ServiceKey=${datagokr_KEY}&ver=1.3&_returnType=json`)
                
                })
                .then(res=>res.json())
                .then(airpolution =>{
                    this.setState({
                    currentPositionPM25: airpolution.lit[0].pm25Value,
                    currentPositionPM10: airpolution.lit[0].pm10Value
                    })
                    console.log(airpolution.lit[0].pm25Value);
                    console.log(airpolution.lit[0].pm10Value);
            })
            
        })
    })
}

_toggleModel = ()=>{
    this.setState({
        isModalVisible: !this.state.isModalVisible
    })
}
    render() {

        const { isLoaded, error, temperature, name, countrytext, locationtext, thenyesterday, humidity, cityname, currentPositionPM10, currentPositionPM25} = 
        this.state;
        return (
            <View style={styles.container}>
            {isLoaded ?    (<Weather
                    weatherName = {name}
                    temp = {Math.ceil(temperature - 0)}
                    countrytext = {countrytext}
                    locationText = {locationtext}
                    cityName = {cityname}
                    thenYesterday = {thenyesterday}
                    Humidity = {humidity}
                    PM10 = {currentPositionPM10}
                    PM25 = {currentPositionPM25}
                />) : (
                    <View>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                )
            }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    sidemenu: {
        flex: 1,
      },
      container: {
        flex: 1,
      },
      loading: {
        flex: 1,
        backgroundColor: '#181740',
        justifyContent: "flex-end",
        paddingLeft: 20,
        paddingRight: 20,
        zIndex: 1000
      },
      loadingText: {
        fontSize: 38,
        marginBottom: 150,
        color: '#fff'
      },
      locationTitle: {
        alignItems: 'stretch',
        marginLeft: 15,
        flexDirection: 'row',
      },
      locationTitleText: {
        fontSize: 27,
        color: '#fff',
        fontFamily: "Arial Rounded MT Bold",
        marginTop: -6
      },
      locationCallIcon: {
        marginTop: -3
      },
      callLeftmenu: {
        width: 24,
        height: 20,
      },
      headers: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        top: 67,
        left: 26,
        zIndex: 100,
      },
      modalLocaton: {
        zIndex: 150,
        backgroundColor: '#fff'
      },
      absolute: {
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: 0,
      },
      modalContainer: {
        backgroundColor: '#fff',
        elevation:4,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "black",
        shadowOpacity: 0.5,
        shadowRadius: 10,
        zIndex: 99
      },
      modalContainer2: {
        backgroundColor: '#fff',
        elevation:4,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "black",
        shadowOpacity: 0.5,
        shadowRadius: 10,
        zIndex: 100
      }    
})
