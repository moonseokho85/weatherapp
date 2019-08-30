import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import {LinearGradient} from 'expo'
import {MaterialCommunityIcons} from '@expo/vector-icons'

    const weatherCases = {
        Lightrain: {
          colors: ["#00C6FB", "#005BEA"],
          title: "Light Raining",
          subtitle: "For more info look outside",
          icon: "weather-rainy"
          },
        Rain: {
          colors: ["#00C6FB", "#005BEA"],
          title: "Raining like a MF",
          subtitle: "For more info look outside",
          icon: "weather-rainy"
        },
        Clear: {
          colors: ["#FEF253", "#FF7300"],
          title: "Sunny as fuck",
          subtitle: "Go get your ass burnt",
          icon: "weather-sunny"
        },
        Sunny: {
          colors: ["#FEF253", "#FF7300"],
          title: "Sunny as fuck",
          subtitle: "Go get your ass burnt",
          icon: "weather-sunny"
        },
        Partlysunny: {
          colors: ["#FEF253", "#FF7300"],
          title: "Sunny as fuck",
          subtitle: "Go get your ass burnt",
          icon: "weather-sunny"
        },
        Mostlysunny: {
          colors: ["#FEF253", "#FF7300"],
          title: "Sunny as fuck",
          subtitle: "Go get your ass burnt",
          icon: "weather-sunny"
        },
        Mostlyclear: {
          colors: ["#FEF253", "#FF7300"],
          title: "Mostly Clear",
          subtitle: "Go get your ass burnt",
          icon: "weather-sunny"
        },
        Thunderstorm: {
          colors: ["#00ECBC", "#007ADF"],
          title: "Thunderstorm in the house",
          subtitle: "Actually, outside of the house",
          icon: "weather-lightning"
        },
        Clouds: {
          colors: ["#D7D2CC", "#304352"],
          title: "Clouds",
          subtitle: "I know, fucking boring",
          icon: "weather-cloudy"
        },
        Cloudsandsun: {
          colors: ["#D7D2CC", "#304352"],
          title: "Partly cloudy",
          subtitle: "I know, fucking boring",
          icon: "weather-cloudy"
        },
        Partlycloudy: {
          colors: ["#D7D2CC", "#304352"],
          title: "Partly cloudy",
          subtitle: "I know, fucking boring",
          icon: "weather-cloudy"
        },
        Mostlycloudy: {
          colors: ["#D7D2CC", "#304352"],
          title: "Mostly cloudy",
          subtitle: "I know, fucking boring",
          icon: "weather-cloudy"
        },
        Cloudy: {
          colors: ["#BEBEBE", "#7C8EB6", "#6F6F6F"],
          title: "Clouds",
          subtitle: "I know, fucking boring",
          icon: "weather-cloudy"
        },
        Someclouds: {
          colors: ["#D7D2CC", "#304352"],
          title: "Some Clouds",
          subtitle: "I know, fucking boring",
          icon: "weather-cloudy"
        },
        Snow: {
          colors: ["#7DE2FC", "#B9B6E5"],
          title: "Cold as balls",
          subtitle: "Do you want to build a snowman? Fuck no.",
          icon: "weather-snowy"
        },
        Drizzle: {
          colors: ["#89F7FE", "#66A6FF"],
          title: "Drizzle",
          subtitle: "Is like rain, but gay :rainbow-flag:",
          icon: "weather-hail"
        },
        Haze: {
          colors: ["#89F7FE", "#66A6FF"],
          title: "Haze",
          subtitle: "Don't know what that is :hankey:",
          icon: "weather-hail"
        },
        Mist: {
          colors: ["#D7D2CC", "#304352"],
          title: "Mist!",
          subtitle: "It's like you have no glasses on.",
          icon: "weather-fog"
        },
        Ashower: {
          colors: ["#D7D2CC", "#304352"],
          title: "Mist!",
          subtitle: "It's like you have no glasses on.",
          icon: "weather-fog"
        }
       };

       export default function Weather ({weatherName, temp, countryText, locationText, thenYesterday, Humidity, cityName, PM10, PM25})
       {
           return (
                <LinearGradient
                    colors = {weatherCases[weatherName].colors}
                    style = {styles.container}
                    start = {[0.4, -0.4]}
                    end = {[-0.3, 1]}
                    location = {[0.25, 0.4, 1]}
                >
                    <View style={styles.upper}>
                        <MaterialCommunityIcons 
                            color = "white"
                            size = {144}
                            name ={weatherCases[weatherName].icon}
                        />
                        <Text style = {styles.temp}>{temp}도</Text>
                        <Text>어제 이 시간보다 {thenYesterday}도</Text>
                    </View>

                    <View style = {styles.lower}>
                        <Text>{cityName}, {locationText}, {countryText}</Text>
                        <Text>습도  : {Humidity}%</Text>
                        <Text>한국 데이터 / 초미세먼지 : {PM25}, 미세먼지 : {PM10}</Text>
                        <Text style={styles.title}>{weatherCases[weatherName].title}</Text>
                        <Text style={styles.subtitle}>{weatherCases[weatherName].subtitle}</Text>
                    </View>

                </LinearGradient>
           )
       }

       const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        upper: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        },
        lower: {
            flex: 1,
            alignItems: "flex-start",
            justifyContent: "flex-end",
            paddingLeft: 25
        },
        title: {
            fontSize: 38,
            color: '#fff',
            marginBottom: 10,
            fontWeight: '200'
        },
        subtitle: {
            fontSize: 24,
            color: '#fff',
            marginBottom: 80
        },
        temp: {
            fontSize: 50,
            color: '#fff',
            fontWeight: '200'
        }
       })
